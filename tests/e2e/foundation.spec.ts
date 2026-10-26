import { test, expect } from "@playwright/test";
import { randomBytes } from "node:crypto";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
assertIsolatedDatabase();
test("locale routes, redirect and unknown locale", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL("/id");
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.getByText("Contoh fondasi — belum ditinjau")).toBeVisible();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByText("Foundation sample — unreviewed")).toBeVisible();
  expect((await request.get("/fr")).status()).toBe(404);
});
test("empty-database bootstrap is closed and anonymous user APIs are denied", async ({
  page,
  request,
}) => {
  await page.goto("/admin/login");
  await expect(
    page.getByRole("heading", { name: "Operator setup required" }),
  ).toBeVisible();
  const response = await request.get("/api/users");
  expect(response.status()).toBe(403);
  expect(response.headers()["x-robots-tag"]).toContain("noindex");
  const create = await request.post("/api/users", {
    data: {
      email: "intruder@example.invalid",
      password: "not-a-real-password",
    },
  });
  expect(create.status()).toBe(403);
  const first = await request.post("/api/users/first-register", {
    data: {
      email: "intruder@example.invalid",
      password: "not-a-real-password",
      name: "Denied",
    },
  });
  expect(first.status()).toBe(403);
  expect(response.headers()["cache-control"]).toContain("no-store");
});
test("operator-created administrator can sign in and log out", async ({
  page,
  request,
}) => {
  test.setTimeout(120000);
  const { getPayload } = await import("payload");
  const { default: config } = await import("../../src/payload.config");
  const payload = await getPayload({ config });
  const email = `browser-${randomBytes(8).toString("hex")}@example.invalid`;
  let password = randomBytes(24).toString("hex");
  const admin = await payload.create({
    collection: "users",
    context: { bootstrapAdmin: true },
    data: {
      email,
      password,
      name: "Browser test",
      role: "super-admin",
      active: true,
    },
  });
  try {
    expect(
      (
        await request.patch(`/api/users/${admin.id}`, {
          data: { role: "super-admin" },
        })
      ).status(),
    ).toBe(403);
    expect((await request.delete(`/api/users/${admin.id}`)).status()).toBe(403);
    expect(
      (await request.post("/api/users/unlock", { data: { email } })).status(),
    ).toBe(403);
    const token = randomBytes(32).toString("hex");
    await payload.update({
      collection: "users",
      id: admin.id,
      data: {
        resetPasswordToken: token,
        resetPasswordExpiration: new Date(Date.now() + 60000).toISOString(),
      },
    });
    expect(
      (
        await request.post("/api/users/reset-password", {
          data: { token, password: "weakpass" },
        })
      ).status(),
    ).toBe(400);
    password = randomBytes(24).toString("hex");
    expect(
      (
        await request.post("/api/users/reset-password", {
          data: { token, password },
        })
      ).status(),
    ).toBe(200);
    expect(
      (
        await request.post("/api/users/reset-password", {
          data: { token, password },
        })
      ).status(),
    ).toBe(403);
    // The initialized state is covered separately from the empty-database scenario.
    await page.goto("/admin/login");
    // Capture the empty form; never put credentials in a screenshot.
    await page.screenshot({
      path: "documentation/screenshots/phase-03-admin-login.png",
      fullPage: true,
    });
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Login", exact: true }).click();
    await expect(page).toHaveURL(/\/admin$/);
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator("body")).toHaveCSS(
        "font-family",
        /Nunito Sans/,
      );
      await page.screenshot({
        path: `documentation/screenshots/phase-03-admin-${width}.png`,
        fullPage: true,
      });
    }
    await page.goto("/admin/collections/users");
    await expect(
      page.getByRole("heading", { name: "Users", exact: true }),
    ).toBeVisible();
    await page.screenshot({
      path: "documentation/screenshots/phase-03-admin-users.png",
      fullPage: true,
    });
    await page.goto(`/admin/collections/users/${admin.id}`);
    await expect(page.getByRole("textbox", { name: /^Name/ })).toHaveValue(
      "Browser test",
    );
    await page.screenshot({
      path: "documentation/screenshots/phase-03-admin-edit.png",
      fullPage: true,
    });
    const cookie = (await page.context().cookies()).find(
      (item) => item.name === "payload-token",
    );
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.sameSite).toBe("Lax");
    expect(
      (
        await page.request.post("/api/users", {
          headers: { Origin: "https://untrusted.invalid" },
          data: { email: "rejected@example.invalid", password, name: "Denied" },
        })
      ).status(),
    ).toBe(403);
    await payload.update({
      collection: "users",
      id: admin.id,
      data: { active: false },
    });
    expect((await page.request.get("/api/users")).status()).toBe(403);
    await payload.update({
      collection: "users",
      id: admin.id,
      data: { active: true },
    });
    await page.goto("/admin/logout");
    await expect(page).toHaveURL(/\/admin\/login/);
    expect((await page.request.get("/api/users")).status()).toBe(403);
  } finally {
    await payload.delete({ collection: "users", id: admin.id });
    await payload.destroy();
  }
});

test("narrow sample layout and mouse locale navigation", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/id");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Buka menu" }).click();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("mobile keyboard language switching works in both directions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/id");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Galung", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator(".menu-toggle")).toBeFocused();
  for (const [language, locale] of [
    ["English", "en"],
    ["Bahasa Indonesia", "id"],
  ] as const) {
    const toggle = page.locator(".menu-toggle");
    // The locale route may remount the shell; always begin from its native trigger.
    await toggle.focus();
    if ((await toggle.getAttribute("aria-expanded")) === "false")
      await page.keyboard.press("Enter");
    const target = page.getByRole("link", { name: language, exact: true });
    for (let tabs = 0; tabs < 8; tabs++) {
      await page.keyboard.press("Tab");
      if (await target.evaluate((node) => node === document.activeElement))
        break;
    }
    await expect(target).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  }
});
