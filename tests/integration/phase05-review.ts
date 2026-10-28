// Regression coverage for the independently reproduced Phase 05 findings.
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { getPayload, type Payload } from "payload";
import config from "../../src/payload.config";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
import {
  localizedHref,
  publicSettings,
  resolvePublic,
} from "../../src/services/content/public";
import {
  contactPolicy,
  submitContact,
} from "../../src/services/contact/handler";
import { maintainContact } from "../../src/services/contact/store";
import { issueToken } from "../../src/services/contact/security";
import { contactNotices } from "../../src/services/contact/policy";
assertIsolatedDatabase();
Object.assign(process.env, {
  CONTACT_ENABLED: "true",
  CONTACT_SMTP_HOST: "unused.example.invalid",
  CONTACT_SMTP_PORT: "465",
  CONTACT_SMTP_USER: "review-fixture",
  CONTACT_SMTP_PASSWORD: "review-fixture",
  CONTACT_SMTP_FROM: "sender@example.invalid",
  CONTACT_TRUSTED_IP_HEADER: "",
});
const payload = await getPayload({ config });
const user = await payload.create({
  collection: "users",
  context: { bootstrapAdmin: true },
  data: {
    name: "Review fixture",
    email: `review-${randomBytes(8).toString("hex")}@example.invalid`,
    password: randomBytes(24).toString("hex"),
    role: "super-admin",
    active: true,
  },
});
const actor = { ...user, collection: "users" as const };
const docs: { collection: "pages" | "posts"; id: number }[] = [];
async function fixture(collection: "pages" | "posts", key: string) {
  const doc = await payload.create({
    collection,
    user: actor,
    locale: "id",
    draft: true,
    data: { key, title: `ID ${key} fixture`, slug: `id-${key}` },
  });
  docs.push({ collection, id: doc.id });
  await payload.update({
    collection,
    id: doc.id,
    user: actor,
    locale: "en",
    draft: true,
    data: { title: `EN ${key} fixture`, slug: `en-${key}` },
  });
  await payload.update({
    collection,
    id: doc.id,
    user: actor,
    locale: "id",
    data: { _status: "published", reviewedLocales: ["id", "en"] },
  });
  return doc;
}
try {
  await fixture("pages", "contact");
  await fixture("posts", "article");
  const navigation = await payload.updateGlobal({
    slug: "headerNavigation",
    user: actor,
    locale: "id",
    draft: true,
    data: {
      links: [{ label: "Artikel (fixture)", href: "/id/news/id-article" }],
    },
  });
  await payload.updateGlobal({
    slug: "headerNavigation",
    user: actor,
    locale: "en",
    draft: true,
    data: {
      links: navigation.links!.map((link) => ({
        ...link,
        label: "Article (fixture)",
      })),
    },
  });
  await payload.updateGlobal({
    slug: "headerNavigation",
    user: actor,
    locale: "id",
    data: { _status: "published" },
  });
  const nav = await publicSettings("en");
  const href = nav.navigation[0]?.href;
  assert(
    await resolvePublic("en", "news/en-article"),
    "Equivalent EN article exists",
  );
  assert.equal(await resolvePublic("en", "news/id-article"), null);
  assert.equal(href, "/en/news/en-article");
  assert.equal(
    await localizedHref("/id/news/id-article?source=nav#story", "en"),
    "/en/news/en-article?source=nav#story",
  );
  assert.equal(
    await localizedHref("/news/id-article", "en"),
    "/en/news/en-article",
  );
  assert.equal(
    await localizedHref("/en/news/en-article", "id"),
    "/id/news/id-article",
  );
  assert.equal(
    await localizedHref("https://outside.example.invalid/info", "en"),
    "https://outside.example.invalid/info",
  );
  assert.equal(await localizedHref("/id/news/missing", "en"), null);
  assert.equal(await localizedHref("/admin", "en"), null);
  await payload.updateGlobal({
    slug: "headerNavigation",
    user: actor,
    locale: "en",
    draft: true,
    data: {
      links: navigation.links!.map((link) => ({
        ...link,
        label: "EN PRIVATE NAV DRAFT",
      })),
    },
  });
  const publicNavigation = await publicSettings("en");
  assert(
    !JSON.stringify(publicNavigation.navigation).includes(
      "EN PRIVATE NAV DRAFT",
    ),
    "Published global projection must not expose a later draft",
  );
  const draft = await payload.create({
    collection: "posts",
    user: actor,
    locale: "id",
    draft: true,
    data: {
      key: "private-article",
      title: "PRIVATE ARTICLE",
      slug: "private-article",
    },
  });
  docs.push({ collection: "posts", id: draft.id });
  const previousIndexing = process.env.PUBLIC_INDEXING;
  try {
    process.env.PUBLIC_INDEXING = "true";
    const { default: sitemap } = await import("../../src/app/sitemap");
    const entries = await sitemap();
    const idEntry = entries.find(
      (entry) => new URL(entry.url).pathname === "/id/news/id-article",
    );
    const enEntry = entries.find(
      (entry) => new URL(entry.url).pathname === "/en/news/en-article",
    );
    assert(idEntry && enEntry);
    assert.equal(
      new URL(String(idEntry.alternates?.languages?.en)).pathname,
      "/en/news/en-article",
    );
    assert.equal(
      new URL(String(enEntry.alternates?.languages?.id)).pathname,
      "/id/news/id-article",
    );
    assert(!entries.some((entry) => entry.url.includes("private-article")));
    console.log(
      "PASS review controls: published globals exclude later draft changes; enabled sitemap generator includes reciprocal localized detail slugs and excludes drafts (isolated process only).",
    );
  } finally {
    if (previousIndexing === undefined) delete process.env.PUBLIC_INDEXING;
    else process.env.PUBLIC_INDEXING = previousIndexing;
  }
  await maintainContact(payload);
  const token = issueToken(process.env.PAYLOAD_SECRET!, Date.now() - 5000);
  const input = {
    submissionId: crypto.randomUUID(),
    name: "Synthetic review",
    email: "visitor@example.invalid",
    message: "Review-only message",
    locale: "id",
    privacyRevision: contactPolicy.revision as string,
    consent: true,
    token,
    website: "",
  };
  const request = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      Origin: "http://localhost:3000",
      "Content-Type": "application/json",
      Cookie: `galung-contact-token=${token}`,
    },
    body: JSON.stringify(input),
  });
  const failingAudit = new Proxy(payload, {
    get(target, key) {
      if (key === "create")
        return async (options: Parameters<Payload["create"]>[0]) => {
          if (
            options.collection === "auditEvents" &&
            (options.data as { action?: string }).action ===
              "contact-email-accepted"
          )
            throw new Error("Synthetic audit outage after SMTP accepted");
          return target.create(options);
        };
      const value = Reflect.get(target, key);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
  let accepted = 0;
  const result = await submitContact(
    request,
    failingAudit,
    "http://localhost:3000",
    process.env.PAYLOAD_SECRET!,
    async () => {
      accepted++;
    },
  );
  assert.equal(result.status, 200);
  assert.equal(accepted, 1);
  assert.equal(
    (await payload.count({ collection: "contactSubmissions" })).totalDocs,
    1,
  );
  const receipt = (await payload.find({ collection: "contactSubmissions" }))
    .docs[0];
  assert.equal(receipt.deliveryStatus, "accepted");
  assert.equal(receipt.auditPending, true);
  const { reconcileContactAudit } =
    await import("../../src/services/contact/delivery");
  const unavailableAuditLock = new Proxy(payload, {
    get(target, key) {
      if (key === "db")
        return {
          ...target.db,
          pool: {
            query: async () => {
              throw new Error("Synthetic audit lock outage");
            },
          },
        };
      const value = Reflect.get(target, key);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
  assert.equal(
    await reconcileContactAudit(unavailableAuditLock, receipt),
    false,
  );
  const retry = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      Origin: "http://localhost:3000",
      "Content-Type": "application/json",
      Cookie: `galung-contact-token=${token}`,
    },
    body: JSON.stringify(input),
  });
  assert.equal(
    (
      await submitContact(
        retry,
        failingAudit,
        "http://localhost:3000",
        process.env.PAYLOAD_SECRET!,
        async () => {
          accepted++;
        },
      )
    ).status,
    200,
  );
  assert.equal(accepted, 1, "Repeated receipt must never resend SMTP");
  const rotatedSecret = randomBytes(48).toString("hex");
  const rotatedToken = issueToken(rotatedSecret, Date.now() - 5000);
  const afterRotation = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      Origin: "http://localhost:3000",
      "Content-Type": "application/json",
      Cookie: `galung-contact-token=${rotatedToken}`,
    },
    body: JSON.stringify({ ...input, token: rotatedToken }),
  });
  assert.equal(
    (
      await submitContact(
        afterRotation,
        payload,
        "http://localhost:3000",
        rotatedSecret,
        async () => {
          accepted++;
        },
      )
    ).status,
    200,
  );
  assert.equal(
    accepted,
    1,
    "Session-secret rotation must not create another SMTP send",
  );
  await maintainContact(payload);
  await maintainContact(payload);
  const audits = await payload.find({
    collection: "auditEvents",
    where: {
      and: [
        { resourceId: { equals: String(receipt.id) } },
        { action: { equals: "contact-email-accepted" } },
      ],
    },
  });
  assert.equal(audits.totalDocs, 1);
  assert.equal(
    (
      await payload.findByID({
        collection: "contactSubmissions",
        id: receipt.id,
      })
    ).auditPending,
    false,
  );
  const values = (extra: Partial<typeof input> = {}) => ({
    ...input,
    submissionId: crypto.randomUUID(),
    token: issueToken(process.env.PAYLOAD_SECRET!, Date.now() - 5000),
    ...extra,
  });
  const requestFor = (data: typeof input) =>
    new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
        Cookie: `galung-contact-token=${data.token}`,
      },
      body: JSON.stringify(data),
    });
  const heartbeatBefore = await payload.db.pool.query(
    "SELECT data FROM payload_kv WHERE key = 'contact-retention'",
  );
  const concurrent = values({ email: "concurrent@example.invalid" });
  let concurrentSends = 0;
  const concurrentResults = await Promise.all(
    Array.from({ length: 3 }, () => {
      const body = {
        ...concurrent,
        token: issueToken(process.env.PAYLOAD_SECRET!, Date.now() - 5000),
      };
      return submitContact(
        requestFor(body),
        payload,
        "http://localhost:3000",
        process.env.PAYLOAD_SECRET!,
        async () => {
          concurrentSends++;
          await new Promise((resolve) => setTimeout(resolve, 40));
        },
      );
    }),
  );
  assert.equal(concurrentSends, 1);
  assert(
    concurrentResults.every(
      (response) => response.status === 200 || response.status === 202,
    ),
  );
  const uncertain = values({ email: "uncertain@example.invalid" });
  let uncertainSends = 0;
  const unknown = await submitContact(
    requestFor(uncertain),
    payload,
    "http://localhost:3000",
    process.env.PAYLOAD_SECRET!,
    async () => {
      uncertainSends++;
      throw new Error("Synthetic transport timeout");
    },
  );
  assert.equal(unknown.status, 202);
  assert.equal((await unknown.json()).code, "unknown");
  assert.equal(
    (
      await submitContact(
        requestFor(uncertain),
        payload,
        "http://localhost:3000",
        process.env.PAYLOAD_SECRET!,
        async () => {
          uncertainSends++;
        },
      )
    ).status,
    202,
  );
  assert.equal(uncertainSends, 1);
  assert.deepEqual(
    (
      await payload.db.pool.query(
        "SELECT data FROM payload_kv WHERE key = 'contact-retention'",
      )
    ).rows,
    heartbeatBefore.rows,
    "Visitor submissions must not impersonate a healthy maintenance worker",
  );
  const uncertainDoc = (
    await payload.find({
      collection: "contactSubmissions",
      where: { email: { equals: uncertain.email } },
    })
  ).docs[0];
  await payload.update({
    collection: "contactSubmissions",
    id: uncertainDoc.id,
    user: actor,
    overrideAccess: false,
    data: { privacyRevision: "forged", deliveryStatus: "accepted" },
  });
  const protectedDoc = await payload.findByID({
    collection: "contactSubmissions",
    id: uncertainDoc.id,
  });
  assert.equal(protectedDoc.privacyRevision, contactPolicy.revision);
  assert.equal(protectedDoc.deliveryStatus, "unknown");
  const writeLoss = values({ email: "write-loss@example.invalid" });
  let writeLossSends = 0;
  const failedStatusWrite = new Proxy(payload, {
    get(target, key) {
      if (key === "update")
        return async (options: Parameters<Payload["update"]>[0]) => {
          if (
            options.collection === "contactSubmissions" &&
            (options.data as { deliveryStatus?: string }).deliveryStatus ===
              "accepted"
          )
            throw new Error("Synthetic receipt write outage");
          return target.update(options);
        };
      const value = Reflect.get(target, key);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
  assert.equal(
    (
      await submitContact(
        requestFor(writeLoss),
        failedStatusWrite,
        "http://localhost:3000",
        process.env.PAYLOAD_SECRET!,
        async () => {
          writeLossSends++;
        },
      )
    ).status,
    202,
  );
  assert.equal(
    (
      await submitContact(
        requestFor(writeLoss),
        payload,
        "http://localhost:3000",
        process.env.PAYLOAD_SECRET!,
        async () => {
          writeLossSends++;
        },
      )
    ).status,
    202,
  );
  assert.equal(writeLossSends, 1);
  const pending = (
    await payload.find({
      collection: "contactSubmissions",
      where: { email: { equals: writeLoss.email } },
    })
  ).docs[0];
  await payload.db.pool.query(
    "UPDATE contact_submissions SET created_at = $1 WHERE id = $2",
    [new Date(Date.now() - 180000), pending.id],
  );
  await maintainContact(payload);
  assert.equal(
    (
      await payload.findByID({
        collection: "contactSubmissions",
        id: pending.id,
      })
    ).deliveryStatus,
    "unknown",
  );
  const english = values({
    locale: "en",
    privacyRevision: contactNotices.en.revision,
    email: "en@example.invalid",
  });
  assert.equal(
    (
      await submitContact(
        requestFor(english),
        payload,
        "http://localhost:3000",
        process.env.PAYLOAD_SECRET!,
        async () => {},
      )
    ).status,
    200,
  );
  console.log(
    "PASS P05-R1/R2: localized navigation; durable/concurrent receipts; audit and post-send DB outages; unknown status without resend; maintenance recovery; protected privacy revision; approved EN submission.",
  );
} finally {
  await payload.db.pool.query(
    "DELETE FROM payload_kv WHERE key LIKE 'contact:%' OR key = 'contact-retention'",
  );
  await payload.delete({ collection: "contactSubmissions", where: {} });
  for (const doc of docs.reverse())
    await payload.delete({ ...doc, user: actor });
  await payload.delete({ collection: "users", id: user.id });
  await payload.destroy();
}
