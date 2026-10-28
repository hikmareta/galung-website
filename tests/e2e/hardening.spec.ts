import { test, expect } from "@playwright/test";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { publishedHomeFixture } from "../helpers/public-fixture";

publishedHomeFixture();
const require = createRequire(import.meta.url);

for (const locale of ["id", "en"]) {
  test(`Phase 07 ${locale}: accessibility, security headers and resource baseline`, async ({
    page,
  }, testInfo) => {
    await mkdir(testInfo.outputDir, { recursive: true });
    await page.setViewportSize({ width: 375, height: 900 });
    await page.addInitScript(() => {
      const baseline = { lcp: 0, cls: 0 };
      Object.assign(window, { qualityBaseline: baseline });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) baseline.lcp = entry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & {
            hadRecentInput: boolean;
            value: number;
          };
          if (!shift.hadRecentInput) baseline.cls += shift.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    const response = await page.goto(`/${locale}`);
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response?.headers()["x-frame-options"]).toBe("DENY");
    await page.evaluate(() => document.fonts.ready);
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    for (const expanded of [false, true]) {
      if (expanded) await page.locator(".menu-toggle").click();
      const audit = await page.evaluate(async () => {
        const axe = (
          window as unknown as {
            axe: {
              run: (options: unknown) => Promise<{
                violations: { id: string; impact: string; nodes: unknown[] }[];
                incomplete: unknown[];
              }>;
            };
          }
        ).axe;
        return axe.run({
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
          },
        });
      });
      const name = `axe-${expanded ? "open" : "closed"}`;
      const auditPath = testInfo.outputPath(`${name}.json`);
      await writeFile(auditPath, JSON.stringify(audit, null, 2));
      await testInfo.attach(name, {
        path: auditPath,
        contentType: "application/json",
      });
      expect(audit.violations).toEqual([]);
    }
    await expect(page.locator(".navigation > .button")).toHaveAttribute(
      "href",
      `/${locale}/download`,
    );
    const metrics = await page.evaluate(() => ({
      localPaintAndShift: (
        window as unknown as { qualityBaseline: { lcp: number; cls: number } }
      ).qualityBaseline,
      navigation: performance
        .getEntriesByType("navigation")
        .map((entry) => entry.toJSON()),
      resources: performance
        .getEntriesByType("resource")
        .map((entry) => entry.toJSON()),
    }));
    const metricsPath = testInfo.outputPath("local-resource-baseline.json");
    await writeFile(metricsPath, JSON.stringify(metrics, null, 2));
    await testInfo.attach("local-resource-baseline", {
      path: metricsPath,
      contentType: "application/json",
    });
    // Local fixture timings are evidence only, never a real-user p75 CWV claim.
    await expect(page.locator("h1")).toBeVisible();
  });
}
