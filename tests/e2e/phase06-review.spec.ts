import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
assertIsolatedDatabase();
test.use({ ignoreHTTPSErrors: true });
test("Phase 06 remediation: mobile uploader and recovery after busy and lost completion responses", async ({
  page,
}) => {
  test.setTimeout(180000);
  const { getPayload } = await import("payload");
  const { default: config } = await import("../../src/payload.config");
  const payload = await getPayload({ config, key: "phase06-fresh-review" });
  const user = await payload.create({
    collection: "users",
    context: { bootstrapAdmin: true },
    data: {
      name: "Review fixture",
      email: "phase06-review@example.invalid",
      password: "Review-fixture-password-2026!",
      role: "super-admin",
      active: true,
    },
  });
  const actor = { ...user, collection: "users" as const };
  let productId: number | undefined;
  let releaseId: number | undefined;
  try {
    const product = await payload.create({
      collection: "products",
      draft: true,
      data: { key: "galung", title: "Review fixture", slug: "review-fixture" },
    });
    productId = product.id;
    const release = await payload.create({
      collection: "softwareReleases",
      user: actor,
      draft: true,
      data: {
        product: product.id,
        version: "6.9.0",
        channel: "stable",
        lifecycle: "draft",
      },
    });
    releaseId = release.id;
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill(user.email);
    await page
      .getByLabel("Password", { exact: true })
      .fill("Review-fixture-password-2026!");
    await page.getByRole("button", { name: "Login", exact: true }).click();
    await expect(page).toHaveURL(/\/admin$/);
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(`/admin/collections/softwareReleases/${release.id}`);
    await expect(
      page.getByRole("heading", { name: "Upload installer" }),
    ).toBeVisible();
    const contrast = [];
    for (const theme of ["light", "dark"]) {
      const measured = await page.evaluate((theme) => {
        document.documentElement.dataset.theme = theme;
        const description = document.querySelector(
          ".galung-installer-candidates .field-description",
        );
        if (!description) throw new Error("Candidate instructions missing");
        const parse = (color: string) =>
          (color.match(/[\d.]+/g) || []).map(Number);
        const foreground = parse(getComputedStyle(description).color);
        let ancestor: Element | null = description;
        let background: number[] = [];
        while (ancestor) {
          background = parse(getComputedStyle(ancestor).backgroundColor);
          if (background.length === 3 || background[3] === 1) break;
          ancestor = ancestor.parentElement;
        }
        if (!ancestor) throw new Error("Opaque background missing");
        const luminance = (color: number[]) =>
          color
            .slice(0, 3)
            .map((value) => {
              const channel = value / 255;
              return channel <= 0.04045
                ? channel / 12.92
                : ((channel + 0.055) / 1.055) ** 2.4;
            })
            .reduce(
              (sum, value, index) =>
                sum + value * [0.2126, 0.7152, 0.0722][index],
              0,
            );
        const alpha = foreground[3] ?? 1;
        const blended = foreground
          .slice(0, 3)
          .map((value, i) => value * alpha + background[i] * (1 - alpha));
        const a = luminance(blended),
          b = luminance(background);
        return {
          theme,
          ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
        };
      }, theme);
      expect(measured.ratio).toBeGreaterThanOrEqual(4.5);
      contrast.push(measured);
    }
    await page.evaluate(() => {
      document.documentElement.dataset.theme = "light";
    });
    console.log("Candidate instruction contrast:", JSON.stringify(contrast));
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      uploader: document
        .querySelector('[aria-label="Installer upload"]')
        ?.getBoundingClientRect()
        .toJSON(),
      file: document
        .querySelector('input[type="file"]')
        ?.getBoundingClientRect()
        .toJSON(),
    }));
    console.log("REMEDIATION mobile dimensions:", JSON.stringify(dimensions));
    await page.screenshot({
      path: "documentation/screenshots/phase-06-remediated-admin-375.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 1280, height: 900 });
    const bytes = Buffer.from("MZ response-loss review fixture");
    await page.getByLabel("Approved architecture").fill("fixture");
    await page
      .getByLabel("Expected SHA-256")
      .fill(createHash("sha256").update(bytes).digest("hex"));
    await page.getByLabel("Installer file").setInputFiles({
      name: "response-loss.exe",
      mimeType: "application/octet-stream",
      buffer: bytes,
    });
    let lost = false;
    let busy = false;
    let begins = 0;
    let parts = 0;
    await page.route("**/api/installers", async (route) => {
      const body = route.request().postDataJSON();
      if (body.action === "begin") begins++;
      if (body.action === "part") parts++;
      if (body.action === "complete" && !busy) {
        busy = true;
        const key = `downloads:lease:${body.id}`;
        const token = `browser-fixture-${body.id}`;
        await payload.db.pool.query(
          "INSERT INTO payload_kv (key, data) VALUES ($1, $2::jsonb)",
          [key, JSON.stringify({ token, expiresAt: Date.now() + 60000 })],
        );
        const response = await route.fetch().finally(async () => {
          await payload.db.pool.query(
            "DELETE FROM payload_kv WHERE key = $1 AND data->>'token' = $2",
            [key, token],
          );
        });
        expect(response.status()).toBe(409);
        expect((await response.json()).code).toBe("busy");
        await route.fulfill({ response });
      } else if (body.action === "complete" && !lost) {
        const response = await route.fetch();
        expect(response.status()).toBe(200);
        lost = true;
        await route.fulfill({
          status: 503,
          json: { error: "Injected lost response after server completion" },
        });
      } else await route.continue();
    });
    await page
      .getByRole("button", { name: "Upload directly to storage" })
      .click();
    await expect(
      page.getByText(
        "Another installer operation is in progress. Retry shortly.",
        { exact: true },
      ),
    ).toBeVisible();
    await page.getByRole("button", { name: "Retry upload" }).click();
    await expect(
      page.getByText("Injected lost response after server completion"),
    ).toBeVisible();
    const before = await payload.find({
      collection: "releaseAssets",
      where: { release: { equals: release.id } },
      depth: 0,
    });
    expect(before.docs).toHaveLength(1);
    expect(before.docs[0].uploadStatus).toBe("uploaded");
    await page.getByRole("button", { name: "Retry upload" }).click();
    await expect(
      page.getByText("Upload complete. Verification is pending", {
        exact: false,
      }),
    ).toBeVisible();
    expect(
      await page
        .getByLabel("Installer file")
        .evaluate((input: HTMLInputElement) => input.files?.length),
    ).toBe(0);
    await expect(
      page.getByRole("button", { name: "Upload directly to storage" }),
    ).toBeDisabled();
    expect(begins).toBe(1);
    expect(parts).toBe(1);
    expect(
      (
        await payload.find({
          collection: "releaseAssets",
          where: { release: { equals: release.id } },
        })
      ).totalDocs,
    ).toBe(1);
    await page.screenshot({
      path: "documentation/screenshots/phase-06-remediated-retry.png",
      fullPage: true,
    });
    const mac = Buffer.from("xar! review fixture");
    await page.getByLabel("Operating system").selectOption("macos");
    await page
      .getByLabel("Expected SHA-256")
      .fill(createHash("sha256").update(mac).digest("hex"));
    await page.getByLabel("Installer file").setInputFiles({
      name: "review.pkg",
      mimeType: "application/octet-stream",
      buffer: mac,
    });
    await page
      .getByRole("button", { name: "Upload directly to storage" })
      .click();
    await expect(
      page.getByText("Upload complete. Verification is pending", {
        exact: false,
      }),
    ).toBeVisible();
    const { s3Storage } = await import("../../src/services/downloads/storage");
    const { verifyAsset } =
      await import("../../src/services/downloads/workflow");
    const assets = await payload.find({
      collection: "releaseAssets",
      where: { release: { equals: release.id } },
      depth: 0,
    });
    expect(assets.docs).toHaveLength(2);
    for (const asset of assets.docs)
      await verifyAsset(payload, s3Storage(), asset.id);
    await payload.update({
      collection: "softwareReleases",
      id: release.id,
      user: actor,
      draft: true,
      locale: "id",
      data: { changelog: "ID review notes" },
    });
    await payload.update({
      collection: "softwareReleases",
      id: release.id,
      user: actor,
      draft: true,
      locale: "en",
      data: { changelog: "EN review notes" },
    });
    await payload.update({
      collection: "softwareReleases",
      id: release.id,
      user: actor,
      overrideAccess: false,
      data: {
        _status: "published",
        lifecycle: "active",
        reviewedLocales: ["id", "en"],
      },
    });
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
    console.log(
      "PASS: lost completion response recovered without duplicate assets, native file input cleared, publication succeeds and mobile has no overflow.",
    );
  } finally {
    if (releaseId)
      await payload.update({
        collection: "softwareReleases",
        id: releaseId,
        user: actor,
        data: { lifecycle: "retired" },
      });
    if (productId)
      await payload.delete({ collection: "products", id: productId });
    await payload.delete({ collection: "users", id: user.id });
    await payload.destroy();
  }
});
