import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
assertIsolatedDatabase();
test("published ID/EN CMS controls select image side and grid columns with mobile reflow", async ({
  page,
}) => {
  test.setTimeout(180000);
  const { getPayload } = await import("payload");
  const { default: config } = await import("../../src/payload.config");
  const payload = await getPayload({
    config,
    key: "phase05-layout-regression",
  });
  const admin = await payload.create({
    collection: "users",
    context: { bootstrapAdmin: true },
    data: {
      name: "Layout fixture",
      email: `layout-${randomBytes(8).toString("hex")}@example.invalid`,
      password: randomBytes(24).toString("hex"),
      role: "super-admin",
      active: true,
    },
  });
  const actor = { ...admin, collection: "users" as const };
  let pageId: number | undefined;
  let mediaId: number | undefined;
  try {
    const bytes = readFileSync(
      new URL("../fixtures/editorial-image.png", import.meta.url),
    );
    const media = await payload.create({
      collection: "media",
      user: actor,
      locale: "id",
      file: {
        data: bytes,
        name: `layout-${randomBytes(6).toString("hex")}.png`,
        mimetype: "image/png",
        size: bytes.length,
      },
      data: {
        alt: "ID synthetic layout fixture",
        attribution: "Original synthetic colour-grid test fixture",
      },
    });
    mediaId = media.id;
    await payload.update({
      collection: "media",
      id: media.id,
      user: actor,
      locale: "en",
      data: { alt: "EN synthetic layout fixture" },
    });
    await payload.update({
      collection: "media",
      id: media.id,
      user: actor,
      data: { approved: true },
    });
    const doc = await payload.create({
      collection: "pages",
      user: actor,
      locale: "id",
      draft: true,
      data: {
        key: "about",
        title: "ID layout fixture",
        slug: "about",
        layout: [
          {
            blockType: "imageText",
            enabled: true,
            headline: "Left image fixture",
            body: "Synthetic content",
            media: media.id,
            imagePosition: "left",
          },
          {
            blockType: "imageText",
            enabled: true,
            headline: "Right image fixture",
            body: "Synthetic content",
            media: media.id,
            imagePosition: "right",
          },
          ...(["2", "3"] as const).map((columns) => ({
            blockType: "featureGrid" as const,
            enabled: true,
            headline: `${columns} column fixture`,
            columns,
            items: Array.from({ length: 6 }, (_, i) => ({
              title: `Fixture ${i + 1}`,
              body: "Synthetic body",
            })),
          })),
        ],
      },
    });
    pageId = doc.id;
    await payload.update({
      collection: "pages",
      id: doc.id,
      user: actor,
      locale: "en",
      draft: true,
      data: {
        title: "EN layout fixture",
        slug: "about",
        layout: doc.layout!.map((block) => ({
          ...block,
          headline: `EN ${block.headline}`,
          body: "English synthetic body",
          media: media.id,
          items: block.items?.map((item) => ({
            ...item,
            title: `EN ${item.title}`,
            body: "English synthetic item",
          })),
        })),
      },
    });
    await payload.update({
      collection: "pages",
      id: doc.id,
      user: actor,
      locale: "id",
      data: { _status: "published", reviewedLocales: ["id", "en"] },
    });
    for (const locale of ["id", "en"]) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`/${locale}/about`);
      for (const columns of [2, 3]) {
        const grid = page.locator(`[data-columns="${columns}"] .cms-items`);
        expect(
          await grid.evaluate(
            (node) =>
              getComputedStyle(node).gridTemplateColumns.split(/\s+/).length,
          ),
        ).toBe(columns);
      }
      for (const side of ["left", "right"]) {
        const block = page.locator(`[data-image-position="${side}"]`);
        const photo = await block
          .locator(".cms-image-text__media")
          .boundingBox();
        const text = await block.locator(".cms-image-text__copy").boundingBox();
        expect(
          photo &&
            text &&
            (side === "left" ? photo.x < text.x : photo.x > text.x),
        ).toBe(true);
      }
      await page.screenshot({
        path: `documentation/screenshots/phase-05-layout-${locale}-1440.png`,
        fullPage: true,
      });
      await page.setViewportSize({ width: 375, height: 1000 });
      for (const columns of [2, 3])
        expect(
          await page
            .locator(`[data-columns="${columns}"] .cms-items`)
            .evaluate(
              (node) =>
                getComputedStyle(node).gridTemplateColumns.split(/\s+/).length,
            ),
        ).toBe(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `documentation/screenshots/phase-05-layout-${locale}-375.png`,
        fullPage: true,
      });
    }
  } finally {
    if (pageId)
      await payload.delete({ collection: "pages", id: pageId, user: actor });
    if (mediaId)
      await payload.delete({ collection: "media", id: mediaId, user: actor });
    await payload.delete({ collection: "users", id: admin.id });
    await payload.destroy();
  }
});
