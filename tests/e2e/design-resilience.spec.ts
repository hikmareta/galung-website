import { test, expect } from "@playwright/test";

for (const locale of ["id", "en"]) {
  for (const width of [375, 639, 640, 768, 1199, 1200, 1440]) {
    test(`long ${locale} copy and text resize at ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      if (width < 1200) await page.locator(".menu-toggle").click();
      await page.evaluate((language) => {
        const long =
          language === "id"
            ? "Contoh judul dan navigasi yang jauh lebih panjang untuk pemeriksaan tata letak"
            : "A much longer sample title and navigation label for layout resilience review";
        document
          .querySelectorAll("h1,h2,h3,.navigation a,.actions a,.card p")
          .forEach((node) => {
            node.textContent = `${long} — ${"Galung".repeat(12)}`;
          });
      }, locale);
      const assertFits = async () => {
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        const clipped = await page
          .locator("h1,h2,h3,.card p,.button,.navigation a")
          .evaluateAll((nodes) =>
            nodes
              .filter((node) => {
                const box = node.getBoundingClientRect();
                return (
                  box.width > 0 &&
                  (box.left < -1 ||
                    box.right > innerWidth + 1 ||
                    node.scrollWidth > node.clientWidth + 1 ||
                    (["hidden", "clip"].includes(
                      getComputedStyle(node).overflowY,
                    ) &&
                      node.scrollHeight > node.clientHeight + 1))
                );
              })
              .map((node) => ({
                tag: node.tagName,
                width: node.clientWidth,
                scrollWidth: node.scrollWidth,
                height: node.clientHeight,
                scrollHeight: node.scrollHeight,
              })),
          );
        expect(clipped).toEqual([]);
        // Font ascenders can extend beyond a heading line box with visible
        // overflow. Check actual clipping ancestors instead of calling that loss.
        expect(
          await page
            .locator(".hero h1,.hero p,.hero .button,.card h3,.card p")
            .evaluateAll((nodes) =>
              nodes
                .filter((node) => {
                  const range = document.createRange();
                  range.selectNodeContents(node);
                  const text = range.getBoundingClientRect();
                  for (
                    let ancestor = node.parentElement;
                    ancestor;
                    ancestor = ancestor.parentElement
                  ) {
                    const style = getComputedStyle(ancestor);
                    if (["hidden", "clip"].includes(style.overflow)) {
                      const clip = ancestor.getBoundingClientRect();
                      if (
                        text.left < clip.left - 1 ||
                        text.right > clip.right + 1 ||
                        text.top < clip.top - 1 ||
                        text.bottom > clip.bottom + 1
                      )
                        return true;
                    }
                  }
                  return false;
                })
                .map((node) => node.tagName),
            ),
        ).toEqual([]);
      };
      await assertFits();
      // A 200% root text resize plus WCAG text-spacing overrides; browser UI zoom
      // additionally changes effective CSS viewport, covered by 320/375px cases.
      await page.addStyleTag({
        content:
          "html{font-size:200%!important}body *{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}",
      });
      await assertFits();
      if (width === 375 || width === 1200)
        await page.screenshot({
          path: `documentation/screenshots/phase-03-stress-${locale}-${width}.png`,
          fullPage: true,
        });
    });
  }
}

test("local fonts, responsive artwork, reduced motion and locale metadata", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["id", "en"]) {
    await page.goto(`/${locale}`);
    await expect(page).toHaveTitle(
      locale === "id"
        ? "Galung — contoh sistem desain"
        : "Galung — design system sample",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCSS("font-family", /Poppins/);
    expect(
      await page.evaluate(() =>
        ["Poppins", "Nunito Sans"].every((name) =>
          Array.from(document.fonts).some(
            (face) =>
              face.family.replaceAll('"', "") === name &&
              face.status === "loaded",
          ),
        ),
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () =>
          document.fonts.check("600 24px Poppins") &&
          document.fonts.check('400 16px "Nunito Sans"'),
      ),
    ).toBe(true);
    await expect(page.locator(".button").first()).toHaveCSS(
      "transition-duration",
      "0s",
    );
    await page.locator(".sample-gallery").scrollIntoViewIfNeeded();
    await expect
      .poll(async () =>
        page
          .locator("main img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                (image as HTMLImageElement).complete &&
                (image as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    for (const image of await page.locator("main img").all())
      expect(
        await image.evaluate((node) => (node as HTMLImageElement).currentSrc),
      ).toContain("/design-samples/");
  }
});
