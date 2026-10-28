import { test, expect } from "@playwright/test";
import { randomBytes, createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
// Original synthetic 320x180 colour-grid fixture; no production asset rights involved.
const pixel = readFileSync(
  new URL("../fixtures/editorial-image.png", import.meta.url),
);
test.use({ actionTimeout: 15000 });
for (const width of [375, 1280]) {
  test(`editor and publisher complete bilingual image/order/publish flow at ${width}`, async ({
    page,
    request,
    browser,
  }) => {
    test.setTimeout(180000);
    await page.setViewportSize({ width, height: 1000 });
    await page.addLocatorHandler(
      page.getByRole("dialog", { name: "document-locked", exact: true }),
      async (dialog) => {
        await dialog.getByRole("button", { name: /^Take over$/i }).click();
      },
    );
    const { getPayload } = await import("payload");
    const { default: config } = await import("../../src/payload.config");
    const payload = await getPayload({
      config,
      key: `phase04-browser-${width}`,
    });
    const password = randomBytes(24).toString("hex");
    const users = [];
    for (const role of ["super-admin", "editor", "publisher"] as const)
      users.push(
        await payload.create({
          collection: "users",
          context: { bootstrapAdmin: true },
          data: {
            email: `cms-${width}-${role}@example.invalid`,
            password,
            name: role,
            role,
            active: true,
          },
        }),
      );
    const [admin, editor, publisher] = users;
    const actor = { ...admin, collection: "users" as const };
    const doc = await payload.create({
      collection: "pages",
      user: actor,
      draft: true,
      locale: "id",
      data: {
        key: "home",
        slug: "home",
        title: "ID fixture",
        layout: [
          { blockType: "hero", headline: "ID hero fixture" },
          { blockType: "featureGrid", headline: "ID features fixture" },
        ],
      },
    });
    await payload.update({
      collection: "pages",
      id: doc.id,
      user: actor,
      locale: "en",
      draft: true,
      data: {
        title: "EN fixture",
        slug: "home",
        layout: doc.layout!.map((block, i) => ({
          ...block,
          headline: `EN block ${i}`,
        })),
      },
    });
    const origin = process.env.NEXT_PUBLIC_SITE_URL!;
    const headers = { Origin: origin };
    let mediaId: number | undefined;
    const anonymous = await browser.newContext({
      baseURL: origin,
      viewport: { width, height: 1000 },
    });
    const publicPage = await anonymous.newPage();
    async function login(email: string) {
      await page.bringToFront();
      await page.context().clearCookies();
      await page.goto("/admin/login");
      await page.getByLabel("Email").fill(email);
      await page.getByLabel("Password", { exact: true }).fill(password);
      await page.getByRole("button", { name: "Login", exact: true }).click();
      await expect(page).toHaveURL(/\/admin$/);
    }
    async function saveDraft(locale: "id" | "en", title: string) {
      await page
        .getByRole("button", { name: "Save Draft", exact: false })
        .click();
      await expect
        .poll(
          async () =>
            (
              await payload.findByID({
                collection: "pages",
                id: doc.id,
                locale,
                draft: true,
              })
            ).title,
        )
        .toBe(title);
      await expect(page.locator("#field-title")).toBeEnabled();
    }
    try {
      expect(
        (await request.get(`/preview/pages/${doc.id}?locale=id`)).status(),
      ).toBe(404);
      for (const locale of ["id", "en"]) await request.get(`/${locale}`); // Warm the empty published-content cache.
      await login(editor.email);
      await page.goto("/admin/collections/media/create?locale=id");
      const filename = `cms-${width}-${randomBytes(4).toString("hex")}.png`;
      await page.locator("input[type=file]").setInputFiles({
        name: filename,
        mimeType: "image/png",
        buffer: pixel,
      });
      await page.locator("#field-alt").fill("ID image sample");
      await page
        .locator("#field-attribution")
        .fill("Original synthetic browser fixture");
      await page.getByRole("button", { name: "Save", exact: true }).click();
      await expect(page).toHaveURL(/\/admin\/collections\/media\/\d+/, {
        timeout: 15000,
      });
      mediaId = Number(new URL(page.url()).pathname.split("/").at(-1));
      console.log(`CMS ${width}: native media created`);
      await page.goto(`/admin/collections/media/${mediaId}?locale=en`);
      await page.locator("#field-alt").fill("EN image sample");
      await page.getByRole("button", { name: "Save", exact: true }).click();
      const privateMedia = await payload.findByID({
        collection: "media",
        id: mediaId,
      });
      expect([403, 404]).toContain(
        (await request.get(privateMedia.url!)).status(),
      );
      for (const locale of ["id", "en"] as const) {
        await page.goto(`/admin/collections/pages/${doc.id}?locale=${locale}`);
        await page
          .locator("#field-title")
          .fill(`Changed ${locale.toUpperCase()} sample`);
        await page
          .getByLabel("Headline", { exact: false })
          .first()
          .fill(`${locale.toUpperCase()} edited headline`);
        if (locale === "id") {
          const up = page.getByRole("button", {
            name: "Move section 2 up",
            exact: true,
          });
          await up.scrollIntoViewIfNeeded();
          await up.focus();
          await expect(up).toBeFocused();
          await page.keyboard.press("Enter");
          await expect(
            page.locator(".cms-section-order").first(),
          ).toContainText("feature");
          await expect(
            page.getByRole("button", {
              name: "Move section 1 down",
              exact: true,
            }),
          ).toBeFocused();
        }
        // Select the uploaded image using the native image picker, not a Local API fixture.
        await page
          .locator(".blocks-field")
          .getByRole("button", { name: "Choose from existing", exact: true })
          .first()
          .click();
        await page.getByText(filename, { exact: true }).last().click();
        await expect(page.locator(".drawer--is-open")).toHaveCount(0);
        await saveDraft(locale, `Changed ${locale.toUpperCase()} sample`);
        console.log(
          `CMS ${width}: ${locale} image selected and ordered draft saved`,
        );
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await page.screenshot({
          path: `documentation/screenshots/phase-05-regression-editor-${locale}-${width}.png`,
          fullPage: true,
        });
        await page.goto(`/preview/pages/${doc.id}?locale=${locale}`);
        await expect(
          page.getByRole("img", {
            name: `${locale.toUpperCase()} image sample`,
          }),
        ).toBeVisible();
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(
          `Changed ${locale.toUpperCase()} sample`,
        );
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await page.screenshot({
          path: `documentation/screenshots/phase-05-regression-preview-${locale}-${width}.png`,
          fullPage: true,
        });
      }
      expect(
        (
          await page.request.patch(`/api/pages/${doc.id}?locale=id`, {
            headers,
            data: { _status: "published", reviewedLocales: ["id", "en"] },
          })
        ).status(),
      ).toBe(403);
      if (width === 375) {
        const oversized = await page.request.post("/api/media", {
          headers,
          multipart: {
            _payload: JSON.stringify({
              alt: "Oversized fixture",
              attribution: "Synthetic fixture",
            }),
            file: {
              name: "oversized.png",
              mimeType: "image/png",
              buffer: Buffer.concat([pixel, Buffer.alloc(8 * 1024 * 1024)]),
            },
          },
        });
        expect(oversized.status()).toBe(413);
      }
      const editorState = await page.context().storageState();
      for (const locale of ["id", "en"]) {
        await publicPage.goto(`/${locale}`);
        await expect(
          publicPage.getByRole("heading", { level: 1 }),
        ).not.toHaveText(`Changed ${locale.toUpperCase()} sample`);
      }
      await login(publisher.email);
      expect(
        (
          await page.request.patch(`/api/pages/${doc.id}?locale=id`, {
            headers,
            data: { _status: "published", reviewedLocales: ["id", "en"] },
          })
        ).status(),
      ).toBe(400);
      await page.goto(`/admin/collections/media/${mediaId}?locale=en`);
      // Hydration can replace the native checkbox before Payload registers its dirty state.
      await expect(async () => {
        if (
          (await payload.findByID({ collection: "media", id: mediaId! }))
            .approved
        )
          return;
        await page
          .getByRole("checkbox", { name: "Approved", exact: false })
          .check();
        await page
          .getByRole("button", { name: "Save", exact: true })
          .click({ timeout: 2000 });
      }).toPass({ timeout: 15000 });
      await expect
        .poll(
          async () =>
            (await payload.findByID({ collection: "media", id: mediaId! }))
              .approved,
        )
        .toBe(true);
      console.log(`CMS ${width}: publisher approved media`);
      // The HTTP denied-file regression must preserve the original and directory.
      const media = await payload.findByID({
        collection: "media",
        id: mediaId,
      });
      const mediaDir = path.resolve("media", process.env.GALUNG_TEST_DATABASE!);
      const original = path.resolve(mediaDir, media.filename!);
      const digest = createHash("sha256")
        .update(readFileSync(original))
        .digest("hex");
      const names = readdirSync(mediaDir).sort();
      const deniedContext = await browser.newContext({
        baseURL: origin,
        storageState: editorState,
      });
      const denied = await deniedContext.request.patch(
        `/api/media/${mediaId}`,
        {
          headers,
          multipart: {
            _payload: JSON.stringify({ alt: "Denied change" }),
            file: {
              name: "unauthorized-replacement.png",
              mimeType: "image/png",
              buffer: pixel,
            },
          },
        },
      );
      expect(denied.status()).toBe(403);
      expect(
        createHash("sha256").update(readFileSync(original)).digest("hex"),
      ).toBe(digest);
      expect(readdirSync(mediaDir).sort()).toEqual(names);
      await deniedContext.close();
      await page.goto(`/admin/collections/pages/${doc.id}?locale=en`);
      const review = page.locator(
        "#field-reviewedLocales input[role=combobox]",
      );
      await review.fill("id");
      await page.keyboard.press("Enter");
      await review.fill("en");
      await page.keyboard.press("Enter");
      await page.keyboard.press("Escape");
      await page
        .getByRole("button", { name: /^Publish/ })
        .first()
        .click();
      await expect
        .poll(
          async () =>
            (
              await payload.findByID({
                collection: "pages",
                id: doc.id,
                draft: false,
              })
            )._status,
          { timeout: 30000 },
        )
        .toBe("published");
      for (const locale of ["id", "en"]) {
        await publicPage.goto(`/${locale}`);
        await expect(publicPage.getByRole("heading", { level: 1 })).toHaveText(
          `Changed ${locale.toUpperCase()} sample`,
        );
        await expect(
          publicPage.locator("[data-block]").first(),
        ).toHaveAttribute("data-block", "featureGrid");
        const image = publicPage.getByRole("img", {
          name: `${locale.toUpperCase()} image sample`,
        });
        await expect(image).toBeVisible();
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(
            () =>
              image.evaluate(
                (element) => (element as HTMLImageElement).naturalWidth,
              ),
            { timeout: 30000 },
          )
          .toBe(320);
        expect(
          (await request.get((await image.getAttribute("src"))!)).status(),
        ).toBe(200);
        await publicPage.screenshot({
          path: `documentation/screenshots/phase-05-regression-public-${locale}-${width}.png`,
          fullPage: true,
        });
      }
      console.log(
        `CMS ${width}: anonymous bilingual images visible after UI publication`,
      );
      // Warmed cache must retain published EN during draft and change immediately after publish.
      await page.locator("#field-title").fill("Revised EN sample");
      await saveDraft("en", "Revised EN sample");
      await publicPage.goto("/en");
      await expect(publicPage.getByRole("heading", { level: 1 })).toHaveText(
        "Changed EN sample",
      );
      await page
        .getByRole("button", { name: /^Publish/ })
        .first()
        .click();
      await expect
        .poll(async () => (await request.get("/en")).text(), { timeout: 30000 })
        .toContain("Revised EN sample");
      await publicPage.goto("/id");
      await expect(publicPage.getByRole("heading", { level: 1 })).toHaveText(
        "Changed ID sample",
      );
    } catch (error) {
      console.error(`CMS ${width}: failed step`, error);
      throw error;
    } finally {
      await anonymous.close();
      // HTTP cleanup invalidates the same cache used by subsequent browser tests.
      const cleanupLogin = await fetch(`${origin}/api/users/login`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ email: admin.email, password }),
        signal: AbortSignal.timeout(15000),
      });
      const credentials = (await cleanupLogin.json()) as { token: string };
      expect(cleanupLogin.status).toBe(200);
      const cleanup = await fetch(
        `${origin}/api/pages/${doc.id}?overrideLock=true`,
        {
          method: "DELETE",
          headers: { ...headers, Authorization: `JWT ${credentials.token}` },
          signal: AbortSignal.timeout(15000),
        },
      );
      expect(cleanup.status).toBe(200);
      if (mediaId) await payload.delete({ collection: "media", id: mediaId });
      for (const user of users)
        await payload.delete({ collection: "users", id: user.id });
      await payload.destroy();
    }
  });
}
