import { smtpConfiguration } from "./configuration.ts";
import { isIP } from "node:net";
import type { Payload } from "payload";
import type { ContactSubmission } from "@/payload-types";
import { contactPolicy, validateContact, type ContactInput } from "./policy.ts";
import {
  boundedJSON,
  digest,
  receiptDigest,
  equalSecret,
  issueToken,
  validToken,
} from "./security.ts";
import { consumeLimit, freshRetention, purgeContact } from "./store.ts";
import {
  ContactDeliveryError,
  receiptResult,
  reconcileContactAudit,
} from "./delivery.ts";

const cookieName = "galung-contact-token";
export function contactResponse(
  code: string,
  status: number,
  headers: Record<string, string> = {},
) {
  return Response.json(
    { code },
    {
      status,
      headers: {
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
        ...headers,
      },
    },
  );
}
export async function contactReady(
  payload: Payload,
  locale: "id" | "en" = "id",
) {
  if (!smtpConfiguration() || !(await freshRetention(payload))) return false;
  const pages = await payload.find({
    collection: "pages",
    locale,
    fallbackLocale: false,
    draft: false,
    overrideAccess: false,
    depth: 0,
    limit: 1,
    where: {
      and: [
        { key: { equals: "contact" } },
        { _status: { equals: "published" } },
      ],
    },
  });
  return !!pages.docs[0]?.title && !!pages.docs[0]?.slug;
}
export async function tokenResponse(
  request: Request,
  payload: Payload,
  origin: string,
  secret: string,
) {
  if (
    request.headers.get("sec-fetch-site") === "cross-site" ||
    (request.headers.get("origin") && request.headers.get("origin") !== origin)
  )
    return contactResponse("forbidden", 403);
  const locale = new URL(request.url).searchParams.get("locale") || "id";
  if (
    (locale !== "id" && locale !== "en") ||
    !(await contactReady(payload, locale))
  )
    return contactResponse("unavailable", 503);
  if (!(await consumeLimit(payload, "contact:token-budget", 300, 3600000)))
    return contactResponse("rate", 429, { "Retry-After": "3600" });
  const token = issueToken(secret);
  return Response.json(
    { token },
    {
      headers: {
        "Cache-Control": "private, no-store",
        "Set-Cookie": `${cookieName}=${token}; Path=/api/contact; HttpOnly; SameSite=Strict; Max-Age=1800${origin.startsWith("https:") ? "; Secure" : ""}`,
      },
    },
  );
}
export async function submitContact(
  request: Request,
  payload: Payload,
  origin: string,
  secret: string,
  send: (data: ContactInput, id: number) => Promise<void>,
) {
  if (
    request.headers.get("origin") !== origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return contactResponse("forbidden", 403);
  if (!smtpConfiguration() || !(await freshRetention(payload)))
    return contactResponse("unavailable", 503);
  if (!(await consumeLimit(payload, "contact:submission-budget", 100, 3600000)))
    return contactResponse("rate", 429, { "Retry-After": "3600" });
  let raw: unknown;
  try {
    raw = await boundedJSON(request);
  } catch (error) {
    return contactResponse(
      "invalid",
      error instanceof Error && error.message === "size"
        ? 413
        : error instanceof Error && error.message === "media"
          ? 415
          : 400,
    );
  }
  const data = validateContact(raw);
  if (!data || data.website) return contactResponse("invalid", 400);
  if (!(await contactReady(payload, data.locale)))
    return contactResponse("unavailable", 503);
  const cookie =
    request.headers
      .get("cookie")
      ?.split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${cookieName}=`))
      ?.slice(cookieName.length + 1) || "";
  if (!validToken(data.token, secret) || !equalSecret(cookie, data.token))
    return contactResponse("token", 403);
  await purgeContact(payload);
  const submissionKey = receiptDigest(`submission:${data.submissionId}`);
  const fingerprint = receiptDigest(
    JSON.stringify([
      data.name,
      data.email.toLowerCase(),
      data.message,
      data.locale,
      data.privacyRevision,
    ]),
  );
  async function existingReceipt() {
    const result = await payload.find({
      collection: "contactSubmissions",
      overrideAccess: true,
      depth: 0,
      limit: 1,
      where: { submissionKey: { equals: submissionKey } },
    });
    const doc = result.docs[0];
    if (!doc) return null;
    if (doc.requestFingerprint !== fingerprint)
      return contactResponse("changed", 409);
    const outcome = receiptResult(doc);
    return contactResponse(outcome.code, outcome.status);
  }
  const existing = await existingReceipt();
  if (existing) return existing;
  const ipHeader = process.env.CONTACT_TRUSTED_IP_HEADER;
  const ip =
    ipHeader && ["x-real-ip", "cf-connecting-ip"].includes(ipHeader)
      ? request.headers.get(ipHeader)
      : null;
  // No untrusted X-Forwarded-For. Without a trusted proxy all visitors share this cap.
  const clientKey = ip && isIP(ip) ? digest(`ip:${ip}`, secret) : "shared";
  if (
    !(await consumeLimit(
      payload,
      `contact:client:${clientKey}`,
      10,
      3600000,
    )) ||
    !(await consumeLimit(
      payload,
      `contact:email:${digest(data.email.toLowerCase(), secret)}`,
      5,
      3600000,
    ))
  )
    return contactResponse("rate", 429, { "Retry-After": "3600" });
  if (
    !(await consumeLimit(
      payload,
      `contact:nonce:${digest(data.token, secret)}`,
      1,
      30 * 60000,
    ))
  )
    return contactResponse("token", 403);
  // The collection remains closed to anonymous REST writes. Only this bounded path bypasses create access.
  let doc: ContactSubmission;
  try {
    doc = await payload.create({
      collection: "contactSubmissions",
      overrideAccess: true,
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
        locale: data.locale,
        status: "new",
        submissionKey,
        requestFingerprint: fingerprint,
        privacyRevision: data.privacyRevision,
        deliveryStatus: "pending",
        auditPending: false,
      },
    });
  } catch (error) {
    const raced = await existingReceipt();
    if (raced) return raced;
    throw error;
  }
  let state: "accepted" | "failed" | "unknown" = "accepted";
  try {
    await send(data, doc.id);
  } catch (error) {
    state = error instanceof ContactDeliveryError ? error.certainty : "unknown";
  }
  try {
    doc = await payload.update({
      collection: "contactSubmissions",
      id: doc.id,
      overrideAccess: true,
      data: {
        deliveryStatus: state,
        acceptedAt: state === "accepted" ? new Date().toISOString() : null,
        auditPending: true,
      },
    });
  } catch {
    // The durable pending receipt prevents a second SMTP attempt even if the DB fails after send.
    return contactResponse("unknown", 202);
  }
  await reconcileContactAudit(payload, doc);
  const outcome = receiptResult(doc);
  return contactResponse(outcome.code, outcome.status);
}
export { contactPolicy };
