import type { Payload } from "payload";
import { contactPolicy } from "./policy.ts";
import { reconcileContactDeliveries } from "./delivery.ts";
// Atomic counters/nonces share Payload's existing persistent KV adapter table.
// This avoids an in-memory rate limiter that fails with multiple app instances.
export async function consumeLimit(
  payload: Payload,
  key: string,
  limit: number,
  ttl: number,
) {
  const now = Date.now();
  const result = await payload.db.pool.query<{ count: number }>(
    `INSERT INTO payload_kv (key, data) VALUES ($1, jsonb_build_object('count', 1, 'expiresAt', $2::bigint)) ON CONFLICT (key) DO UPDATE SET data = CASE WHEN (payload_kv.data->>'expiresAt')::bigint <= $3::bigint THEN jsonb_build_object('count', 1, 'expiresAt', $2::bigint) ELSE jsonb_set(payload_kv.data, '{count}', to_jsonb((payload_kv.data->>'count')::int + 1)) END WHERE (payload_kv.data->>'expiresAt')::bigint <= $3::bigint OR (payload_kv.data->>'count')::int < $4 RETURNING (data->>'count')::int AS count`,
    [key, now + ttl, now, limit],
  );
  return !!result.rowCount;
}
export async function freshRetention(payload: Payload, now = Date.now()) {
  const result = await payload.db.pool.query<{ data: { completedAt: number } }>(
    "SELECT data FROM payload_kv WHERE key = $1",
    ["contact-retention"],
  );
  const completed = Number(result.rows[0]?.data.completedAt);
  return (
    Number.isFinite(completed) &&
    completed <= now &&
    now - completed < 2 * 3600000
  );
}
export async function purgeContact(payload: Payload, now = Date.now()) {
  let removed = 0;
  const cutoff = new Date(
    now - contactPolicy.retentionDays * 86400000,
  ).toISOString();
  while (true) {
    const docs = await payload.find({
      collection: "contactSubmissions",
      overrideAccess: true,
      depth: 0,
      limit: 100,
      where: { createdAt: { less_than_equal: cutoff } },
    });
    if (!docs.docs.length) break;
    for (const doc of docs.docs) {
      await payload.delete({
        collection: "contactSubmissions",
        id: doc.id,
        overrideAccess: true,
      });
      removed++;
    }
  }
  await payload.db.pool.query(
    "DELETE FROM payload_kv WHERE key LIKE 'contact:%' AND (data->>'expiresAt')::bigint <= $1",
    [now],
  );
  return removed;
}
export async function maintainContact(payload: Payload, now = Date.now()) {
  const removed = await purgeContact(payload, now);
  const reconciled = await reconcileContactDeliveries(payload);
  await payload.db.pool.query(
    "INSERT INTO payload_kv (key, data) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data",
    ["contact-retention", JSON.stringify({ completedAt: now })],
  );
  return { removed, reconciled };
}
