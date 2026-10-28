import { test } from "@playwright/test";
import { randomBytes } from "node:crypto";
// Historical design tests now exercise published CMS fixtures instead of public demo copy.
export function publishedHomeFixture() {
  let cleanup: (() => Promise<void>) | undefined;
  test.beforeEach(async ({ request }, testInfo) => {
    void request;
    if (/empty-database|operator-created administrator/.test(testInfo.title))
      return;
    testInfo.setTimeout(180000);
    const { getPayload } = await import("payload");
    const { default: config } = await import("../../src/payload.config");
    const payload = await getPayload({
      config,
      key: `public-fixture-${randomBytes(8).toString("hex")}`,
    });
    const admin = await payload.create({
      collection: "users",
      context: { bootstrapAdmin: true },
      data: {
        name: "Public fixture owner",
        email: `${randomBytes(8).toString("hex")}@example.invalid`,
        password: randomBytes(24).toString("hex"),
        active: true,
        role: "super-admin",
      },
    });
    const actor = { ...admin, collection: "users" as const };
    const home = await payload.create({
      collection: "pages",
      user: actor,
      draft: true,
      locale: "id",
      data: {
        key: "home",
        slug: "home",
        title: "ID published fixture",
        layout: [
          {
            blockType: "hero",
            enabled: true,
            headline: "ID fixture",
            body: "Sample content only",
          },
          {
            blockType: "featureGrid",
            enabled: true,
            headline: "Sample features",
            items: [{ title: "Fixture title", body: "Fixture body" }],
          },
        ],
      },
    });
    await payload.update({
      collection: "pages",
      id: home.id,
      user: actor,
      locale: "en",
      draft: true,
      data: {
        title: "EN published fixture",
        slug: "home",
        layout: home.layout!.map((block) => ({
          ...block,
          headline: "EN fixture",
          body: "Sample only",
          items: block.items?.map((item) => ({
            ...item,
            title: "EN sample",
            body: "EN sample body",
          })),
        })),
      },
    });
    await payload.update({
      collection: "pages",
      id: home.id,
      user: actor,
      locale: "id",
      data: { _status: "published", reviewedLocales: ["id", "en"] },
    });
    cleanup = async () => {
      await payload.delete({ collection: "pages", id: home.id, user: actor });
      await payload.delete({ collection: "users", id: admin.id });
      await payload.destroy();
    };
  });
  test.afterEach(async () => {
    await cleanup?.();
    cleanup = undefined;
  });
}
