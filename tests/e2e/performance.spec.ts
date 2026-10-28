import { test, expect, chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { publishedHomeFixture } from "../helpers/public-fixture";
import { runProcess } from "../helpers/run-process";

publishedHomeFixture();
const require = createRequire(import.meta.url);
for (const locale of ["id", "en"]) {
  test(`Phase 07 ${locale}: Lighthouse mobile lab baseline`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(300000);
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`;
    await page.goto(url);
    const report = testInfo.outputPath("lighthouse.json");
    const probe = createServer();
    const port = await new Promise<number>((resolve, reject) => {
      probe.once("error", reject);
      probe.listen(0, "127.0.0.1", () => {
        const address = probe.address();
        if (!address || typeof address === "string")
          return reject(new Error("Missing port"));
        probe.close(() => resolve(address.port));
      });
    });
    // Reuse Playwright's supported browser launcher; Lighthouse's Windows
    // launcher can select a different Chrome executable than the tested browser.
    const browser = await chromium.launch({
      args: [`--remote-debugging-port=${port}`],
    });
    try {
      const result = await runProcess(
        process.execPath,
        [
          require.resolve("lighthouse/cli/index.js"),
          url,
          "--quiet",
          "--only-categories=performance,accessibility,best-practices",
          `--port=${port}`,
          "--hostname=127.0.0.1",
          "--output=json",
          `--output-path=${report}`,
        ],
        {
          env: { ...process.env, CHROME_PATH: chromium.executablePath() },
          timeout: 240000,
        },
      );
      expect(result.error, result.stderr).toBeUndefined();
      expect(result.status, result.stderr).toBe(0);
      const body = await readFile(report, "utf8");
      await testInfo.attach("lighthouse-mobile-lab", {
        body,
        contentType: "application/json",
      });
      const audit = JSON.parse(body) as {
        runtimeError?: unknown;
        audits: Record<string, { numericValue?: number }>;
      };
      expect(audit.runtimeError).toBeUndefined();
      expect(
        audit.audits["largest-contentful-paint"].numericValue,
      ).toBeGreaterThan(0);
      // Report the measured baseline. Real-user p75/INP require field measurements.
    } finally {
      await browser.close();
    }
  });
}
