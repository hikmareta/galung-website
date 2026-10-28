import type { Payload } from "payload";
import type { ContactSubmission } from "@/payload-types";
export class ContactDeliveryError extends Error {
  readonly certainty: "failed" | "unknown";
  constructor(certainty: "failed" | "unknown") {
    super("Contact delivery did not complete");
    this.certainty = certainty;
  }
}

export function receiptResult(doc: ContactSubmission) {
  if (doc.deliveryStatus === "accepted") return { code: "sent", status: 200 };
  if (doc.deliveryStatus === "failed") return { code: "delivery", status: 503 };
  return {
    code: doc.deliveryStatus === "pending" ? "processing" : "unknown",
    status: 202,
  };
}

// Audit reconciliation never sends email. A failed audit must not turn SMTP acceptance into a retryable send.
export async function reconcileContactAudit(
  payload: Payload,
  doc: ContactSubmission,
) {
  if (!doc.auditPending) return true;
  const action =
    doc.deliveryStatus === "accepted"
      ? "contact-email-accepted"
      : doc.deliveryStatus === "failed"
        ? "contact-email-failed"
        : "contact-email-unknown";
  const lock = `contact:audit:${doc.id}`;
  const now = Date.now();
  const acquired = await payload.db.pool
    .query(
      "INSERT INTO payload_kv (key, data) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data WHERE (payload_kv.data->>'expiresAt')::bigint <= $3 RETURNING key",
      [lock, JSON.stringify({ expiresAt: now + 60000 }), now],
    )
    .catch(() => null);
  if (!acquired?.rowCount) return false;
  try {
    const existing = await payload.find({
      collection: "auditEvents",
      overrideAccess: true,
      depth: 0,
      limit: 1,
      where: {
        and: [
          { action: { equals: action } },
          { resource: { equals: "contactSubmissions" } },
          { resourceId: { equals: String(doc.id) } },
        ],
      },
    });
    if (!existing.docs.length)
      await payload.create({
        collection: "auditEvents",
        overrideAccess: true,
        data: {
          actorIdSnapshot: "contact-service",
          actorRoleSnapshot: "system",
          action,
          resource: "contactSubmissions",
          resourceId: String(doc.id),
        },
      });
    await payload.update({
      collection: "contactSubmissions",
      id: doc.id,
      overrideAccess: true,
      data: { auditPending: false },
    });
    return true;
  } catch {
    return false;
  } finally {
    await payload.db.pool
      .query("DELETE FROM payload_kv WHERE key = $1", [lock])
      .catch(() => {});
  }
}

export async function reconcileContactDeliveries(payload: Payload) {
  // A process may stop after SMTP starts. Such records are never automatically resent.
  await payload.update({
    collection: "contactSubmissions",
    overrideAccess: true,
    where: {
      and: [
        { deliveryStatus: { equals: "pending" } },
        {
          createdAt: { less_than: new Date(Date.now() - 120000).toISOString() },
        },
      ],
    },
    data: { deliveryStatus: "unknown", auditPending: true },
  });
  let cursor = 0;
  let reconciled = 0;
  while (true) {
    const result = await payload.find({
      collection: "contactSubmissions",
      overrideAccess: true,
      depth: 0,
      sort: "id",
      limit: 100,
      where: {
        and: [
          { auditPending: { equals: true } },
          { id: { greater_than: cursor } },
        ],
      },
    });
    // Failed items remain pending for the next maintenance run. Pagination avoids spinning on them.
    for (const doc of result.docs)
      if (await reconcileContactAudit(payload, doc)) reconciled++;
    if (!result.hasNextPage) break;
    cursor = result.docs.at(-1)!.id;
  }
  return reconciled;
}
