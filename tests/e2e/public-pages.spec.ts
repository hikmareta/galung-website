import { test, expect } from "@playwright/test";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
assertIsolatedDatabase();
test("published bilingual pages, translated detail routes, filters, SEO and draft boundaries", async ({
  page,
  request,
}) => {
  test.setTimeout(300000);
  const { getPayload } = await import("payload");
  const { default: config } = await import("../../src/payload.config");
  const payload = await getPayload({ config, key: "phase05-public-pages" });
  const admin = await payload.create({
    collection: "users",
    context: { bootstrapAdmin: true },
    data: {
      name: "Phase 05 fixture",
      email: "phase05@example.invalid",
      password: "Original-test-password-555!",
      role: "super-admin",
      active: true,
    },
  });
  const actor = { ...admin, collection: "users" as const };
  const created: {
    collection: "pages" | "products" | "posts" | "portfolioProjects";
    id: number;
  }[] = [];
  const category = await payload.create({
    collection: "postCategories",
    locale: "id",
    data: { key: "phase05", label: "ID category sample" },
  });
  await payload.update({
    collection: "postCategories",
    id: category.id,
    locale: "en",
    data: { label: "EN category sample" },
  });
  try {
    for (const [collection, key] of [
      ...[
        "home",
        "about",
        "news",
        "portfolio",
        "contact",
        "privacy",
        "terms",
      ].map((key) => ["pages", key] as const),
      ["products", "galung"],
      ["posts", "article"],
      ["portfolioProjects", "project"],
    ] as const) {
      const doc = await payload.create({
        collection,
        user: actor,
        draft: true,
        locale: "id",
        data: {
          key,
          ...(collection === "posts" ? { categories: [category.id] } : {}),
          title: `ID fixture ${key}`,
          slug: `id-${key}`,
          seo: { description: "ID sample SEO — unreviewed" },
          layout: [
            { blockType: "hero", enabled: true, headline: "Fixture only" },
          ],
        },
      });
      created.push({ collection, id: doc.id });
      await payload.update({
        collection,
        id: doc.id,
        user: actor,
        draft: true,
        locale: "en",
        data: {
          title: `EN fixture ${key}`,
          slug: `en-${key}`,
          seo: { description: "EN sample SEO — unreviewed" },
        },
      });
      await payload.update({
        collection,
        id: doc.id,
        user: actor,
        locale: "id",
        data: { _status: "published", reviewedLocales: ["id", "en"] },
      });
    }
    for (const locale of ["id", "en"])
      for (const path of [
        "",
        "about",
        "software",
        "software/features",
        "portfolio",
        "news",
        "contact",
        "privacy",
        "terms",
        `news/${locale}-article`,
        `portfolio/${locale}-project`,
      ]) {
        const response = await page.goto(`/${locale}${path ? `/${path}` : ""}`);
        expect(response?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("main h1")).toContainText(
          `${locale.toUpperCase()} fixture`,
        );
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${path ? `/${path}` : ""}`,
        );
        await expect(page.locator('link[hreflang="id"]')).toHaveCount(1);
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
          "content",
          /noindex/,
        );
      }
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto("/en/news");
    await page.getByRole("link", { name: "EN category sample" }).click();
    await expect(page.locator("main")).toContainText("EN fixture article");
    await page.goto("/en/news?category=999999");
    await expect(page.locator("main")).not.toContainText("EN fixture article");
    await page.goto("/id/news/id-article");
    await page.getByRole("button", { name: "Buka menu" }).click();
    await page.getByRole("link", { name: "English", exact: true }).click();
    await expect(page).toHaveURL("/en/news/en-article");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: "documentation/screenshots/phase-05-detail-en-375.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/id");
    await page.screenshot({
      path: "documentation/screenshots/phase-05-home-id-1280.png",
      fullPage: true,
    });
    const post = created.find((doc) => doc.collection === "posts")!;
    await payload.update({
      collection: "posts",
      id: post.id,
      user: actor,
      draft: true,
      locale: "id",
      data: { title: "PRIVATE DRAFT" },
    });
    await page.goto("/id/news/id-article");
    await expect(page.locator("main")).not.toContainText("PRIVATE DRAFT");
    expect((await request.get("/id/news/unknown")).status()).toBe(404);
    expect((await request.get("/en/news/id-article")).status()).toBe(404);
    expect((await request.get("/fr/about")).status()).toBe(404);
    expect((await request.get("/id/pricing")).status()).toBe(404);
    expect((await request.get("/api/globals/contactSettings")).status()).toBe(
      403,
    );
    expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
      "id-article",
    );
  } finally {
    for (const doc of created.reverse())
      await payload.delete({ ...doc, user: actor });
    await payload.delete({ collection: "postCategories", id: category.id });
    await payload.delete({ collection: "users", id: admin.id });
    await payload.destroy();
  }
});
