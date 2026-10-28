import { test, expect } from "@playwright/test";
import { randomBytes } from "node:crypto";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
assertIsolatedDatabase();
test("enabled indexing HTTP metadata, reciprocal sitemap, draft exclusion and sensitive noindex", async ({
  page,
  request,
}) => {
  test.setTimeout(180000);
  expect(process.env.PUBLIC_INDEXING).toBe("true");
  const { getPayload } = await import("payload");
  const { default: config } = await import("../../src/payload.config");
  const payload = await getPayload({ config, key: "seo-indexing-fixture" });
  const user = await payload.create({
    collection: "users",
    context: { bootstrapAdmin: true },
    data: {
      name: "SEO fixture",
      email: `seo-${randomBytes(8).toString("hex")}@example.invalid`,
      password: randomBytes(24).toString("hex"),
      role: "super-admin",
      active: true,
    },
  });
  const actor = { ...user, collection: "users" as const };
  const docs: { collection: "pages" | "posts"; id: number }[] = [];
  try {
    for (const collection of ["pages", "posts"] as const) {
      const doc = await payload.create({
        collection,
        user: actor,
        draft: true,
        locale: "id",
        data: {
          key: collection === "pages" ? "home" : "article",
          title: "ID public SEO fixture",
          slug: "id-seo",
          seo: {
            title: "ID SEO fixture",
            description: "Indonesian synthetic SEO description",
          },
        },
      });
      docs.push({ collection, id: doc.id });
      await payload.update({
        collection,
        id: doc.id,
        user: actor,
        draft: true,
        locale: "en",
        data: {
          title: "EN public SEO fixture",
          slug: "en-seo",
          seo: {
            title: "EN SEO fixture",
            description: "English synthetic SEO description",
          },
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
    const draft = await payload.create({
      collection: "posts",
      user: actor,
      draft: true,
      locale: "id",
      data: {
        key: "draft",
        title: "PRIVATE SEO DRAFT",
        slug: "private-seo-draft",
      },
    });
    docs.push({ collection: "posts", id: draft.id });
    const published = docs.find((doc) => doc.collection === "posts")!;
    await payload.update({
      collection: "posts",
      id: published.id,
      user: actor,
      draft: true,
      locale: "id",
      data: { title: "PRIVATE NEW TITLE" },
    });
    const origin = process.env.NEXT_PUBLIC_SITE_URL!;
    for (const [locale, slug, other] of [
      ["id", "id-seo", "en-seo"],
      ["en", "en-seo", "id-seo"],
    ]) {
      const response = await page.goto(`/${locale}/news/${slug}`);
      expect(response?.status()).toBe(200);
      expect(response?.headers()["x-robots-tag"]).toBeUndefined();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "index, follow",
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${origin}/${locale}/news/${slug}`,
      );
      await expect(
        page.locator(`link[hreflang="${locale === "id" ? "en" : "id"}"]`),
      ).toHaveAttribute(
        "href",
        `${origin}/${locale === "id" ? "en" : "id"}/news/${other}`,
      );
      await expect(page.locator("main")).not.toContainText("PRIVATE NEW TITLE");
    }
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).toContain(`${origin}/id/news/id-seo`);
    expect(xml).toContain(`${origin}/en/news/en-seo`);
    expect(xml).toContain('hreflang="id"');
    expect(xml).toContain('hreflang="en"');
    expect(xml).not.toContain("private-seo-draft");
    expect(xml).not.toContain(`${origin}/admin`);
    expect(xml).not.toContain(`${origin}/preview`);
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain(`Sitemap: ${origin}/sitemap.xml`);
    expect(robots).toContain("Disallow: /admin");
    expect(robots).toContain("Disallow: /preview");
    for (const path of [
      "/admin/login",
      "/api/posts",
      `/preview/posts/${published.id}?locale=id`,
    ])
      expect((await request.get(path)).headers()["x-robots-tag"]).toContain(
        "noindex",
      );
    expect((await request.get("/id/news/private-seo-draft")).status()).toBe(
      404,
    );
    const anonymousDraftRequest = await request.get("/api/posts?draft=true");
    expect(await anonymousDraftRequest.text()).not.toContain(
      "PRIVATE NEW TITLE",
    );
  } finally {
    for (const doc of docs.reverse())
      await payload.delete({ ...doc, user: actor });
    await payload.delete({ collection: "users", id: user.id });
    await payload.destroy();
  }
});
