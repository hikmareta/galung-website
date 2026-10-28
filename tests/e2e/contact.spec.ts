import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
assertIsolatedDatabase();
test("ID contact form validates, sends only to local TLS SMTP sink, stays private and enforces retention", async ({
  page,
  request,
}) => {
  test.setTimeout(240000);
  const { getPayload } = await import("payload");
  const { default: config } = await import("../../src/payload.config");
  const { maintainContact } = await import("../../src/services/contact/store");
  const payload = await getPayload({ config, key: "contact-browser" });
  const user = await payload.create({
    collection: "users",
    context: { bootstrapAdmin: true },
    data: {
      name: "Contact browser test",
      email: `contact-${randomBytes(8).toString("hex")}@example.invalid`,
      password: randomBytes(24).toString("hex"),
      role: "super-admin",
      active: true,
    },
  });
  const actor = { ...user, collection: "users" as const };
  let id: number | undefined;
  try {
    const doc = await payload.create({
      collection: "pages",
      user: actor,
      locale: "id",
      draft: true,
      data: { key: "contact", title: "Kontak (fixture)", slug: "contact" },
    });
    id = doc.id;
    await payload.update({
      collection: "pages",
      id,
      user: actor,
      locale: "en",
      draft: true,
      data: { title: "Contact (fixture)", slug: "contact" },
    });
    await payload.update({
      collection: "pages",
      id,
      user: actor,
      locale: "id",
      data: { _status: "published", reviewedLocales: ["id", "en"] },
    });
    await maintainContact(payload);
    await page.setViewportSize({ width: 375, height: 950 });
    await page.goto("/id/contact");
    const submit = page.getByRole("button", {
      name: "Kirim pesan",
      exact: true,
    });
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(page.getByLabel("Nama", { exact: true })).toBeFocused();
    await expect(
      page.getByText("Isi nama, maksimal 120 karakter."),
    ).toBeVisible();
    await page.getByLabel("Nama", { exact: true }).fill("Pengunjung Uji");
    await page
      .getByLabel("Email", { exact: true })
      .fill("visitor@example.invalid");
    await page
      .getByLabel("Pesan", { exact: true })
      .fill("Synthetic contact fixture, not a real enquiry.");
    await page.getByRole("checkbox").check();
    // Human fill-time guard has a three-second minimum; wait by polling the test server clock age.
    await page.waitForTimeout(3100);
    const response = page.waitForResponse(
      (result) =>
        result.url().endsWith("/api/contact") &&
        result.request().method() === "POST",
    );
    await submit.click();
    expect((await response).status()).toBe(200);
    await expect(page.getByRole("status").last()).toContainText(
      "Pesan Anda telah diterima",
    );
    const messages = JSON.parse(
      readFileSync(process.env.SMTP_CAPTURE_FILE!, "utf8"),
    ) as { envelope: string[]; data: string }[];
    expect(messages).toHaveLength(1);
    expect(
      messages[0].envelope.some((line) =>
        /RCPT TO:<admin@galung.id>/i.test(line),
      ),
    ).toBe(true);
    expect(messages[0].data).toContain("visitor@example.invalid");
    expect(
      (await payload.find({ collection: "contactSubmissions" })).totalDocs,
    ).toBe(1);
    expect((await request.get("/api/contactSubmissions")).status()).toBe(403);
    expect((await request.post("/api/contact/retention")).status()).toBe(403);
    expect(
      (
        await request.post("/api/contact", {
          headers: { Origin: "https://evil.invalid" },
          data: {},
        })
      ).status(),
    ).toBe(403);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: "documentation/screenshots/contact-id-375.png",
      fullPage: true,
    });
    await page.getByRole("button", { name: "Buka menu" }).click();
    await page.getByRole("link", { name: "English", exact: true }).click();
    await expect(page).toHaveURL("/en/contact");
    await expect(page.getByRole("status").last()).not.toContainText(
      "Pesan Anda telah diterima",
    );
    await expect(
      page.getByRole("form", { name: "Contact form" }),
    ).toBeVisible();
    const sendEnglish = page.getByRole("button", {
      name: "Send message",
      exact: true,
    });
    await expect(sendEnglish).toBeEnabled();
    await page.getByLabel("Name", { exact: true }).fill("English test visitor");
    await page
      .getByLabel("Email", { exact: true })
      .fill("english@example.invalid");
    await page
      .getByLabel("Message", { exact: true })
      .fill("English synthetic enquiry.");
    await page.getByRole("checkbox").check();
    await page.waitForTimeout(3100);
    await sendEnglish.click();
    await expect(page.getByRole("status").last()).toContainText(
      "accepted for delivery",
    );
    await page.screenshot({
      path: "documentation/screenshots/phase-05-contact-en-375.png",
      fullPage: true,
    });
    expect(
      (
        await payload.find({
          collection: "contactSubmissions",
          where: { locale: { equals: "en" } },
        })
      ).docs[0].privacyRevision,
    ).toBe("en-2026-10-27");
    await page.route(
      "**/api/contact/token*",
      (route) =>
        route.fulfill({
          status: 503,
          contentType: "application/json",
          body: '{"code":"unavailable"}',
        }),
      { times: 1 },
    );
    await page.goto("/id/contact");
    await expect(
      page.getByRole("alert").filter({ hasText: "Formulir gagal disiapkan" }),
    ).toContainText("Formulir gagal disiapkan");
    await expect(submit).toBeDisabled();
    await page.screenshot({
      path: "documentation/screenshots/phase-05-contact-token-error-375.png",
      fullPage: true,
    });
    await page.getByRole("button", { name: "Coba lagi", exact: true }).click();
    await expect(submit).toBeEnabled();
    await page
      .getByLabel("Nama", { exact: true })
      .fill("Lost response visitor");
    await page
      .getByLabel("Email", { exact: true })
      .fill("lost-response@example.invalid");
    await page
      .getByLabel("Pesan", { exact: true })
      .fill("Synthetic response-loss check.");
    await page.getByRole("checkbox").check();
    await page.waitForTimeout(3100);
    await page.route(
      "**/api/contact",
      async (route) => {
        const accepted = await route.fetch();
        expect(accepted.status()).toBe(200);
        await route.abort();
      },
      { times: 1 },
    );
    await submit.click();
    await expect(page.getByRole("status").last()).toContainText(
      "Status pengiriman belum dapat dipastikan",
    );
    const checkStatus = page.getByRole("button", {
      name: "Periksa status pengiriman",
    });
    await expect(checkStatus).toBeEnabled();
    const captureCount = () =>
      (
        JSON.parse(
          readFileSync(process.env.SMTP_CAPTURE_FILE!, "utf8"),
        ) as unknown[]
      ).length;
    expect(captureCount()).toBe(3);
    await page.waitForTimeout(3100);
    await checkStatus.click();
    await expect(page.getByRole("status").last()).toContainText(
      "Pesan Anda telah diterima",
    );
    expect(captureCount()).toBe(3);
    await payload.db.pool.query(
      "UPDATE payload_kv SET data = $1::jsonb WHERE key = 'contact-retention'",
      [JSON.stringify({ completedAt: Date.now() - 3 * 3600000 })],
    );
    await page.goto("/id/contact");
    await expect(submit).toBeDisabled();
    await expect(
      page.getByText("Formulir belum tersedia.", { exact: false }),
    ).toBeVisible();
    expect(
      (
        await request.post("/api/contact/retention", {
          headers: {
            Authorization: `Bearer ${process.env.CONTACT_MAINTENANCE_SECRET}`,
          },
        })
      ).status(),
    ).toBe(200);
  } finally {
    await payload.delete({ collection: "contactSubmissions", where: {} });
    await payload.db.pool.query(
      "DELETE FROM payload_kv WHERE key LIKE 'contact:%' OR key = 'contact-retention'",
    );
    if (id) await payload.delete({ collection: "pages", id, user: actor });
    await payload.delete({ collection: "users", id: user.id });
    await payload.destroy();
  }
});
