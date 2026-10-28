import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { getPayload } from "payload";
import config from "../../src/payload.config";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
import {
  beginUpload,
  uploadAction,
  uploadStatus,
  verifyAsset,
} from "../../src/services/downloads/workflow";
import {
  publicInstallers,
  downloadTarget,
} from "../../src/services/downloads/public";
import { workflowCapability } from "../../src/services/downloads/guards";
import type { InstallerStorage } from "../../src/services/downloads/storage";
assertIsolatedDatabase();
process.env.DOWNLOAD_ARCHITECTURES = "windows:fixture,macos:fixture";
const payload = await getPayload({ config });
const bytes = new Map<string, Buffer>();
let completes = 0;
let aborts = 0;
let unavailable = false;
const windows = Buffer.from("MZ synthetic installer; not executable");
const mac = Buffer.from("xar! synthetic package; not executable");
const storage: InstallerStorage = {
  async begin(key) {
    bytes.set(key, key.endsWith(".exe") ? windows : mac);
    return "scoped-upload";
  },
  async signPart(key, upload, part, size) {
    return `https://storage.example.invalid/${key}?uploadId=${upload}&partNumber=${part}&size=${size}`;
  },
  async parts(key) {
    return [{ part: 1, size: bytes.get(key)!.length, etag: "fixture-etag" }];
  },
  async complete() {
    completes++;
    return "immutable-version";
  },
  async abort() {
    aborts++;
  },
  async head(key, version) {
    if (unavailable) throw new Error("Storage outage");
    assert.equal(version, "immutable-version");
    return { size: bytes.get(key)!.length, etag: "fixture-etag" };
  },
  async read(key, version) {
    assert.equal(version, "immutable-version");
    return (async function* () {
      const value = bytes.get(key)!;
      yield value.subarray(0, 1);
      yield value.subarray(1);
    })();
  },
  async download(key, version) {
    return `https://storage.example.invalid/${key}?versionId=${version}`;
  },
};
try {
  const actors = [];
  for (const role of [
    "super-admin",
    "super-admin",
    "editor",
    "publisher",
  ] as const) {
    const user = await payload.create({
      collection: "users",
      context: { bootstrapAdmin: true },
      data: {
        name: role,
        email: `${randomBytes(10).toString("hex")}@example.invalid`,
        password: randomBytes(24).toString("hex"),
        role,
        active: true,
      },
    });
    actors.push({ ...user, collection: "users" as const });
  }
  const [admin, other, editor, publisher] = actors;
  const existing = await payload.find({
    collection: "products",
    where: { key: { equals: "galung" } },
    limit: 1,
  });
  const product =
    existing.docs[0] ||
    (await payload.create({
      collection: "products",
      draft: true,
      data: { key: "galung", title: "Fixture", slug: "fixture" },
    }));
  const release = await payload.create({
    collection: "softwareReleases",
    user: admin,
    overrideAccess: false,
    draft: true,
    locale: "id",
    data: {
      product: product.id,
      version: "6.0.0",
      channel: "stable",
      lifecycle: "draft",
      changelog: "ID fixture notes",
    },
  });
  for (const user of [undefined, editor, publisher]) {
    await assert.rejects(
      payload.find({
        collection: "releaseAssets",
        user,
        overrideAccess: false,
      }),
      { status: 403 },
    );
    await assert.rejects(
      payload.update({
        collection: "softwareReleases",
        id: release.id,
        user,
        overrideAccess: false,
        data: { lifecycle: "active", _status: "published" },
      }),
      { status: 403 },
    );
  }
  await assert.rejects(
    payload.create({
      collection: "releaseAssets",
      user: admin,
      overrideAccess: false,
      data: {
        release: release.id,
        os: "windows",
        uploadStatus: "verified",
        visibility: "private",
      },
    }),
    { status: 403 },
  );
  const publish = () =>
    payload.update({
      collection: "softwareReleases",
      id: release.id,
      user: admin,
      overrideAccess: false,
      locale: "id",
      data: {
        lifecycle: "active",
        reviewedLocales: ["id", "en"],
        _status: "published",
      },
    });
  await assert.rejects(publish(), { status: 400 });
  const make = async (os: "windows" | "macos", hash?: string) => {
    const data = os === "windows" ? windows : mac;
    return beginUpload(payload, storage, admin, {
      release: release.id,
      os,
      architecture: "fixture",
      filename: os === "windows" ? "fixture.exe" : "fixture.pkg",
      sizeBytes: data.length,
      sha256: hash || createHash("sha256").update(data).digest("hex"),
    });
  };
  const first = await make("windows");
  await assert.rejects(uploadStatus(payload, other, first.id), { status: 403 });
  assert.equal(
    (await uploadStatus(payload, admin, first.id)).status,
    "pending",
  );
  assert.deepEqual(
    Object.keys(await uploadStatus(payload, admin, first.id)).sort(),
    ["expiresAt", "id", "release", "status"],
  );
  await assert.rejects(
    uploadAction(payload, storage, other, first.id, "part", 1),
    { status: 403 },
  );
  await assert.rejects(
    uploadAction(payload, storage, admin, first.id, "part", 2),
  );
  const signed = await uploadAction(
    payload,
    storage,
    admin,
    first.id,
    "part",
    1,
  );
  assert.ok("url" in signed && signed.url?.includes("partNumber=1"));
  const concurrent = await Promise.allSettled([
    uploadAction(payload, storage, admin, first.id, "complete"),
    uploadAction(payload, storage, admin, first.id, "complete"),
  ]);
  assert.ok(concurrent.some((result) => result.status === "fulfilled"));
  for (const result of concurrent)
    if (result.status === "rejected") {
      assert.equal(result.reason.status, 409);
      assert.equal(result.reason.code, "busy");
    }
  await uploadAction(payload, storage, admin, first.id, "complete");
  assert.equal(completes, 1);
  assert.deepEqual(await publicInstallers(payload, "id"), []);
  await verifyAsset(payload, storage, first.id);
  await assert.rejects(
    payload.update({
      collection: "releaseAssets",
      id: first.id,
      user: admin,
      data: { sha256: "0".repeat(64) },
    }),
    { status: 403 },
  );
  const wrong = await make("windows", "0".repeat(64));
  await uploadAction(payload, storage, admin, wrong.id, "complete");
  await assert.rejects(verifyAsset(payload, storage, wrong.id), /mismatch/);
  assert.equal(
    (await payload.findByID({ collection: "releaseAssets", id: wrong.id }))
      .uploadStatus,
    "failed",
  );
  const second = await make("macos");
  await uploadAction(payload, storage, admin, second.id, "complete");
  unavailable = true;
  await assert.rejects(verifyAsset(payload, storage, second.id));
  assert.equal(
    (await payload.findByID({ collection: "releaseAssets", id: second.id }))
      .uploadStatus,
    "uploaded",
  );
  unavailable = false;
  await verifyAsset(payload, storage, second.id);
  await assert.rejects(publish(), { status: 400 }); // missing EN notes
  await payload.update({
    collection: "softwareReleases",
    id: release.id,
    user: admin,
    draft: true,
    locale: "en",
    data: { changelog: "EN fixture notes" },
  });
  const late = await make("windows");
  await publish();
  await uploadAction(payload, storage, admin, late.id, "complete");
  await verifyAsset(payload, storage, late.id);
  assert.equal(
    (await uploadStatus(payload, admin, first.id)).status,
    "verified",
  );
  await assert.rejects(publish(), /duplicate OS\/architecture/);
  const select = (ids: number[]) =>
    payload.update({
      collection: "softwareReleases",
      id: release.id,
      user: admin,
      overrideAccess: false,
      locale: "id",
      data: { assetsToPublish: ids, _status: "published", lifecycle: "active" },
    });
  await assert.rejects(select([wrong.id, second.id]), { status: 400 });
  await assert.rejects(select([first.id, late.id, second.id]), { status: 400 });
  await assert.rejects(select([first.id]), { status: 400 });
  const repaired = await select([first.id, second.id]);
  assert.deepEqual(
    new Set(repaired.approvedAssets as number[]),
    new Set([first.id, second.id]),
  );
  assert.equal(await downloadTarget(payload, storage, late.id, "id"), null);
  for (const locale of ["id", "en"] as const) {
    const cards = await publicInstallers(payload, locale);
    assert.equal(cards.length, 2);
    assert.ok(
      cards.every((card) => card.changelog.startsWith(locale.toUpperCase())),
    );
    assert.ok(!JSON.stringify(cards).includes("storageKey"));
    assert.match(
      (await downloadTarget(payload, storage, first.id, locale))!,
      /^https:\/\/storage\.example\.invalid\/.+versionId=immutable-version$/,
    );
  }
  assert.equal(await downloadTarget(payload, storage, wrong.id, "id"), null);
  unavailable = true;
  await assert.rejects(downloadTarget(payload, storage, first.id, "id"));
  unavailable = false;
  await assert.rejects(make("windows"), { status: 409 });
  await payload.update({
    collection: "softwareReleases",
    id: release.id,
    user: admin,
    data: { lifecycle: "retired" },
  });
  assert.deepEqual(await publicInstallers(payload, "id"), []);
  assert.equal(await downloadTarget(payload, storage, first.id, "id"), null);
  await assert.rejects(
    payload.delete({
      collection: "softwareReleases",
      id: release.id,
      user: admin,
      overrideAccess: false,
    }),
    { status: 403 },
  );
  const draft = await payload.create({
    collection: "softwareReleases",
    draft: true,
    data: {
      product: product.id,
      version: "6.0.1",
      lifecycle: "draft",
      channel: "stable",
    },
  });
  const pending = await beginUpload(payload, storage, admin, {
    release: draft.id,
    os: "windows",
    architecture: "fixture",
    filename: "expired.exe",
    sizeBytes: windows.length,
    sha256: createHash("sha256").update(windows).digest("hex"),
  });
  await assert.rejects(select([first.id, second.id, pending.id]), {
    status: 400,
  });
  await payload.update({
    collection: "releaseAssets",
    id: pending.id,
    context: { downloadWorkflow: workflowCapability },
    data: { uploadExpiresAt: new Date(0).toISOString() },
  });
  await assert.rejects(
    uploadAction(payload, storage, admin, pending.id, "part", 1),
    { status: 410 },
  );
  assert.equal(aborts, 1);
  assert.equal(
    (await payload.findByID({ collection: "releaseAssets", id: pending.id }))
      .uploadStatus,
    "aborted",
  );
  const audits = await payload.count({
    collection: "auditEvents",
    where: { resource: { equals: "releaseAssets" } },
  });
  assert.ok(audits.totalDocs >= 8);
  console.log(
    "PASS: download RBAC, scoped multipart, concurrent completion, independent hash, format, outage retry, ID/EN publication, anonymous projection/redirect, retirement, expiry and audit",
  );
} finally {
  await payload.destroy();
}
