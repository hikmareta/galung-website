import { getPayload, APIError } from "payload";
import config from "@/payload.config";
import { isActiveAdmin } from "@/access/admin";
import { readEnvironment } from "@/lib/env";
import { boundedJSON } from "@/services/contact/security";
import { consumeLimit } from "@/services/contact/store";
import { s3Storage } from "@/services/downloads/storage";
import {
  beginUpload,
  uploadAction,
  uploadStatus,
} from "@/services/downloads/workflow";
import { DownloadError } from "@/services/downloads/errors";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const headers = {
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
  };
  try {
    if (request.headers.get("origin") !== readEnvironment().origin)
      return Response.json(
        { error: "Origin denied" },
        { status: 403, headers },
      );
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: request.headers });
    if (!user || !isActiveAdmin(user))
      return Response.json(
        { error: "Administrator required" },
        { status: 403, headers },
      );
    const body = (await boundedJSON(request).catch((error: unknown) => {
      const code = error instanceof Error ? error.message : "";
      throw new APIError(
        "Invalid JSON control request",
        code === "size" ? 413 : code === "media" ? 415 : 400,
      );
    })) as Record<string, unknown>;
    if (!body || typeof body !== "object")
      throw new APIError("Invalid request", 400);
    if (
      !(await consumeLimit(payload, `downloads:admin:${user.id}`, 500, 3600000))
    )
      return Response.json(
        { error: "Upload rate limit reached" },
        { status: 429, headers },
      );
    if (body.action === "status") {
      if (!Number.isSafeInteger(body.id) || Number(body.id) < 1)
        throw new APIError("Invalid upload ID", 400);
      return Response.json(
        await uploadStatus(payload, user, body.id as number),
        { headers },
      );
    }
    const storage = s3Storage();
    if (body.action === "begin") {
      if (
        !(await consumeLimit(
          payload,
          `downloads:begin:${user.id}`,
          10,
          3600000,
        ))
      )
        return Response.json(
          { error: "Upload creation limit reached" },
          { status: 429, headers },
        );
      if (
        !Number.isSafeInteger(body.release) ||
        typeof body.filename !== "string" ||
        typeof body.sha256 !== "string" ||
        typeof body.architecture !== "string" ||
        typeof body.sizeBytes !== "number" ||
        !["windows", "macos"].includes(String(body.os))
      )
        throw new APIError("Invalid installer metadata", 400);
      return Response.json(
        await beginUpload(payload, storage, user, {
          release: body.release as number,
          os: body.os as "windows" | "macos",
          filename: body.filename,
          sha256: body.sha256,
          architecture: body.architecture,
          sizeBytes: body.sizeBytes,
        }),
        { headers },
      );
    }
    if (
      !Number.isSafeInteger(body.id) ||
      Number(body.id) < 1 ||
      !["part", "complete", "abort"].includes(String(body.action))
    )
      throw new APIError("Invalid upload action", 400);
    return Response.json(
      await uploadAction(
        payload,
        storage,
        user,
        body.id as number,
        String(body.action),
        body.part as number,
      ),
      { headers },
    );
  } catch (error) {
    const status =
      error instanceof APIError
        ? error.status
        : error instanceof Error &&
            /Unsupported|Unsafe|Invalid part|Installer must|Expected SHA/.test(
              error.message,
            )
          ? 400
          : 503;
    return Response.json(
      {
        code:
          error instanceof DownloadError
            ? error.code
            : status === 503
              ? "unavailable"
              : "rejected",
        error:
          error instanceof DownloadError
            ? {
                busy: "Another installer operation is in progress. Retry shortly.",
                expired: "Upload expired. Start a replacement upload.",
                not_pending:
                  "Upload is no longer pending. Retry to check its status.",
              }[error.code]
            : status === 503
              ? "Storage unavailable; retry this upload to check its status"
              : "Upload rejected; check metadata, state and permissions",
      },
      { status, headers },
    );
  }
}
