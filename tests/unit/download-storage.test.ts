import { test } from "node:test";
import assert from "node:assert/strict";
import { s3Storage } from "../../src/services/downloads/storage.ts";
test("S3 signer binds part key, upload, part number, content length and expiry; downloads bind version", async () => {
  const keys = [
    "DOWNLOAD_S3_ENDPOINT",
    "DOWNLOAD_S3_BUCKET",
    "DOWNLOAD_S3_ACCESS_KEY",
    "DOWNLOAD_S3_SECRET_KEY",
  ] as const;
  const previous = keys.map((key) => process.env[key]);
  try {
    Object.assign(process.env, {
      DOWNLOAD_S3_ENDPOINT: "https://storage.example.invalid",
      DOWNLOAD_S3_BUCKET: "fixture",
      DOWNLOAD_S3_ACCESS_KEY: "fixture-access",
      DOWNLOAD_S3_SECRET_KEY: "fixture-secret",
    });
    const storage = s3Storage();
    const part = new URL(
      await storage.signPart(
        "installers/scoped/file.exe",
        "only-this-upload",
        2,
        37,
      ),
    );
    assert.equal(part.pathname, "/fixture/installers/scoped/file.exe");
    assert.equal(part.searchParams.get("uploadId"), "only-this-upload");
    assert.equal(part.searchParams.get("partNumber"), "2");
    assert.equal(part.searchParams.get("X-Amz-Expires"), "300");
    assert.ok(
      part.searchParams.get("X-Amz-SignedHeaders")?.includes("content-length"),
    );
    const download = new URL(
      await storage.download(
        "installers/scoped/file.exe",
        "verified-version",
        "file.exe",
      ),
    );
    assert.equal(download.searchParams.get("versionId"), "verified-version");
    assert.equal(download.searchParams.get("X-Amz-Expires"), "60");
    assert.equal(
      download.searchParams.get("response-content-disposition"),
      'attachment; filename="file.exe"',
    );
    delete process.env.DOWNLOAD_S3_BUCKET;
    assert.throws(s3Storage, /not configured/);
  } finally {
    keys.forEach((key, index) => {
      if (previous[index] === undefined) delete process.env[key];
      else process.env[key] = previous[index];
    });
  }
});
