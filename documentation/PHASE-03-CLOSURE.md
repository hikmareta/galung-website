# Phase 03 remediation and closure — 26 October 2026

**Verdict: PASS for the Phase 03 gate. P03-R1–R6 are CLOSED.** This report
supersedes the historical PARTIAL findings in PHASE-03-REVIEW.md and initial
PHASE-03-EVALUATION.md. No Phase 04 work or deployment is implied.

## Scope and reviewed sources
User authorized complete remediation of Phase 03 findings. Read AGENTS.md, README,
docs 05/08/10, decision register and fresh review; inspected current UI, Payload
configuration/layout, test helpers, bootstrap/integration tests, package scripts,
installed Payload CSS/component APIs and conceptual asset provenance/manifest.
Existing architecture/security/localization docs from the preceding review remain
applicable. No new product phase, CMS collection, installer, pricing or customer
feature was introduced. No dependency versions changed.

## Findings and remedies
| Review finding | Remedy and evidence |
|---|---|
| P03-R1 integration timeout | Replaced blocking spawnSync with bounded async spawn in tests/helpers/run-process.ts. Parent event loop remains available; unchanged 30s bootstrap deadline. Wait for child close before DB cleanup; timeout/signal/missing status still fail. Actual integration run passed bootstrap/refusal, access, lockout and reset regressions. Unit tests verify parent progress, exact status/reason, timeout and missing executable rejection. No production auth weakening. |
| P03-R2 keyboard locale coverage | Restored natural Tab path from skip link to brand/menu, Enter to open, Tab to language and Enter to navigate in both directions. Asserts focus, URL and html lang. Mouse scenario retained with accurate name. |
| P03-R3 reference/admin acceptance | Added pre-existing conceptual hero art with contrast overlay, value bar, responsive image cards and gallery. Admin shares fonts/tokens, provisional mark, light ivory/forest palette and focus styling; existing Payload dark palette/field states retained. Captures cover login, dashboard at three widths, user table and edit form. |
| P03-R4 long text/resize coverage | Added fourteen ID/EN cases at 375/639/640/768/1199/1200/1440. Long nav/CTA/headings/card text includes a 72-character unbroken string; tested again with 200% root text and WCAG text-spacing overrides. Detect viewport overflow and actual clipping ancestors. Adaptive grids fix reproduced 640px text-resize clipping. |
| P03-R5 disconnected spacing | Extracted fonts/color/spacing/radius/container/type variables to tokens.css shared with admin. Public component padding/gaps/margins consume the scale. Typography sizes remain independent from spacing. Header uses shared ButtonLink; Card supports media inside its own height. |
| P03-R6 sample locale/asset debt | ID swatches and title now localized sample copy; EN retains separate sample dictionary. Removed unused Poppins 400 from public. All remaining font faces verified loaded, not merely declared. Production approval is still a later content gate. |

The previous timeout was observed with synchronous child invocation; async
invocation now passes with the same deadline. The exact Windows loader/DB timing
mechanism was not instrumented, so no more specific root cause is asserted.

## Acceptance and phase boundaries
- Phase 03 specimens: tokens, typography, responsive public shell, accessible
  disclosure, buttons/cards, image/value/gallery examples and related admin shell.
- Phase 04 retains content collections/globals, RBAC expansion, media selectors,
  publish/preview controls, block ordering and revalidation. No simulated working
  editorial lifecycle is presented in Phase 03.
- Phase 05 retains complete real pages, CMS navigation, reviewed translations,
  factual/owned assets and production SEO. Current nav anchors remain working
  design sample destinations. No public login or pricing.
- Phase 06 retains direct installer storage/delivery/verification.
- Phase 07 retains full screen-reader/WCAG, performance and operational audits.
  Current focused checks are evidence, not certification or real-user CWV.
- AT-01 locale shell and AT-12 public keyboard portions are verified. Their full
  product criteria and AT-02–11 remain at their documented later gates; this
  closure does not reclassify unimplemented product features as passing tests.

## Verification log
Environment: Windows, documented pinned Node 24.22.1 and pnpm 10.34.9. DB/browser
commands use existing isolated test runner, temporary loopback server and newly
created disposable DBs; development data is not reset.

- pnpm generate:importmap: PASS; generated admin logo/icon imports committed-ready.
- pnpm format:check, lint, typecheck: PASS on changed sources/tests.
- pnpm test: PASS, 8 tests / 0 failed / 0 skipped.
- pnpm test:integration: PASS; operator bootstrap/refusal, anonymous/admin/inactive
  access and lockout, password create/update/reset/replay/expiry regressions.
- pnpm test:database: PASS; migration fresh/down/reapply, pool release/shutdown,
  pg_dump/psql restore. Isolated DB cleanup confirmed.
- pnpm audit --audit-level low: PASS, “No known vulnerabilities found”.
- Intermediate builds passed. Initial expanded browser run: 11 passed/15 failed
  (heading-line-box false positive and required-field label selector). Corrected
  assertions inspect actual clipping/required accessible name. Visual review also
  found and fixed card/media height overlap.
- Next browser run: 24 passed/2 failed. Both failures reproduced actual clipping
  in ID/EN cards at 640px with 200% text (19px content width vs 47px glyph extent).
  Fixed by adaptive min-width grid and removing obsolete mobile card padding.
- Final pnpm build: PASS, exit 0; all five expected route entries produced.
- Final pnpm test:e2e: PASS, 26/26 in 50.5s, no skips; isolated DB removed.
- Final pnpm format:check, lint, typecheck and git diff --check: PASS. Git emitted only CRLF normalization notices.

## Files changed by remediation
- src/styles/tokens.css, globals.css, admin.css: shared brand foundation, adaptive
  grids, resilient wrapping, contrast overlay, public/admin motion/focus rules.
- src/components/ui/{primitives,sample-image}.tsx; website/header.tsx;
  admin/brand.tsx: media cards, responsive art, shared CTA, provisional admin mark.
- src/app/(website)/[locale]/{layout,page}.tsx; lib/i18n/design-copy.ts: localized
  sample title/labels, representative imagery, value bar and gallery.
- src/app/(payload)/layout.tsx, admin/importMap.js, src/payload.config.ts: CSS and
  supported logo/icon registrations only; collection access/schema unchanged.
- tests/helpers/{run-process,process-result}.ts, integration/auth.ts,
  unit/run-process.test.ts: async bounded subprocess verification.
- tests/e2e/{foundation,design-resilience}.spec.ts; existing design-system.spec.ts
  retains six viewport sample/capture cases.
- public/design-samples/*.webp: twelve byte-for-byte derivatives from existing
  references/content-preview/assets/optimized. Sources documented in
  content/generated-visuals.json and original optimized manifest. No reference
  photograph copied. public/fonts/poppins-400-latin.woff2 removed (archived source
  retained); remaining three faces retain OFL notices.
- README, doc 05/08, decision register, changelog and Phase 03 reports updated.

## Visual review and risks
Hero now follows the reference's left copy/right conceptual ensemble composition,
forest overlay, gold CTA, light framing and overlapping value bar. Card and gallery
examples demonstrate image treatment. Poppins remains the explicit approved
replacement for reference serif headings. No pixel-parity claim. Images are
clearly labeled AI concepts, not actual software UI or documentary events.

Admin typography, ivory background and forest actions relate to public styling;
Payload tables/fields remain compact and semantic. Screenshots contain only
synthetic disposable test users, never real credentials or personal data.

No deployment, commit or push performed. Production identity, approved translations,
assets, hosting, CMS content lifecycle and release delivery remain their separate
product/launch gates; they are not unresolved defects in the bounded Phase 03 work.
No blanket statement of security compliance or production readiness is made.

## Final acceptance / evaluation under prompts/90-PHASE-EVALUATION.md
| Phase 03 acceptance | Status | Evidence |
|---|---|---|
| Shared tokens, self-hosted approved typography, primitives | PASS | tokens.css, ui components; loaded font assertions |
| Responsive public header/footer and ID/EN samples | PASS | six sample viewport cases/captures, 320px baseline |
| Keyboard menu, skip and locale round trip | PASS | disclosure and keyboard ID→EN→ID tests |
| Long-copy/200% text/text spacing near breakpoints | PASS | fourteen cases including formerly failing 640px |
| Reference visual examples and related admin design | PASS | inspected public hero/value/media/gallery and admin login/dashboard/table/edit captures |
| Regression quality/security boundaries | PASS for executed scope | 8 unit tests, integration suite, migration/restore, 26 browser cases, audit |
| Real CMS content/publishing/downloads and production SEO | NOT TESTED in Phase 03 | intentionally separate Phase 04–07 product gates |

Open Phase 03 findings: **none known after the executed checks**. Full WCAG conformance, native-browser zoom/screen-reader audit and production CWV are not claimed. The 200% check resizes root text; viewport checks cover narrow CSS widths rather than automating browser chrome zoom.

Visually inspected all six final public captures and admin login, mobile/dashboard, user table and edit form. Confirmed no card overlap or clipped sample content. Desktop has three cards, tablet two, mobile one; adaptive count intentionally protects readability under enlarged text. Admin table/edit captures use a disposable example.invalid account.

Next concrete scope, only after user continuation: Phase 04. Commit-ready summary: shared portable design tokens and typography, public/admin brand alignment, conceptual media specimens, robust responsive grids, restored keyboard/i18n coverage, and bounded asynchronous test subprocesses. No open BLOCKER/HIGH/MEDIUM/LOW defect from P03-R1–R6 remains.

Final provenance check: Get-FileHash SHA256 verified all 12 public conceptual WebP derivatives against the existing optimized manifest. git diff --quiet over package.json, pnpm-lock.yaml, src/access and src/collections returned exit 0: dependency pins, access code and collection schema are unchanged. Final reread of prompts/90-PHASE-EVALUATION.md completed; the scope matrix, findings/remedies, commands, visual/security/i18n limits and next phase are documented above.
