import { randomUUID, createHash } from "node:crypto";
import { APIError, type Payload } from "payload";
import type { User as Staff } from "../../payload-types";
import type { InstallerStorage } from "./storage";
import { workflowCapability } from "./guards";
import { DownloadError } from "./errors";
import {
  PART_SIZE,
  validateInstaller,
  approvedArchitectures,
  partLength,
  validMagic,
} from "./validation.ts";
const context = { downloadWorkflow: workflowCapability };
export async function assetLock<T>(
  payload: Payload,
  id: number,
  work: (renew: () => Promise<void>) => Promise<T>,
) {
  const key = "downloads:lease:" + id;
  const token = randomUUID();
  const now = Date.now();
  const acquired = await payload.db.pool.query(
    "INSERT INTO payload_kv (key, data) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data WHERE (payload_kv.data->>'expiresAt')::bigint <= $3 RETURNING key",
    [key, JSON.stringify({ token, expiresAt: now + 600000 }), now],
  );
  if (!acquired.rowCount)
    throw new DownloadError(
      "busy",
      "Installer operation in progress; retry shortly",
      409,
    );
  const renew = async () => {
    const time = Date.now();
    const result = await payload.db.pool.query(
      "UPDATE payload_kv SET data = jsonb_set(data, '{expiresAt}', to_jsonb($3::bigint)) WHERE key = $1 AND data->>'token' = $2 AND (data->>'expiresAt')::bigint > $4 RETURNING key",
      [key, token, time + 600000, time],
    );
    if (!result.rowCount)
      throw new DownloadError(
        "busy",
        "Installer operation lease expired; retry",
        409,
      );
  };
  try {
    return await work(renew);
  } finally {
    await payload.db.pool.query(
      "DELETE FROM payload_kv WHERE key = $1 AND data->>'token' = $2",
      [key, token],
    );
  }
}
export async function beginUpload(
  payload: Payload,
  storage: InstallerStorage,
  user: Staff & { collection: "users" },
  input: {
    release: number;
    os: "windows" | "macos";
    architecture: string;
    filename: string;
    sizeBytes: number;
    sha256: string;
  },
) {
  validateInstaller(input, approvedArchitectures());
  const release = await payload.findByID({
    collection: "softwareReleases",
    id: input.release,
    draft: true,
    depth: 0,
    user,
    overrideAccess: false,
  });
  if (release._status === "published" || release.lifecycle !== "draft")
    throw new APIError("Upload only to a release draft", 409);
  const key = `installers/${input.release}/${randomUUID()}/${input.filename}`;
  const uploadId = await storage.begin(key);
  try {
    const asset = await payload.create({
      collection: "releaseAssets",
      user,
      context,
      overrideAccess: true,
      data: {
        ...input,
        storageKey: key,
        uploadId,
        uploadOwner: user.id,
        uploadExpiresAt: new Date(Date.now() + 3600000).toISOString(),
        uploadStatus: "pending",
        visibility: "private",
      },
    });
    return {
      id: asset.id,
      partSize: PART_SIZE,
      expiresAt: asset.uploadExpiresAt,
    };
  } catch (error) {
    await storage.abort(key, uploadId);
    throw error;
  }
}
export async function uploadAction(
  payload: Payload,
  storage: InstallerStorage,
  user: Staff & { collection: "users" },
  id: number,
  action: string,
  part?: number,
) {
  return assetLock(payload, id, async (renew) => {
    const asset = await payload.findByID({
      collection: "releaseAssets",
      id,
      user,
      overrideAccess: false,
      depth: 0,
    });
    if (asset.uploadOwner !== user.id)
      throw new APIError("Upload belongs to another administrator", 403);
    if (
      action === "complete" &&
      ["uploaded", "verified"].includes(asset.uploadStatus)
    )
      return { status: asset.uploadStatus };
    if (
      asset.uploadStatus !== "pending" ||
      !asset.uploadId ||
      !asset.storageKey ||
      !asset.sizeBytes
    )
      throw new DownloadError(
        "not_pending",
        "Upload is not pending; check its status",
        409,
      );
    const expired =
      !asset.uploadExpiresAt ||
      new Date(asset.uploadExpiresAt).getTime() <= Date.now();
    if (action === "abort" || expired) {
      await storage.abort(asset.storageKey, asset.uploadId);
      await renew();
      await payload.update({
        collection: "releaseAssets",
        id,
        user,
        context,
        data: {
          uploadStatus: "aborted",
          failure: expired
            ? "Upload expired; start a new upload"
            : "Cancelled by administrator",
        },
      });
      if (expired) throw new DownloadError("expired", "Upload expired", 410);
      return { status: "aborted" };
    }
    if (action === "part")
      return {
        url: await storage.signPart(
          asset.storageKey,
          asset.uploadId,
          part!,
          partLength(asset.sizeBytes, part!),
        ),
      };
    if (action !== "complete") throw new APIError("Invalid upload action", 400);
    const parts = await storage.parts(asset.storageKey, asset.uploadId);
    if (
      parts.length !== Math.ceil(asset.sizeBytes / PART_SIZE) ||
      parts.some(
        (p, i) =>
          p.part !== i + 1 ||
          p.size !== partLength(asset.sizeBytes!, i + 1) ||
          !p.etag,
      )
    )
      throw new APIError(
        "Missing or incorrectly sized parts; retry upload",
        400,
      );
    const version = await storage.complete(
      asset.storageKey,
      asset.uploadId,
      parts,
    );
    const head = await storage.head(asset.storageKey, version);
    if (head.size !== asset.sizeBytes)
      throw new APIError("Object size mismatch", 400);
    await renew();
    await payload.update({
      collection: "releaseAssets",
      id,
      user,
      context,
      data: { objectVersion: version, uploadStatus: "uploaded" },
    });
    return { status: "uploaded" };
  });
}
export async function uploadStatus(
  payload: Payload,
  user: Staff & { collection: "users" },
  id: number,
) {
  const asset = await payload.findByID({
    collection: "releaseAssets",
    id,
    user,
    overrideAccess: false,
    depth: 0,
  });
  if (asset.uploadOwner !== user.id)
    throw new APIError("Upload belongs to another administrator", 403);
  return {
    id: asset.id,
    status: asset.uploadStatus,
    release:
      typeof asset.release === "object" ? asset.release.id : asset.release,
    expiresAt: asset.uploadExpiresAt,
  };
}
// Invoked only by the operator worker, never an HTTP handler. No installer bytes pass through app endpoints.
export async function verifyAsset(
  payload: Payload,
  storage: InstallerStorage,
  id: number,
) {
  return assetLock(payload, id, async (renew) => {
    const asset = await payload.findByID({
      collection: "releaseAssets",
      id,
      depth: 0,
    });
    if (
      asset.uploadStatus !== "uploaded" ||
      !asset.storageKey ||
      !asset.objectVersion ||
      !asset.filename ||
      !asset.sizeBytes ||
      !asset.sha256 ||
      !asset.architecture
    )
      throw new Error("Asset is not ready for verification");
    try {
      validateInstaller(
        {
          ...asset,
          architecture: asset.architecture,
          filename: asset.filename,
          sha256: asset.sha256,
          sizeBytes: asset.sizeBytes,
        },
        approvedArchitectures(),
      );
      const head = await storage.head(asset.storageKey, asset.objectVersion);
      if (head.size !== asset.sizeBytes) throw new Error("Size mismatch");
      const hash = createHash("sha256");
      let size = 0;
      let prefix = Buffer.alloc(0);
      let trailer = Buffer.alloc(0);
      let renewedAt = Date.now();
      for await (const chunk of await storage.read(
        asset.storageKey,
        asset.objectVersion,
      )) {
        if (Date.now() - renewedAt > 60000) {
          await renew();
          renewedAt = Date.now();
        }
        size += chunk.byteLength;
        if (size > asset.sizeBytes) throw new Error("Size exceeded");
        hash.update(chunk);
        if (prefix.length < 8)
          prefix = Buffer.concat([prefix, chunk]).subarray(0, 8);
        trailer = Buffer.concat([trailer, chunk]).subarray(-512);
      }
      const format = /\.dmg$/i.test(asset.filename)
        ? trailer.length === 512 && trailer.subarray(0, 4).toString() === "koly"
        : validMagic(asset.filename, prefix);
      if (
        size !== asset.sizeBytes ||
        hash.digest("hex") !== asset.sha256 ||
        !format
      )
        throw new Error("File format, size or SHA-256 mismatch");
      await renew();
      await payload.update({
        collection: "releaseAssets",
        id,
        context,
        data: {
          uploadStatus: "verified",
          verifiedAt: new Date().toISOString(),
          failure: null,
        },
      });
      return "verified";
    } catch (error) {
      // Provider outages leave uploaded state retryable; invalid content is terminal.
      if (
        error instanceof Error &&
        /mismatch|exceeded|Unsupported|Unsafe|Expected/.test(error.message)
      ) {
        await renew();
        await payload.update({
          collection: "releaseAssets",
          id,
          context,
          data: {
            uploadStatus: "failed",
            failure: "Installer verification failed; upload a replacement",
          },
        });
      }
      throw error;
    }
  });
}
