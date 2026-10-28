# Phase 05 evaluation — 27 October 2026

> Historical pre-contact-extension snapshot. The current gate, contact changes and fresh test evidence are in [PHASE-05-REVIEW.md](PHASE-05-REVIEW.md). Older notice/implementation status and test counts below are retained as history.

Executed prompts/90-PHASE-EVALUATION.md against AGENTS.md, roadmap, acceptance matrix, relevant requirements, actual implementation/diff, configuration and tests.

**Gate: PARTIAL. Public-page implementation and local automated checks pass.** Contact submission remains deliberately disabled per the user's latest choice while its notice/delivery/deletion workflow is prepared. Production indexing/content/legal/asset approval and QA remain open. No deployment, WCAG/security certification or production readiness is claimed. No automatic Phase 06 activation.

## Scope and verified acceptance matrix

| Requirement | Status | Evidence and limit |
|---|---|---|
| PUB-01 / AT-01 bilingual pages | PASS | Browser test checks 11 paths in each locale, language attributes and CMS titles; translated article slug switch verified; no locale fallback |
| PUB-02 Home | PASS | Published home key, reusable shared-order blocks; existing native editor/publisher browser flows pass in both locales |
| PUB-03 About | PASS | Published about page renders; code review confirms whitelisted published company projection and omission of empty values |
| PUB-04 Software/Features | PASS | Both routes render the single galung product from CMS; no commercial editions/features added |
| PUB-05/06 Portfolio/News | PASS | Published listing/detail routes, category filtering and localized detail slugs pass; pagination implemented but multi-page dataset behavior not separately exercised |
| PUB-08 / AT-10 Contact | PARTIAL | Published Contact page passes; public submission stays disabled by user choice pending approved notice, configured email transport, validation/rate limiting and automatic retention deletion |
| PUB-09 Legal | PASS | Published privacy/terms fixture routes pass; no real policy/owner data fabricated or seeded |
| AT-02/03 content lifecycle/order | PASS | Native editor/publisher tests at 375/1280 plus integration: draft isolation, localized values/shared ordering, image approval, publication and warmed public content updates |
| AT-04 draft privacy | PASS | New post draft remains absent publicly; unknown and wrong-locale slugs return 404; public reader explicitly draft:false / overrideAccess:false / fallbackLocale:false |
| AT-08 company fields | PASS | Existing audited admin-only writes pass integration; public code projects only explicit published fields. End-to-end global-projection draft transition needs additional coverage |
| AT-11 SEO | PARTIAL | Canonical and ID/EN hreflang pass on every fixture route, runtime origin and noindex verified; disabled sitemap empty; positive production-indexing crawl not executed |
| AT-12 responsive/keyboard | PASS | 21 design/font/reflow checks, mobile keyboard language switching and native editor controls; no full screen-reader/WCAG certification |
| AT-05/06/07/09 installer delivery | NOT TESTED | Deferred to Phase 06; existing private release models remain inactive, verified by integration |
| Production performance/a11y/security/operations | NOT TESTED | No Lighthouse/field CWV, production storage/CDN, deployment, new dependency audit or backup restore run in this phase |

## Decisions and architectural alignment

Reuses existing strict TypeScript/App Router/React/Tailwind/Payload/Postgres stack and exact pins. No new dependency, lockfile change, schema, ORM or migration. Public queries carry no editor request identity and use request-scoped React memoization rather than privileged persistent caches. Publication hooks remain intact. Private globals remain private in REST; only whitelisted published navigation/contact/company values are projected on the server. Category labels are projected only for IDs referenced by published localized records.

Fixed page keys: home/about/portfolio/news/contact/privacy/terms. Products key galung serves software and software/features. Posts/projects use localized CMS slugs. Missing/incomplete/unpublished content returns 404; no demo or factual fallback replaces it. Shared block composition/order is unchanged. Interface samples are explicitly labelled while indexing is off. No translations were auto-generated; the requested privacy draft is Indonesian only.

Canonical and sitemap URLs use the existing validated runtime environment reader, not visitor Host headers or build-inlined public variables. PUBLIC_INDEXING defaults false; enabling requires rebuild/restart for response-header policy. Robots and sitemap are dynamic. Admin/API/preview remain noindex. Structured data is omitted rather than inventing assertions. Header CTA currently leads to the single software page; installer/download CTA activation keeps Phase 06.

User chose admin@galung.id and 30-day retention for website copies, then requested a draft notice while keeping the form disabled. CONTACT-PRIVACY-DRAFT.id.md is unapproved and unpublished. Inbox retention, provider configuration, complete policy/legal identity and automated deletion remain unresolved. No test or real email was sent.

## Commands actually executed and results

Checks used the documented local PATH and `node .tools/node_modules/pnpm/bin/pnpm.cjs <script>` with Node 24.22.1/pnpm 10.34.9. Initial system pnpm/Corepack failed registry DNS; no versions were changed.

| Command/check | Actual final result |
|---|---|
| pnpm lint | PASS |
| pnpm typecheck | PASS |
| pnpm format:check | PASS |
| pnpm test | PASS — 16/16 |
| pnpm test:integration editorial | PASS — CMS editorial and adversarial R1–R5 regressions |
| pnpm test:integration | PASS on complete rerun — bootstrap/login/lockout/password/reset/replay/inactive, editorial and adversarial checks; isolated database removed |
| pnpm build | PASS on final output-access retry — compile, TypeScript, page generation, traces and expected route table completed |
| pnpm test:e2e | PASS — 29/29 in 3.5 minutes on final build; isolated database removed |
| git diff --check | PASS — line-ending notices only |
| docker compose ps / up -d --wait | Initial daemon unavailable; started Docker Desktop hidden, existing PostgreSQL container started and reported Healthy; stored working data preserved |
| Next installed guide/code inspection, rg / Get-Content / git diff/status | Reviewed dynamic routes before implementation; checked sitemap/metadata/robots conventions during verification |
| Manual image inspection | Inspected phase-05-id-375.png, phase-05-stress-id-375.png, phase-05-detail-en-375.png |

Historical failures are retained as evidence, not counted as passes: initial PostgreSQL access EACCES/ECONNREFUSED; initial integration auth subprocess exceeded its unchanged 120s deadline under concurrent build load; first browser readiness waited for an intentionally absent homepage; first complete browser run had 27 pass/2 fail (ambiguous text selector and build-inlined canonical origin). Those defects were corrected and the complete suites rerun. One later build hit Windows EPERM on a generated folder; a premature browser retry failed before tests on incomplete build artifacts. Final build and browsers ran sequentially and passed. Transient type/lint/format issues found while editing were corrected before final checks. No timeout assertion was weakened.

No format/lint/typecheck/unit/build/e2e command is missing. Migration rollback/restore was not repeated because the schema is unchanged; prior Phase 04 evidence is not claimed as a new pass. No deployment, email delivery or installer download smoke test was performed.

## Screens, routes and UI findings

Browser route checks in both locales: home, about, software, software/features, portfolio, news, contact, privacy, terms, localized news detail and portfolio detail. Verified wrong-locale/unknown slug, unsupported locale, pricing 404, private-global API denial, category positive/empty results, no draft replacement and noindex metadata. Responsive tests cover 375/639/640/768/1199/1200/1440, plus existing 320px navigation; public/admin/editor/preview checks include 375/1280. Fonts, reduced motion, focus/keyboard navigation, 200% root text and text-spacing overrides pass.

34 new Phase 05 PNGs (4,429,122 bytes) preserve historical Phase 03/04 screenshots. They contain labelled synthetic fixtures, not approved production content. Mobile ID and EN detail screenshots are readable without overflow. An enabled CMS block whose optional localized fields are empty can leave an empty panel; editors must complete or disable those blocks. No real-world product photography/design-reference assets were published. Full content-specific visual sign-off remains pending approved content.

## Open issues and owners

| Severity | Issue / reproducible evidence | Owner and next step |
|---|---|---|
| HIGH (explicitly deferred) | Contact page has no submission action; PUB-08/AT-10 remain incomplete | Product/legal: review Indonesian notice and inbox retention. Engineering: configure email delivery to admin@galung.id, accessible validation, anti-spam/rate limits, 30-day website deletion and tests before enabling |
| MEDIUM | PUBLIC_INDEXING=true crawl was not run; default test environment stays noindex | Engineering QA: verify production-mode sitemap reciprocity, canonical and sensitive-route headers in an isolated environment before launch |
| MEDIUM | Actual bilingual content, brand/media rights, legal identity and full policies remain unapproved | Content/legal owners: supply/review and publish using existing CMS workflow; missing pages deliberately return 404 |
| MEDIUM | Global public projections lack a dedicated HTTP published-to-draft transition test | Engineering: extend this boundary test before launch; private API denial and general global lifecycle already pass |
| MEDIUM | Category projection enumerates publications; no realistic-volume performance/CWV measurements | Engineering QA: benchmark realistic content and optimize projection/cache with correct invalidation if justified |
| LOW | Multi-page pagination dataset not separately tested; images retain development unoptimized delivery | Engineering QA/storage: pagination fixture and provider-backed responsive delivery checks |
| LOW | Optional localized fields can yield blank enabled blocks (EN detail fixture screenshot) | Content editors: complete or disable blocks; consider empty-block suppression in UI refinement |

No open BLOCKER was reproduced for the implemented public-page paths. Phase gate remains PARTIAL because the complete Contact requirement is deferred and production evidence remains incomplete.

## Documentation, delivery and next scope

README, roadmap and decision register now record Phase 05 activation and contact decisions. PHASE-05-PUBLIC-PAGES.md documents editor route keys, published reads, global projection, indexing and deferred workflow. The privacy draft is explicitly separate from published policy. Existing AGENTS.md edits predate this work and were preserved; Next's generated next-env.d.ts returned to the tracked build state. No commit, push or deployment is claimed.

Commit-ready summary: add published bilingual public routes, localized detail navigation, CMS-backed feeds/settings, responsive blocks and SEO; adapt regression fixtures; add route/privacy coverage and 34 screenshots; document contact decisions/draft and gate limits. Next: review the privacy draft and complete contact delivery/deletion/security tests, then close remaining QA evidence. Phase 06 installer work needs separate activation. No Basic/Pro, pricing, payments, customer portal/auth, subscriptions or license logic added.

## Exact changed-file inventory

The following excludes pre-existing AGENTS.md changes. Screenshots are listed as evidence files, not production assets.
- `.env.example`
- `README.md`
- `documentation/08-DEVELOPMENT-ROADMAP.md`
- `documentation/DECISIONS-AND-OPEN-QUESTIONS.md`
- `next.config.mjs`
- `playwright.config.ts`
- `src/app/(website)/[locale]/layout.tsx`
- `src/app/(website)/[locale]/page.tsx`
- `src/components/website/content-blocks.tsx`
- `src/components/website/header.tsx`
- `src/styles/globals.css`
- `tests/e2e/design-resilience.spec.ts`
- `tests/e2e/design-system.spec.ts`
- `tests/e2e/editorial.spec.ts`
- `tests/e2e/foundation.spec.ts`
- `documentation/CONTACT-PRIVACY-DRAFT.id.md`
- `documentation/PHASE-05-EVALUATION.md`
- `documentation/PHASE-05-PUBLIC-PAGES.md`
- `documentation/screenshots/phase-05-admin-1440.png`
- `documentation/screenshots/phase-05-admin-375.png`
- `documentation/screenshots/phase-05-admin-768.png`
- `documentation/screenshots/phase-05-admin-edit.png`
- `documentation/screenshots/phase-05-admin-login.png`
- `documentation/screenshots/phase-05-admin-users.png`
- `documentation/screenshots/phase-05-detail-en-375.png`
- `documentation/screenshots/phase-05-en-1440.png`
- `documentation/screenshots/phase-05-en-375.png`
- `documentation/screenshots/phase-05-en-768.png`
- `documentation/screenshots/phase-05-home-id-1280.png`
- `documentation/screenshots/phase-05-id-1440.png`
- `documentation/screenshots/phase-05-id-375.png`
- `documentation/screenshots/phase-05-id-768.png`
- `documentation/screenshots/phase-05-menu-en-375.png`
- `documentation/screenshots/phase-05-menu-en-768.png`
- `documentation/screenshots/phase-05-menu-id-375.png`
- `documentation/screenshots/phase-05-menu-id-768.png`
- `documentation/screenshots/phase-05-regression-editor-en-1280.png`
- `documentation/screenshots/phase-05-regression-editor-en-375.png`
- `documentation/screenshots/phase-05-regression-editor-id-1280.png`
- `documentation/screenshots/phase-05-regression-editor-id-375.png`
- `documentation/screenshots/phase-05-regression-preview-en-1280.png`
- `documentation/screenshots/phase-05-regression-preview-en-375.png`
- `documentation/screenshots/phase-05-regression-preview-id-1280.png`
- `documentation/screenshots/phase-05-regression-preview-id-375.png`
- `documentation/screenshots/phase-05-regression-public-en-1280.png`
- `documentation/screenshots/phase-05-regression-public-en-375.png`
- `documentation/screenshots/phase-05-regression-public-id-1280.png`
- `documentation/screenshots/phase-05-regression-public-id-375.png`
- `documentation/screenshots/phase-05-stress-en-1200.png`
- `documentation/screenshots/phase-05-stress-en-375.png`
- `documentation/screenshots/phase-05-stress-id-1200.png`
- `documentation/screenshots/phase-05-stress-id-375.png`
- `src/app/(website)/[locale]/[...path]/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/components/website/content-image.tsx`
- `src/components/website/feed.tsx`
- `src/components/website/public-page.tsx`
- `src/services/content/public.ts`
- `tests/e2e/public-pages.spec.ts`
- `tests/helpers/public-fixture.ts`
