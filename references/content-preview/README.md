# Local content/design preview

This folder is a design review artifact, not the Next/Payload production app.

- Content source: `../../content/main-copy.id.json`. All visible draft copy, alt text, labels and page metadata resolve from this file; structure, asset URLs and rights-source links remain in the template. ID only; do not relabel this draft as a reviewed English translation.
- Template/layout: `template.html`, `styles.css`; `build-preview.ps1` escapes content and fails safely when required tokens are missing.
- Rebuild the page: `pwsh -File references/content-preview/build-preview.ps1` from the project root.
- View: run `node references/content-preview/serve-preview.cjs` and visit `http://127.0.0.1:4174/`. The server only binds loopback; stop its terminal with Ctrl+C when finished. No authentication, CMS, publishing or installer functionality exists here.
- Responsive QA: `/responsive-check.html?w=320`, with supported widths 280, 320, 390 and 768. This uses a same-origin frame to measure actual CSS widths independently of browser zoom.
- Regression checks: `node --test references/content-preview/tests/preview-server.test.cjs` and `pwsh -File references/content-preview/tests/build-preview.tests.ps1`. No third-party Node test dependency is needed.
- Regenerate encoded WebP assets: run `references/content-preview/build-assets.py` with Python and Pillow. This only resizes/encodes derivatives, preserving composition and original PNGs. `assets/optimized/manifest.json` records widths, byte sizes, hashes, quality and encoder. The current run used the bundled desktop Python/Pillow environment.
- Fonts: four official Latin WOFF2 files in `assets/fonts/` provide Poppins 400/600/700 and variable Nunito Sans 400–700. `fonts.css` and the official source response record the subset/ranges; the included OFL notices apply. Original TTF/source responses remain archived and are not served by the preview allowlist.
- Original AI PNGs, Commons JPEGs and earlier screenshots are retained for provenance, not fetched by the current layout. AI scenes remain conceptual and never establish actual product features/events.

Production migration still requires approved Next/React/Payload/Postgres versions, strict TS, localized CMS fields/blocks and access/lifecycle/download tests. Copy extraction here closes draft hardcoding; it does not implement the CMS.

