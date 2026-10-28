# 08 — Phased Roadmap & Gates

## Operating model

Current activation, 28 October 2026: the user explicitly started Phase 08 deployment
preparation and selected Vercel web hosting with Supabase PostgreSQL. See
[Phase 08 evaluation](PHASE-08-EVALUATION.md) and the
[selected-provider plan](PHASE-08-VERCEL-SUPABASE.md). Plans, region, budget,
credentials, storage/worker choices and deployment approval remain open. No
staging/production resources are provisioned or deployed; the gate is PARTIAL.
Historical no-automatic-Phase-08 notices are superseded for preparation only.
[Phase 07 launch controls](PHASE-07-EVALUATION.md) remain open.
Implement one phase at a time. Before each phase read AGENTS.md and relevant requirements; after each phase use `prompts/90-PHASE-EVALUATION.md`. All gates require a deliverable, verified tests and a written phase report.

| Phase | Objective | Deliverables / gate |
|---|---|---|
| 01 | Requirements & design audit | Confirm sitemap, user flows, asset audit, interface inventory, open questions; no fake legal/company copy |
| 02 | Repo and foundation | Compatible Next/Payload scaffold, pnpm lockfile, Postgres local, env example, admin login, baseline checks green |
| 03 | Design system | Tokens, typography, layout shell, responsive header/footer and component primitives consistent with screenshot |
| 04 | CMS foundation | Collections/globals, block registry, RBAC, media, localization, versioning/draft preview and revalidation |
| 05 | Public website | ID/EN Home, About, Software, Features, Portfolio, News, Contact, Legal pages with CMS content |
| 06 | Download center | Direct storage uploads, release verification/retire, Windows/macOS public download and notes |
| 07 | QA & hardening | E2E RBAC/download/i18n tests, a11y/SEO/performance/security audit, backup restore rehearsal |
| 08 | Deployment & handover | Hosting choice with commercial terms, domain/DNS/TLS, prod secrets, CI/CD, monitoring and admin guide |

## Avoid premature commercial blockers

Phase 02 implementation and its measured gate status are recorded in
`PHASE-02-EVALUATION.md`; setup/migration procedures are in `PHASE-02-FOUNDATION.md`.
The phase report does not authorize automatically beginning Phase 03.
The historical PARTIAL review is superseded by `PHASE-02-CLOSURE.md`, which records
the remediations and current acceptance evidence. Phase 03 is not started automatically.
Continue website MVP work using placeholders for TBD business data; do not implement payment, subscriptions, account portal or license logic. Production public legal copy and hosting terms must be approved before launch, not block unrelated development.

## Decision gates
- End phase 01: content requirements and visual interpretation signed off.
- End phase 02: repeatable local start; migrations/test automation documented.
- End phase 04: real admin can change a homepage text/image and block order in both locales without code edits.
- End phase 06: release upload verified, download anonymous, app server never streams installer bytes.
- End phase 08: deployment smoke tests, rollback, access control and backups checked.

## Current Phase 03 gate — 26 October 2026
Phase 03 was explicitly activated and implemented. PHASE-03-CLOSURE.md supersedes the historical PARTIAL review: P03-R1–R6 are closed and the local Phase 03 gate is PASS after regression and visual verification. Prior Phase 02 closure remains historical foundation evidence. Do not automatically advance to Phase 04.

## Initial Phase 04 gate — 26 October 2026 (historical)
User explicitly activated Phase 04. The initial report recorded local PASS, superseded by the fresh PARTIAL review below. Historical evidence: complete integration suite, 11 unit tests, 27 browser tests, strict typecheck/lint/build, migration rollback/reapply/restore and backed-up working local DB migration. See PHASE-04-CMS.md and PHASE-04-EVALUATION.md for exact scope, actual evidence and production follow-ups. This supersedes the historical Phase 03-only progress status; do not automatically start Phase 05.

## Fresh Phase 04 review — 26 October 2026 (historical)
The review changed the initial PASS to PARTIAL. PHASE-04-REVIEW.md records two reproduced HIGH media findings plus localized readiness, audit attribution and schema-contract gaps. The remediation below supersedes that historical verdict; earlier green tests did not cover these defects.

## Current Phase 04 closure — 26 October 2026
**Local gate PASS; Phase 04 closed.** User-authorized remediation closes P04-R1–R5. PHASE-04-CLOSURE.md executes the phase evaluation prompt and records 16 unit tests, full integration plus adversarial regressions, four-migration rollback/reapply/restore, clean lint/typecheck/format/build, dependency audit and 28 browser tests passing. Native editor/publisher flows at 375/1280 verify ID/EN text/image/shared order, private preview, document-lock takeover, publication, anonymous visible images and warmed cache invalidation. Working local DB migrated after backup. PHASE-04-SCHEMA-MAP.md is the current editorial runbook. Production storage/CDN, approved content/legal facts and later public pages keep their own gates. Do not automatically start Phase 05.

## Phase 05 — 27 October 2026
User activated public-page implementation. See PHASE-05-PUBLIC-PAGES.md for the fixed page-key/localized-slug contract, scope and deferred contact decisions, and PHASE-05-EVALUATION.md for the measured gate. This does not authorize Phase 06 or deployment.

Phase 05 implementation verification: lint/typecheck/format/build, 16 unit tests, full integration and 29 browser tests pass locally. Overall Phase 05 gate remains PARTIAL: the user requested a privacy-notice draft and disabled Contact submission until ready; email transport/30-day deletion and remaining production QA are open. See PHASE-05-EVALUATION.md for exact evidence and file inventory. No automatic Phase 06 activation or deployment.

## Fresh Phase 05 review — 27 October 2026 (historical)
**Current gate PARTIAL; Phase 05 not closed.** PHASE-05-REVIEW.md supersedes the pre-contact evaluation snapshot. Lint/typecheck/build, 20 unit tests, full integration and 30 browser tests pass; format fails in two application files. Isolated probes reproduce incorrect translated CMS detail navigation and a 503 after SMTP acceptance when audit writing fails. Contact activation is blocked: the user confirmed the mailbox is not registered; local contactEnabled/published ID page/retentionHealthy/ready flags are false. Review includes no real SMTP retry, mail sending, activation or production fixes. Remediate and reevaluate Phase 05; do not automatically start Phase 06 or deploy.

## Current Phase 05 implementation closure — 27 October 2026

**Local implementation PASS after R1–R5 remediation; live Contact gate remains PARTIAL/deferred.** The user explicitly selected finishing code/tests before creating the mailbox and approved the EN notice. PHASE-05-CLOSURE.md executes the evaluation prompt: localized navigation, durable/concurrent Contact receipts and audit repair, token/error recovery, functional responsive image/grid controls, policy attribution and independent retention health are verified. Evidence includes 20 unit tests, full integration/regressions, five-migration rollback/reapply/restore, 31 browser tests, enabled-indexing HTTP SEO, clean lint/typecheck/format/build and production dependency advisory audit. The backed-up working database has all five migrations applied.

This closes the authorized local code/test scope without claiming real SMTP authentication or inbox delivery. Mailbox creation, reviewed working Contact publications, supervised maintenance and an authorized real-message smoke test remain required before activation; CONTACT_ENABLED stays false. Company/legal/translation/asset/hosting production gates remain separate. No automatic Phase 06 activation or deployment while any applicable gate is unresolved.

## Phase 06 — 27 October 2026

User explicitly activated the download system, superseding the previous no-automatic-activation notice for this phase only. PHASE-06-DOWNLOADS.md documents direct scoped multipart uploads, private immutable versioned assets, separate SHA-256/format verification, reviewed ID/EN publication snapshots, anonymous Windows/macOS redirects and retirement. PHASE-06-EVALUATION.md records actual local checks, failures/remediations, screenshots, working-database backup/migrations and remaining issues.

**Live Phase 06 gate PARTIAL:** no real provider/bucket policies, approved architecture list or signed installers have been supplied/tested. Local fixture evidence does not certify production storage, signing/notarization or OS installation. CONTACT_ENABLED remains unchanged. No automatic Phase 07 activation, deployment or future commercial features.

## Fresh Phase 06 review — 28 October 2026 (historical)

**Technical and live gates PARTIAL; Phase 06 not closed.** PHASE-06-REVIEW.md supersedes the earlier local PASS. Fresh lint/types/units/build, focused download integration and two browser checks pass, but the adversarial browser probe reproduces completion-response-loss recovery that creates duplicate verified variants and prevents release publication, plus a stale native file-selection UI. The production dependency advisory command exits 1 on one LOW deepmerge advisory through Payload. The probe passing means reproduction succeeded, not that recovery acceptance passed. Remediate and reevaluate before closure; real storage, build and content gates remain separate. Review-only tests/docs were added; no app fix, activation, real upload or automatic Phase 07/deployment.


## Current Phase 06 remediation — 28 October 2026

**Local implementation PASS; live gate PARTIAL.** PHASE-06-CLOSURE.md executes the phase evaluation prompt and supersedes the historical defect review: completion/status recovery preserves busy or uncertain sessions, native selection clears, and audited candidate selection repairs duplicate verified variants without deleting history. The LOW deepmerge advisory is locally patched and enforced by a fail-closed CI policy; raw registry audit is explicitly not clean. Actual evidence includes 30 unit tests, full integration, 33 browser tests plus two final download/contrast regressions, eight-migration rollback/reapply/restore, indexed HTTP SEO and lint/types/format/build. All eight working-DB migrations are applied after backup.

Real private versioned storage/IAM/CORS/lifecycle/worker operations, approved architectures and signed/notarized Windows/macOS builds with real OS installation, and reviewed public/legal/hosting content remain activation gates. No automatic Phase 07, deployment, Contact activation or future commercial/customer-account features.
