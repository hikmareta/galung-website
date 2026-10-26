# Changelog

## 2026-10-26 — Phase 02 remediation and closure

- Unified password policy across create/update/reset, with Local API and HTTP regression coverage for short passwords, valid/expired/replayed tokens and inactive accounts.
- Isolated database/browser tests from development data; subprocess assertions reject timeout/signal/launch errors; every scenario runs without silently skipping bootstrap coverage.
- Added fresh migration, rollback/reapply, pg_dump/restore and connection-shutdown checks. Added a reproducible Payload Postgres lifecycle patch; removed forced-success CLI exits.
- Replaced unsupported ESLint 9/plugin peers with verified ESLint 10-compatible TypeScript/React/Hooks/Next lint packages, patched the vulnerable migration-tool esbuild dependency and added audit checks to CI.
- Expanded HTTP access/CSRF/session checks and narrow keyboard locale navigation; removed misleading unused SITE_INDEXABLE example configuration.
- Updated setup, security boundaries, evaluations and Git delivery documentation. Preserved the Phase 01 preview and did not add future-phase product features.

## 2026-10-26 — Fresh Phase 02 review

- Re-read gate, acceptance/security requirements and actual source/configuration/tests; reran format, lint, strict typecheck, unit, build, DB integration, browser, lockfile and audit checks.
- Revised the current Phase 02 verdict to PARTIAL. Reproduced reset-password accepting an eight-character password despite ordinary-write rejection, and the browser suite failing when an administrator already exists.
- Recorded the repeat-bootstrap assertion's timeout false-positive risk and the still-uncommitted repository/lockfile. Retained original successful check results as historical evidence.
- Corrected README status drift and linked current findings/remediation in the evaluation, runbook, roadmap and decision register. No application behavior or future-phase features changed.

## 2026-10-26 — Phase 02 foundation

- Added a pinned Next App Router/React/Payload/PostgreSQL/pnpm foundation with strict TypeScript and Tailwind plumbing.
- Added fail-closed environment validation, restricted admin collection, trusted local bootstrap, password policy, login lockout, cookie/CSRF settings and noindex defaults.
- Added explicit unreviewed ID/EN route samples, checks, PostgreSQL migrations/runbook and CI skeleton. Retained the Phase 01 preview unchanged.
- Official compatibility evidence, actual check results and remaining gate conditions are recorded in documentation/PHASE-02-FOUNDATION.md and documentation/PHASE-02-EVALUATION.md.
- No production deployment, public content collections, installers, pricing/payment or customer account features.

## 2026-10-25 — Phase 01 and authorized preview extensions

- Completed PRD/page/component/asset/reference audit and backlog; Phase 01 was explicitly approved by the user.
- Added Indonesian draft content and licensed-photo source/credit registers, then replaced displayed stock imagery with three original conceptual AI visuals at the user's request. Kept originals and rights records as archived assets.
- Aligned the local preview with the reference's green/gold/ivory composition, gold CTA, hero gradient, icon strip, cards and bamboo motifs; retained one Galung product and truthful unavailable states.
- Applied user-selected Poppins headings and Nunito Sans body/UI, self-hosted with OFL notices.
- Re-evaluated current artifacts, reproducible preview generation, local HTTP boundaries, fonts, navigation and responsive widths. Recorded remaining issues and all untested production acceptance criteria in documentation/COMPLETED-PHASE-EVALUATION-2026-10-25.md.
- Corrected README typography/status drift and clarified historical approval notes. Updated the typography report with the latest 320px heading measurement.
- No Next/Payload/Postgres foundation, production CMS, installer pipeline, deployment or future commercial feature implemented. No Git history exists yet; this changelog is a work record, not a release/commit assertion.

## 2026-10-25 — Preview remediation

- Closed narrow-heading spill and heading-level skip; verified actual widths 280/320/390/768/1440 and keyboard focus/navigation/FAQ.
- Moved 83 remaining editorial strings, alt texts and labels to draft JSON; generator escapes inserted content in one pass, validates missing data/locale and writes atomically.
- Added 12 responsive WebP derivatives, local Latin WOFF2 fonts, asset hashes and repeatable optimization. Largest image/font set reduced from 7,177,155 to 568,414 bytes (92.08%); original assets/rights records retained.
- Added allowlisted local server error/method handling, CSP and consistent noindex/error headers. Native Node regression suite: 10 passed. PowerShell generator checks: 5 passed.
- Initialized local Git and .gitignore; no commit/remote or application scaffold created. Added local preview guide and remediation evaluation. Production CMS/RBAC/locales/releases/legal content remain pending under the roadmap.
