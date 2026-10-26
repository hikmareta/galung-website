import { test, expect } from "@playwright/test";
for (const width of [375, 768, 1440]) {
  for (const locale of ["id", "en"]) {
    test(`design sample ${locale} at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(
        page.locator('a[href*="pricing"],a[href*="login"]'),
      ).toHaveCount(0);
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link")).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator("main")).toBeFocused();
      if (width < 1200) {
        const button = page.locator(".menu-toggle");
        await button.focus();
        await page.keyboard.press("Enter");
        await expect(button).toHaveAttribute("aria-expanded", "true");
        await page.screenshot({
          path: `documentation/screenshots/phase-03-menu-${locale}-${width}.png`,
          fullPage: true,
        });
        await page.keyboard.press("Tab");
        await page.keyboard.press("Escape");
        await expect(button).toBeFocused();
        await expect(button).toHaveAttribute("aria-expanded", "false");
        await expect(
          page.getByRole("navigation", {
            name: locale === "id" ? "Menu utama" : "Main menu",
          }),
        ).toBeHidden();
      }
      await page.screenshot({
        path: `documentation/screenshots/phase-03-${locale}-${width}.png`,
        fullPage: true,
      });
    });
  }
}
