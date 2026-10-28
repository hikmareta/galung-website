import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { getPayload } from "payload";
import config from "../../src/payload.config";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
import {
  contactPolicy,
  contactReady,
  submitContact,
} from "../../src/services/contact/handler";
import {
  consumeLimit,
  freshRetention,
  maintainContact,
} from "../../src/services/contact/store";
import { issueToken } from "../../src/services/contact/security";
import { ContactDeliveryError } from "../../src/services/contact/delivery";
assertIsolatedDatabase();
Object.assign(process.env, {
  CONTACT_ENABLED: "true",
  CONTACT_SMTP_HOST: "unused.example.invalid",
  CONTACT_SMTP_PORT: "465",
  CONTACT_SMTP_USER: "fixture",
  CONTACT_SMTP_PASSWORD: "fixture",
  CONTACT_SMTP_FROM: "sender@example.invalid",
  CONTACT_TRUSTED_IP_HEADER: "",
});
const payload = await getPayload({ config });
const admin = await payload.create({
  collection: "users",
  context: { bootstrapAdmin: true },
  data: {
    name: "Contact fixture",
    email: `${randomBytes(8).toString("hex")}@example.invalid`,
    password: randomBytes(24).toString("hex"),
    role: "super-admin",
    active: true,
  },
});
const actor = { ...admin, collection: "users" as const };
const origin = "http://localhost:3000";
const secret = process.env.PAYLOAD_SECRET!;
let pageId: number | undefined;
try {
  const page = await payload.create({
    collection: "pages",
    user: actor,
    locale: "id",
    draft: true,
    data: { key: "contact", title: "ID contact test", slug: "contact" },
  });
  pageId = page.id;
  await payload.update({
    collection: "pages",
    id: page.id,
    user: actor,
    locale: "en",
    draft: true,
    data: { title: "EN contact test", slug: "contact" },
  });
  await payload.update({
    collection: "pages",
    id: page.id,
    user: actor,
    locale: "id",
    data: { _status: "published", reviewedLocales: ["id", "en"] },
  });
  assert.equal(await contactReady(payload), false);
  await maintainContact(payload);
  assert.equal(await contactReady(payload), true);
  const allowed = await Promise.all(
    Array.from({ length: 24 }, () =>
      consumeLimit(payload, "contact:atomic-test", 7, 3600000),
    ),
  );
  assert.equal(allowed.filter(Boolean).length, 7);
  const token = issueToken(secret, Date.now() - 5000);
  const input = {
    submissionId: crypto.randomUUID(),
    name: "Synthetic visitor",
    email: "visitor@example.invalid",
    message: "Private fixture text",
    locale: "id",
    consent: true,
    privacyRevision: contactPolicy.revision,
    token,
    website: "",
  };
  const request = (body: unknown = input, extra: Record<string, string> = {}) =>
    new Request(`${origin}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Cookie: `galung-contact-token=${token}`,
        ...extra,
      },
      body: JSON.stringify(body),
    });
  const delivered: unknown[] = [];
  const send = async (data: unknown) => {
    delivered.push(data);
  };
  assert.equal(
    (
      await submitContact(
        request(input, { Origin: "https://evil.invalid" }),
        payload,
        origin,
        secret,
        send,
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await submitContact(
        request({ ...input, locale: "en" }),
        payload,
        origin,
        secret,
        send,
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await submitContact(
        request({ ...input, website: "bot.example.invalid" }),
        payload,
        origin,
        secret,
        send,
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await submitContact(
        request(input, { Cookie: "" }),
        payload,
        origin,
        secret,
        send,
      )
    ).status,
    403,
  );
  assert.equal(
    (await submitContact(request(), payload, origin, secret, send)).status,
    200,
  );
  assert.equal(
    (await submitContact(request(), payload, origin, secret, send)).status,
    200,
  );
  assert.equal(
    (
      await submitContact(
        request({ ...input, submissionId: crypto.randomUUID() }),
        payload,
        origin,
        secret,
        send,
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await submitContact(
        request({ ...input, message: "Different content" }),
        payload,
        origin,
        secret,
        send,
      )
    ).status,
    409,
  );
  assert.equal(delivered.length, 1);
  await assert.rejects(
    payload.find({ collection: "contactSubmissions", overrideAccess: false }),
  );
  await assert.rejects(
    payload.find({ collection: "payload-kv", overrideAccess: false }),
  );
  const records = await payload.find({ collection: "contactSubmissions" });
  assert.equal(records.totalDocs, 1);
  const oldId = records.docs[0].id;
  await payload.db.pool.query(
    "UPDATE contact_submissions SET created_at = $1 WHERE id = $2",
    [new Date(Date.now() - 31 * 86400000), oldId],
  );
  assert.equal(
    (
      await payload.find({
        collection: "contactSubmissions",
        user: actor,
        overrideAccess: false,
      })
    ).totalDocs,
    0,
  );
  assert.equal((await maintainContact(payload)).removed, 1);
  assert.equal(
    (await payload.count({ collection: "contactSubmissions" })).totalDocs,
    0,
  );
  await payload.db.pool.query(
    "UPDATE payload_kv SET data = $1::jsonb WHERE key = 'contact-retention'",
    [JSON.stringify({ completedAt: Date.now() - 3 * 3600000 })],
  );
  assert.equal(await freshRetention(payload), false);
  assert.equal(await contactReady(payload), false);
  await maintainContact(payload);
  const failureToken = issueToken(secret, Date.now() - 5000);
  const failed = await submitContact(
    request(
      { ...input, token: failureToken },
      { Cookie: `galung-contact-token=${failureToken}` },
    ),
    payload,
    origin,
    secret,
    async () => {
      throw new ContactDeliveryError("failed");
    },
  );
  assert.equal(failed.status, 503);
  const events = await payload.find({
    collection: "auditEvents",
    where: { resource: { equals: "contactSubmissions" } },
  });
  assert(events.docs.some((event) => event.action === "contact-email-failed"));
  assert(!JSON.stringify(events.docs).includes(input.message));
  console.log(
    "PASS: atomic shared rate limits, strict origin/token/replay/locale/honeypot, private submissions/KV, SMTP failure, 30-day deletion and stale-worker fail-closed",
  );
} finally {
  await payload.db.pool.query(
    "DELETE FROM payload_kv WHERE key LIKE 'contact:%' OR key = 'contact-retention'",
  );
  await payload.delete({ collection: "contactSubmissions", where: {} });
  if (pageId)
    await payload.delete({ collection: "pages", id: pageId, user: actor });
  await payload.delete({ collection: "users", id: admin.id });
  await payload.destroy();
}
