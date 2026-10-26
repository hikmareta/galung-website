# Phase 04 remediation and evaluation — 26 October 2026

**Verdict: PASS for the local Phase 04 gate. P04-R1–R5 are closed; no known BLOCKER/HIGH or unresolved current-phase remediation remains in the inspected/tested scope.** This report executes `prompts/90-PHASE-EVALUATION.md` after the user-authorized remediation and supersedes the historical PARTIAL review. No Phase 05 work, deployment, commit or push is implied. This is not a production-readiness or full WCAG/security certification.

## Sources, scope and environment

Reviewed `AGENTS.md`, `README.md`, numbered requirements 01–10, `DECISIONS-AND-OPEN-QUESTIONS.md`, Phase 02/03 foundation/closure evidence, Phase 04 CMS/evaluation/fresh review, the phase evaluation prompt, actual tracked and untracked implementation, installed Payload upload/locale/form behavior, migrations/configuration and tests. Existing uncommitted Phase 03 work was preserved. This mixed working tree has no committed Phase 04 boundary, so the file inventory describes modules rather than pretending every current diff belongs to this remediation.

Exact numbered sources under `documentation/`: `01-PRODUCT-REQUIREMENTS.md`, `02-TECHNICAL-ARCHITECTURE.md`, `03-SITEMAP-AND-ROUTING.md`, `04-CMS-CONTENT-MODEL.md`, `05-UI-UX-DESIGN-SYSTEM.md`, `06-ADMIN-REQUIREMENTS.md`, `07-SECURITY-QUALITY-TESTING.md`, `08-DEVELOPMENT-ROADMAP.md`, `09-DEPLOYMENT-OPERATIONS.md`, `10-ACCEPTANCE-CRITERIA.md`. Related phase sources: `PHASE-02-FOUNDATION.md`, `PHASE-02-CLOSURE.md`, `PHASE-03-CLOSURE.md`, `PHASE-04-CMS.md`, `PHASE-04-EVALUATION.md`, `PHASE-04-REVIEW.md`; evaluation instructions: `prompts/90-PHASE-EVALUATION.md`.

Local Windows, Node 24.22.1, pnpm 10.34.9, pinned Next 16.4.3 / Payload 3.92.0 / React 19.2.6 and PostgreSQL. Test fixtures use randomly named disposable databases and checked, separate media directories; no production system is involved. Working development DB was backed up before applying the two closure migrations; it contained zero media records. Four migrations are now recorded there, with no audit rows requiring historical backfill.

Post-run read-only verification returned `disposable_databases_remaining: 0` for the test database prefix. No working database or production asset was deleted by test cleanup.

Scope: close P04-R1–R5, complete the doc 04 schema contract, retain the existing product boundaries, exercise actual editor/publisher workflows and record remaining later-phase work honestly. Schema mapping and current editorial instructions: [PHASE-04-SCHEMA-MAP.md](PHASE-04-SCHEMA-MAP.md).

## Acceptance matrix

| Requirement | Result | Evidence / boundary |
|---|---|---|
| Payload/Postgres, strict TS, pinned compatible stack | PASS | Existing adapter/architecture retained; matching Lexical 3.92.0 added and lockfile updated. No additional ORM. |
| Required collections / five globals / specialized 13-block registry | PASS | `Content.ts`, `OperationalModels.ts`, `globals/editorial.ts`, `blocks/registry.ts`, generated types and migrations; schema map covers every doc 04 collection/global. Operational models remain private/inactive. |
| RBAC and anonymous draft/version isolation | PASS | Full integration: anonymous and inactive access, role escalation, editor publication and published-version restore denied; publisher restore succeeds. Auth/password/bootstrap regressions pass. |
| Approved media cannot be damaged by rejected replacement (R1) | PASS | Before-operation rejection precedes file effects; regression compares original SHA-256 and complete directory for denied replacements for all CMS roles; crop query rejected. HTTP multipart editor replacement returns 403 and preserves hash/directory at both browser widths. |
| Publication validates referenced images (R2) | PASS | Pending media prevents publication; approved objects populate in both ID/EN, nested references and retained versions covered. Native editor image selection, publisher approval/publication and anonymous decoded 320px image tested at 375/1280. |
| Localized approved alt / structured values (R3) | PASS | Missing EN alt and clearing approved localized alt rejected; required structured entries and safe links validated on publication. No automatic translation/fallback. |
| Durable immutable audit attribution (R4) | PASS | Actor ID/role snapshots survive staff deletion; API forge/update/delete denied; exact company-change event attributed. Legacy missing roles explicitly `legacy-unknown`, never invented. |
| Complete content/SEO/social schema and safe rich text (R5) | PASS | Post content/date, portfolio case study/gallery/featured, product overview/features and site social/SEO persist in integration; malicious draft rich-text nodes rejected. Single-product invariant also enforced on drafts. |
| Draft / authenticated preview / publish / version restore | PASS | Private dynamic no-store/noindex preview; 30 retained content/global versions; restore role checks tested. Native two-width editorial flow passes, including publisher takeover of the editor's document lock. |
| Shared stable block composition/order and localized preservation | PASS | ID/EN draft reorder preserves values in integration. Explicit labelled keyboard controls use the native form reducer; Enter moves the block, retains focus after loading and the published order matches for both locales at both widths. |
| HTTP publication invalidates warmed published cache | PASS locally | Browser warms empty/previous published content, saves a draft without exposing it, publishes through UI and immediately observes the new EN publication while ID remains correct. Cache keys include locale/dataset; hooks invalidate tag and both locale paths. CLI writes need explicit refresh/restart; distributed CDN not tested. |
| AT-08 private legal fields and precise audit event | PASS for Phase 04 | Super-admin writes and audit assertion; no fictional identity/default legal facts. Approved public projections remain Phase 05. |
| AT-01/02/03 homepage text/image/order without code | PASS | Native editor and publisher tests at 375/1280 pass. Fixture setup creates accounts/page only; image upload/selection/approval and page edits/publication occur through UI. Real rendered images and response 200 are asserted anonymously for ID/EN. |
| AT-12 keyboard / responsive phase scope | PASS for exercised flows | Public keyboard locale/menu regressions and CMS Enter reorder/focus pass; no horizontal overflow in editor/preview at tested widths. Full assistive-technology/WCAG conformance not asserted. |
| AT-04 exact news/project detail route draft exclusion | NOT TESTED — Phase 05 | API draft isolation passes; public slug routes are not implemented in Phase 04. |
| AT-05/06/07/09 verified installer delivery | NOT TESTED — Phase 06 | Private/pending metadata models only; even admin release publication denied. No binary upload/delivery activated. |
| AT-10 public contact workflow | NOT TESTED — later public/contact scope | Private bounded schema exists, submission API disabled; no delivery/rate-limit/retention claim. |
| AT-11 full public SEO / production performance and CDN | NOT TESTED — Phases 05/07/08 | Admin/draft/staging noindex foundation retained. Full metadata/canonical/hreflang/sitemap and deployed cache invalidation remain later gates. |

## Remediations and architectural decisions

- **R1 HIGH:** File replacement is rejected in `Media.beforeOperation`, before Payload can delete or write bytes. Every role uploads a new record for a replacement; crop/focal editing/removal is disabled. Approved metadata is publisher/admin-only. The old late rejection is no longer relied upon for file protection.
- **R2 HIGH:** Publication resolves every known upload field/nested item for each locale, requiring approved media, URL and translated alt. Used media cannot be deleted or withdrawn, including references retained only in versions. Computed usage counts use actual media foreign keys through Payload's existing Postgres adapter, avoiding expensive hydration of all block/version tables.
- **R3 MEDIUM:** Both saved alt locales are mandatory for media approval, and approved metadata cannot remove them. Readiness also checks required localized structured items and labels. Shared array composition/order is preserved. Isolated child requests reset the relation loader, which closes over its owning request and otherwise mutates the outer write locale during population.
- **R4 MEDIUM:** Every new audit event records minimal immutable ID/role snapshots alongside the optional user relation. Deleting a staff account can null the relation without erasing attribution. No passwords, contact messages or raw identity payloads are copied into events.
- **R5 MEDIUM:** Required missing fields and private operational schemas implemented. Restricted Lexical authoring supports paragraphs, bold/italic, h3/h4 and lists. Server validation rejects HTML/custom nodes and active links even on draft writes; preview and public rendering share one component. Dates are editorial metadata, not an unimplemented scheduler.
- **UI/LOW findings:** Shared renderer uses intrinsic image dimensions, avoids empty headings/unnamed links and renders video links/posters without third-party scripts. Direct image delivery preserves CMS cookies for private previews. Explicit 44px ordering controls have descriptive names, visible focus and a live announcement. Focus restoration follows the stable moved row across Payload's temporary loading/remount sequence, with a short expiry and a guard against taking focus from another input; both-width keyboard verification passes.
- Dependency audit identified a vulnerable transitive happy-dom version introduced through Lexical. Verified scoped override `@lexical/headless>happy-dom:21.0.4` is recorded in the lockfile; the installed Node requirement is satisfied. Final audit reports no known vulnerabilities.
- Test runner now includes the adversarial review regressions by default and safely cleans only its own random DB/media directory. Cache keys include a non-secret dataset hash to avoid crossing disposable test datasets.

## Files created / modified for Phase 04

Paths below are repository-relative for a portable inventory. Generated and untracked modules were inspected as well as tracked diffs.

| Module | Files |
|---|---|
| Access / schema | `src/access/editorial.ts`, `src/collections/Content.ts`, `Media.ts`, `OperationalModels.ts`, `Users.ts`, `src/globals/editorial.ts`, `src/blocks/registry.ts`, `src/hooks/editorial.ts` |
| Content services | `src/services/content/media-references.ts`, `media-validation.ts`, `metadata-validation.ts`, `rich-text.ts`, `read.ts` |
| Editor / preview / website | `src/components/admin/section-order.tsx`, `src/components/website/content-blocks.tsx`, `src/styles/admin.css`, `src/app/(website)/preview/[collection]/[id]/page.tsx`, preview layout, locale homepage, generated `src/app/(payload)/admin/importMap.js` |
| Configuration / generated schema | `src/payload.config.ts`, `src/payload-types.ts`, `src/migrations/index.ts`, `20261026_041637_phase04.{ts,json}`, `20261026_122602_phase04_closure.{ts,json}`, `20261026_123633_phase04_models.{ts,json}`, `next.config.mjs`, `package.json`, `pnpm-lock.yaml`, `.gitignore`, `.prettierignore` |
| Tests / harness | `scripts/run-tests.ts`, `tests/integration/editorial.ts`, `phase04-review.ts`, `auth.ts`, `tests/e2e/editorial.spec.ts`, `tests/unit/editorial.test.ts`, `media.test.ts`, `content-readiness.test.ts`, `tests/fixtures/editorial-image.png` and fixture README; existing foundation/helper updates retained |
| Reports / evidence | This closure, schema map, historical Phase 04 CMS/evaluation/review notices, README, roadmap, decisions, CHANGELOG, Phase 04 screenshots under `documentation/screenshots/` |

Closure adds two additive schema migrations (including explicit historical snapshot backfill) and disables unused focal metadata. Migration rollback/reapply/restore was tested against disposable DBs. Working DB backup is private and ignored under `.tools/`; no secret dump is committed.

## Commands actually executed

Commands use the pinned runtime from `.tools` on this machine. `pnpm` below abbreviates `node .tools/node_modules/pnpm/bin/pnpm.cjs` after setting PATH to its Node/bin and local tool bins. Raw development logs are ignored `.tools/phase04-closure-*.log`; they are local evidence, not portable CI artifacts.

| Executed command / operation | Actual result |
|---|---|
| `pnpm add @payloadcms/richtext-lexical@3.92.0` and scoped dependency override installation | Succeeded; matching pinned editor and lockfile updated. |
| `pnpm generate:types`, `pnpm generate:importmap`, migration creation | Succeeded; generated artifacts inspected. |
| `pnpm test` | Exit 0: **16 passed, 0 failed**. |
| `pnpm test:integration` | Exit 0: bootstrap/auth/password regressions, editorial suite and all R1–R5 regression groups pass; disposable DB removed. |
| `pnpm test:integration phase04-review` after final product guard | Exit 0: all R1–R5 groups pass, including rejection of a non-Galung product draft; disposable DB removed. |
| `pnpm test:database` | Exit 0: four migrations up, all down, empty-schema assertion, reapply, connection release/clean shutdown and pg_dump/psql fixture restore pass; disposable DB removed. |
| `pnpm audit` | Exit 0: `No known vulnerabilities found`. |
| `pnpm build` | Exit 0 after final application changes; compiled, TypeScript checked, routes generated. |
| `pnpm lint`, `pnpm typecheck`, `pnpm format:check` | Each exit 0 after final test changes; no lint errors/warnings; all matched files formatted. Format ignore now anchors root `/content/`, so content service code is checked. |
| `pnpm test:e2e --grep 'flow at 375'` | Final focused run exit 0: **1 passed (35.7s)**. Earlier focus/lock-selector failures are not counted as passes. |
| Full `pnpm test:e2e` | Final exit 0: **28 passed (1.5m)**; editor/publisher tests at 375 and 1280, existing design/resilience/auth/keyboard coverage all pass; disposable DB removed. Prior intermediate run: 26 pass / 2 fail on the unhandled native document lock. |
| Scoped working DB backup + Payload migrate | Exit 0; both closure migrations applied. SQL confirms all four migration names; media count was 0 before migration, audit snapshot missing count 0 (0 historical events). |
| `git diff --check` | Exit 0 after correcting an extra EOF blank line in `.prettierignore`; only normal CRLF-to-LF notices. Rechecked after final documentation updates. |

Intermediate failures are retained honestly: original unsafe regression probes, relation-loader locale corruption during validation, expensive initial media-usage lookup, generated rollback constraint ordering, draft validation bypass of ordinary field validators, focus loss during Payload row loading, native lock handling and a case-sensitive takeover selector, format warnings, one control-character lint error and a ref naming warning were discovered and corrected. A one-off fixture-generation import path was corrected to the installed Sharp export; the committed PNG requires no runtime generator. OS process inspection without elevation was denied; a permitted read-only retry succeeded. No unexecuted test is reported as passed.

Final raw success excerpts:

```text
tests 16 / pass 16 / fail 0
PASS: RBAC, draft isolation, shared reorder with localized preservation, publication, globals and audit controls
PASS R1/R3: file rejection preserves hash/directory; public approval requires both alt locales
PASS R2: pending publication denied; approved images populate in ID/EN; usage and retained versions protect files
PASS R5: operational models remain private/inactive; semantic metadata and site SEO/social fields validated
PASS R4: audit actor snapshot survives deletion and cannot be forged; company identity event attributed
PASS: fresh migration, rollback, reapply, connection release and clean shutdown
PASS: pg_dump/psql restore preserves migrated schema and fixture data
28 passed (1.5m)
Removed isolated e2e database
All matched files use Prettier code style!
No known vulnerabilities found
```

## Screens and manual visual inspection

Automated flows exercised `/admin/login`, Media create/ID/EN edits and selection drawer, Pages ID/EN edit, native lock takeover, approval and publication controls, authenticated `/preview/pages/:id?locale=id|en`, and anonymous `/id` / `/en`. They also tested anonymous preview rejection, oversized upload 413 and denied publication/replacement errors. All UI fixtures are synthetic and deleted; no production content was edited.

Twelve final captures cover editor/preview/public × ID/EN × 375/1280 under `documentation/screenshots/phase-04-{editor,preview,public}-{id,en}-{375,1280}.png`. Visually inspected editor-ID/preview-EN/public-EN at 375 and editor-EN/preview-ID/public-EN at 1280: readable controls, shared order, clearly visible synthetic image, appropriate locale text and no observed overlap/overflow in content. Native sticky controls/toasts are transient in full-page admin captures. Browser assertions cover actual keyboard focus; these static images cannot establish screen-reader behavior.

## Remaining risks / next scope

| Severity | Issue and owner | Required boundary |
|---|---|---|
| BLOCKER / HIGH / MEDIUM — current phase | None remaining in the reviewed and executed scope | R1–R5 and complete browser gate verified; no remediation required before closing Phase 04. |
| MEDIUM — later production gate | Hosting, durable object storage, distributed CDN invalidation and operational backups; owner/operations | Resolve/test before production deployment. Local disk is a development adapter. |
| MEDIUM — content/launch gate | Reviewed translations, production media rights, real legal identity/contact details; content owner | Never infer or publish sample facts as approved production copy. |
| LOW — verification limit | Full screen-reader audit, content-driven public layouts, field CWV/performance and full SEO; QA | Phases 05/07/08. Keyboard tests are not a WCAG certification. |

Next recommended scope: Phase 05 public ID/EN pages, approved projections of navigation/company/settings, safe feed/detail routing, complete localized metadata and content-driven responsive layouts. Phase 05 is not started automatically. Keep release delivery/verification for Phase 06 and contact intake disabled until its validated, rate-limited, retention-aware workflow exists. Media currently accepts images/posters; document attachments and final crop/render options need their public-page use case and safe delivery validation, and are not claimed as tested media formats. No pricing, payment, subscriptions, licensing, customer authentication or portal was added.

## Documentation drift and delivery boundary

The initial reports remain historical evidence of an insufficient PASS and the subsequent PARTIAL review. Their old generic-schema, broad media-delete lock, dynamic-only cache, unchanged-dependency and missing-audit-snapshot statements are superseded by this report and the schema map. README, roadmap, decisions and changelog now point to this final verdict. Phase 04 is locally closed; later phases and production readiness cannot be inferred from this working-tree state.
