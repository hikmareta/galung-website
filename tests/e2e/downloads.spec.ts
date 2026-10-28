import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
assertIsolatedDatabase();
test.use({ ignoreHTTPSErrors: true });
test("admin direct multipart, worker verification, bilingual downloads and retirement", async ({
  page,
  request,
}) => {
  test.setTimeout(300000);
  const { getPayload } = await import("payload");
  const { default: config } = await import("../../src/payload.config");
  const { verifyAsset } = await import("../../src/services/downloads/workflow");
  const { s3Storage } = await import("../../src/services/downloads/storage");
  const payload = await getPayload({ config, key: "download-browser" });
  const password = "Original-fixture-password-06!";
  const user = await payload.create({
    collection: "users",
    context: { bootstrapAdmin: true },
    data: {
      name: "Download fixture",
      email: "downloads@example.invalid",
      password,
      active: true,
      role: "super-admin",
    },
  });
  const actor = { ...user, collection: "users" as const };
  const createdPages: number[] = [];
  let releaseId: number | undefined;
  try {
    const rejected = await request.post("/api/installers", {
      headers: { Origin: process.env.NEXT_PUBLIC_SITE_URL! },
      data: { action: "begin" },
    });
    expect(rejected.status()).toBe(403);
    const product = await payload.create({
      collection: "products",
      draft: true,
      data: {
        key: "galung",
        title: "Fixture product",
        slug: "fixture-product",
      },
    });
    const release = await payload.create({
      collection: "softwareReleases",
      draft: true,
      user: actor,
      locale: "id",
      data: {
        product: product.id,
        version: "6.0.0",
        channel: "stable",
        lifecycle: "draft",
        changelog: "ID fixture release notes",
      },
    });
    releaseId = release.id;
    await payload.update({
      collection: "softwareReleases",
      id: release.id,
      draft: true,
      user: actor,
      locale: "en",
      data: { changelog: "EN fixture release notes" },
    });
    for (const locale of ["id", "en"] as const) {
      if (locale === "id") {
        const doc = await payload.create({
          collection: "pages",
          user: actor,
          draft: true,
          locale,
          data: {
            key: "download",
            title: "ID fixture downloads",
            slug: "download",
          },
        });
        createdPages.push(doc.id);
      } else
        await payload.update({
          collection: "pages",
          id: createdPages[0],
          user: actor,
          draft: true,
          locale,
          data: { title: "EN fixture downloads", slug: "download" },
        });
    }
    await payload.update({
      collection: "pages",
      id: createdPages[0],
      user: actor,
      data: { _status: "published", reviewedLocales: ["id", "en"] },
    });
    await page.goto("/id/download");
    await expect(
      page.getByText("Belum ada installer terverifikasi"),
    ).toBeVisible();
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill(user.email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Login", exact: true }).click();
    await expect(page).toHaveURL(/\/admin$/);
    const oversized = await page.request.post("/api/installers", {
      headers: { Origin: process.env.NEXT_PUBLIC_SITE_URL! },
      data: { action: "begin", padding: "x".repeat(32768) },
    });
    expect(oversized.status()).toBe(413);
    await page.goto(`/admin/collections/softwareReleases/${release.id}`);
    const appBinaryRequests: string[] = [];
    page.on("request", (req) => {
      if (
        req.url().startsWith(process.env.NEXT_PUBLIC_SITE_URL!) &&
        (req.postDataBuffer()?.length || 0) > 32768
      )
        appBinaryRequests.push(req.url());
    });
    const windows = Buffer.alloc(8 * 1024 * 1024 + 31, 0x61);
    windows.write("MZ");
    const mac = Buffer.from("xar! synthetic browser fixture");
    for (const [os, name, body] of [
      ["windows", "browser.exe", windows],
      ["macos", "browser.pkg", mac],
    ] as const) {
      await page.getByLabel("Operating system").selectOption(os);
      await page.getByLabel("Approved architecture").fill("fixture");
      await page
        .getByLabel("Expected SHA-256")
        .fill(createHash("sha256").update(body).digest("hex"));
      await page.getByLabel("Installer file").setInputFiles({
        name,
        mimeType: "application/octet-stream",
        buffer: body,
      });
      await page
        .getByRole("button", { name: "Upload directly to storage" })
        .click();
      await expect(
        page.getByText("Upload complete. Verification is pending", {
          exact: false,
        }),
      ).toBeVisible({ timeout: 60000 });
    }
    expect(appBinaryRequests).toEqual([]);
    const assets = await payload.find({
      collection: "releaseAssets",
      where: { release: { equals: release.id } },
      depth: 0,
    });
    expect(assets.docs).toHaveLength(2);
    for (const asset of assets.docs) {
      expect(asset.uploadStatus).toBe("uploaded");
      await verifyAsset(payload, s3Storage(), asset.id);
    }
    await payload.update({
      collection: "softwareReleases",
      id: release.id,
      user: actor,
      data: {
        lifecycle: "active",
        _status: "published",
        reviewedLocales: ["id", "en"],
      },
    });
    const storage = await request.get(
      `${process.env.DOWNLOAD_S3_ENDPOINT}/fixture-stats`,
    );
    expect((await storage.json()).putBytes).toBe(windows.length + mac.length);
    for (const locale of ["id", "en"] as const) {
      for (const width of [375, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/${locale}/download`);
        await expect(
          page.getByRole("heading", { name: "Windows · fixture" }),
        ).toBeVisible();
        await expect(
          page.getByRole("heading", { name: "macOS · fixture" }),
        ).toBeVisible();
        await expect(
          page
            .getByText(`${locale.toUpperCase()} fixture release notes`)
            .first(),
        ).toBeVisible();
        await expect(
          page.getByText(createHash("sha256").update(windows).digest("hex")),
        ).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        ).toBe(true);
        await page.screenshot({
          path: `documentation/screenshots/phase-06-${locale}-${width}.png`,
          fullPage: true,
        });
      }
    }
    const first = assets.docs.find((asset) => asset.os === "windows")!;
    const response = await request.get(`/api/downloads/${first.id}?locale=en`, {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(302);
    expect((await response.body()).length).toBe(0);
    expect(response.headers()["cache-control"]).toContain("no-store");
    expect(response.headers()["location"]).toContain(
      process.env.DOWNLOAD_S3_ENDPOINT!,
    );
    expect(response.headers()["location"]).toContain("versionId=");
    const binary = await request.get(response.headers()["location"]);
    expect(binary.status()).toBe(200);
    expect(
      createHash("sha256")
        .update(await binary.body())
        .digest("hex"),
    ).toBe(createHash("sha256").update(windows).digest("hex"));
    expect(
      (await request.get(`/api/downloads/${first.id}?locale=fr`)).status(),
    ).toBe(400);
    await request.get(
      `${process.env.DOWNLOAD_S3_ENDPOINT}/fixture-outage?enabled=true`,
    );
    const outage = await request.get(`/api/downloads/${first.id}?locale=id`, {
      maxRedirects: 0,
    });
    expect(outage.status()).toBe(503);
    expect(outage.headers()["retry-after"]).toBe("60");
    expect((await outage.json()).error).toContain("Coba lagi");
    await request.get(
      `${process.env.DOWNLOAD_S3_ENDPOINT}/fixture-outage?enabled=false`,
    );
    await payload.update({
      collection: "softwareReleases",
      id: release.id,
      user: actor,
      data: { lifecycle: "retired" },
    });
    expect(
      (
        await request.get(`/api/downloads/${first.id}?locale=en`, {
          maxRedirects: 0,
        })
      ).status(),
    ).toBe(404);
    const originDenied = await request.post("/api/installers", {
      headers: { Origin: "https://attacker.invalid" },
      data: { action: "abort", id: first.id },
    });
    expect(originDenied.status()).toBe(403);
  } finally {
    if (releaseId)
      await payload.update({
        collection: "softwareReleases",
        id: releaseId,
        data: { lifecycle: "retired" },
      });
    for (const id of createdPages)
      await payload.delete({ collection: "pages", id });
    // Release/assets intentionally retain immutable history in the disposable DB.
    const products = await payload.find({
      collection: "products",
      where: { key: { equals: "galung" } },
    });
    for (const product of products.docs)
      await payload.delete({ collection: "products", id: product.id });
    await payload.delete({ collection: "users", id: user.id });
    await payload.destroy();
  }
});
