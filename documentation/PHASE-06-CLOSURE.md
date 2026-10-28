# Phase 06 remediation and reevaluation — 28 October 2026

**Local implementation gate: PASS. P06-R1/R2 are fixed; P06-R3 is closed through verified local mitigation with upstream tracking retained. Live activation gate: PARTIAL.** This report executes `prompts/90-PHASE-EVALUATION.md` after user-authorized remediation. It supersedes the defect status in PHASE-06-REVIEW.md while preserving historical reproduction and command history. No unmitigated BLOCKER/HIGH/MEDIUM application finding remains from that review. Production prerequisites below are not fabricated as passes. No Phase 07, deployment or commercial/customer-account functionality is authorized or introduced.

## Reviewed scope and architectural alignment

Reviewed AGENTS.md, README.md, documentation/01-PRODUCT-REQUIREMENTS.md, 02-TECHNICAL-ARCHITECTURE.md, 03-SITEMAP-AND-ROUTING.md, 04-CMS-CONTENT-MODEL.md, 05-UI-UX-DESIGN-SYSTEM.md, 06-ADMIN-REQUIREMENTS.md, 07-SECURITY-QUALITY-TESTING.md, 08-DEVELOPMENT-ROADMAP.md, 09-DEPLOYMENT-OPERATIONS.md, 10-ACCEPTANCE-CRITERIA.md, DECISIONS-AND-OPEN-QUESTIONS.md, PHASE-06-DOWNLOADS.md, PHASE-06-EVALUATION.md, PHASE-06-REVIEW.md and the evaluation prompt. Read the installed Next route-handler guide. Inspected actual modules, package configuration, migration/schema, CI and tests. The working tree already included substantial Phase 05/06 changes; the full Git diff is not attributed to this remediation.

Scope: repair uncertain completion and busy-lease retry, reset native file state, recover existing duplicate variants through an audited publication selection, mitigate the reviewed LOW dependency advisory, then run regressions and document evidence. Existing direct-storage transport, private immutable metadata, bounded control requests, Super Admin permissions, verification worker and published ID/EN snapshot architecture remain in place. No installer bytes are added to application responses or uploads; the storage abstraction remains provider-portable within its documented versioned-S3 requirements. No extra ORM or customer authentication is added.

## Findings and remediation decisions

| Original finding | Disposition | Code / regression evidence |
|---|---|---|
| P06-R1 MEDIUM: lost completion response causes replacement/duplicate verified variants and blocks publication | CLOSED locally | Actual API 409 from a temporary busy lease followed by injected lost app response after server 200 recovers with one begin/one part, two OS assets and successful publication. Client checks owner-scoped status before retry; busy/uncertain sessions remain. Cancellation checks already-completed state. Server status does not instantiate storage or reveal upload IDs/keys. Integration repairs duplicates while preserving immutable assets/history. |
| P06-R2 LOW: native file selection remains after success | CLOSED locally | Positive browser regression verifies native input files.length=0 and disabled Upload after recovered success, with React file/session state cleared. |
| P06-R3 LOW: deepmerge 4.3.1 advisory / raw CI audit failure | CLOSED through local mitigation; upstream advisory remains | Pinned pnpm patch drops dangerous keys from source and target enumeration in source/CJS/UMD; 30 unit tests include exploit cases, runtime bundle compatibility, actual Payload wrapper behavior and fail-closed audit policy. Registry audit still exits 1; verified policy exits 0 with 1 mitigated / 0 unmitigated. See DEPENDENCY-SECURITY.md. |

`assetsToPublish` is an optional, versioned relationship on the existing release collection. Empty selection keeps the all-verified behavior. Explicit selection must belong to that release, contain verified complete metadata, include Windows and macOS, and have one candidate per OS/architecture. Cross-release, failed/unverified and duplicate selections are rejected server-side. Publishing records only the selected IDs in the existing protected approvedAssets snapshot. Public queries filter those IDs before their 200-row bound, so historical candidates cannot displace an approved asset. Selection changes use existing Super Admin access, Payload versions, audit and cache revalidation hooks. Binary and verification metadata remain immutable; no destructive cleanup is needed to recover a release.

Browser session progress is intentionally in memory; a reload does not restore the selected local file/session. If the provider completes but its response or the following DB write is lost, pending state may require operator reconciliation; the fix does not invent a storage version or mark an orphan verified. The runbook now distinguishes that case from an app response lost after a successful DB update.

## Acceptance matrix

| Scope / acceptance | Status | Evidence and limits |
|---|---|---|
| Scoped direct multipart, exact parts, checksum/magic/size, failure and expiry | PASS locally | Full integration and signer/validation units pass; browser verification listed separately. |
| AT-05 Windows / AT-06 macOS anonymous download, exact checksum and empty app redirect | PASS locally | Full integration and ordinary browser upload/verification/download/retirement pass with synthetic fixtures; real installers/provider remain NOT TESTED. |
| AT-07 permissions and AT-09 invalid installer publication denial | PASS locally | Full integration denies anonymous/editor/publisher access, cross-owner status/actions, metadata forgery, wrong checksums and incomplete/unreviewed publication. |
| Uncertain completion / busy retry / no duplicate / later publication | PASS locally | Positive browser regression replaces the original defect-asserting probe; one begin, one part, recovered success and final publication verified. |
| Native file reset and mobile admin layout | PASS for measured views | Final positive browser asserts files.length=0; viewport/document=375, uploader width343/right359, file input right295. Candidate instructions measure 14.03:1 light / 18.42:1 dark against a 4.5:1 minimum. |
| Repair historical duplicates; reject foreign/failed/missing-OS/duplicate choices; preserve snapshot | PASS locally | Extended integration creates a late verified duplicate, proves default publication denial, rejects invalid selections, publishes the valid pair and excludes the unselected asset from anonymous download. |
| ID/EN publication and public content lifecycle | PASS locally | Full integration verifies both reviewed notes, snapshot isolation and immediate retirement; browser results listed separately. |
| Dependency mitigation and Payload merge compatibility | PASS locally | 30 unit tests, pinned frozen install and audit:policy pass; raw audit NOT clean. |
| Strict types, lint, format and production build | PASS | Final code lint, strict types and formatting pass; the final application build also passes. |
| AT-11 indexed HTTP SEO and sensitive noindex | PASS locally | Separate enabled-indexing production build and one HTTP browser test verify reciprocal canonical/hreflang/sitemap, draft exclusion and sensitive noindex. Normal non-indexed build restored; final message-only API refinement rebuilt and retested separately. |
| Migration up/down/up, pool shutdown and backup restore | PASS locally | Eight migrations; disposable database fully rolled back, reapplied and restored successfully. |
| Real provider/IAM/CORS/lifecycle, real signed/notarized installers and OS installation | NOT TESTED | Credentials, approved builds/architectures and provider/owner approval not supplied. |
| Broad WCAG 2.2 AA and real-user Core Web Vitals | NOT TESTED | Target remains; browser sample checks are not a certification. |

## Actual commands and raw results

Commands use pinned Node 24.22.1 / pnpm 10.34.9. No unexecuted test is counted.

| Command / operation | Actual result |
|---|---|
| pnpm patch deepmerge@4.3.1 --edit-dir .tools/deepmerge-patch; patch-commit; install --no-frozen-lockfile | Exit 0; three-entrypoint patch and dependency graph recorded. Explicit install was needed after patch-commit to update actual resolution. |
| pnpm install --frozen-lockfile | Exit 0; lockfile and patch reproducible. |
| payload generate:types / migrate:create phase06_candidate_selection | Exit 0; migration 20261028_125152 created. Redundant second create had no schema changes, asked about an empty migration, then exited 13; no second migration was created. |
| Early typecheck and unit attempts | Failed: relationship query inference/null session narrowing, then source-entrypoint build-only module missing. Corrected types and restricted execution to real runtime bundles, retaining source fingerprint verification. These failures are not passes. |
| pnpm generate:types; generate:importmap (final) | Exit 0; type generated, no new import-map entries needed. |
| pnpm lint; typecheck; format:check (final) | Exit 0; zero final lint warnings/errors, all formatting matched. Earlier two ref-name lint warnings were fixed. |
| pnpm test (final) | Exit 0; 30 passed, 0 failed. |
| pnpm audit:policy (final) | Exit 0; five security/compatibility regressions pass; raw full registry audit exit 1, one LOW GHSA-gcqx-w48m-w2h4 locally mitigated, zero unmitigated. Raw JSON saved in .tools/dependency-audit.json. |
| pnpm build (final application code) | Exit 0; production routes compiled, typed and generated. |
| Initial pnpm test:integration | Exit 1, ECONNREFUSED 127.0.0.1:5432. Docker engine was stopped. Docker Desktop CLI start and docker compose up -d postgres restored local service. |
| First full integration after database start | Exit 1: operator-bootstrap subprocess timed out at 120 seconds while builds/database regression were running. No timeout threshold was relaxed. |
| pnpm test:integration (sequential rerun) | Exit 0; full auth/bootstrap/regressions, editorial, Phase 04 media/audit, Contact/Phase 05 and extended download integration pass; disposable DB removed. A pg@8 concurrent-query deprecation warning was emitted; no pg@9 compatibility claim is made. |
| pnpm test:database | Exit 0; 8-migration rollback/reapply, connection release/shutdown and pg_dump/psql restore passed; disposable DB removed. |
| First complete pnpm test:e2e | Exit 1; 32 passed, 1 failed. The new recovery test passed, but retained its product fixture, causing the following public-page test to reject duplicate key. Fixed fixture teardown: retire release and remove product/user while retaining immutable release/asset history in the disposable DB. |
| pnpm test:e2e (complete rerun) | Exit 0; 33 passed, 0 failed, 5.6 minutes. Includes ordinary multipart/worker/bilingual redirect, positive busy/lost-response recovery, successful publication and the following public-page test. Disposable database removed. The later narrow helper-text contrast adjustment receives a final focused run separately. |
| pnpm test:seo | Exit 0; indexed build, one HTTP SEO test passed (29.3 seconds), normal build restored. No working content/indexing preference was changed. |
| pnpm build; pnpm test:e2e downloads.spec.ts phase06-review.spec.ts (final) | Both exit 0; final application build and 2 browser tests passed (51.2 seconds). Final recovery test obtains an actual 409/code=busy from a temporary token-owned DB lease, checks the explicit retry message, then injects loss of a successful completion response. Exactly one begin/part, no duplicate, native reset, verified publication and light/dark contrast pass. Disposable DB removed. |
| Working DB backup; pnpm db:migrate; pnpm db:status | Exit 0; .tools/backups/phase06-before-candidate-selection-20261028.sql, 1,649,941 bytes. Backup stays ignored; contents/secrets not printed. Candidate selection migration applied; all eight migrations show Ran=Yes. |
| git diff --check | Exit 0; existing CRLF normalization notices only. |

## Changed files / modules

- Upload controls and JSON API: src/components/admin/installer-upload.tsx; src/app/(payload)/api/installers/route.ts; src/services/downloads/{errors,workflow}.ts.
- Candidate selection and projection: src/collections/OperationalModels.ts; src/styles/admin.css; src/services/downloads/{guards,public}.ts; generated src/payload-types.ts; src/migrations/20261028_125152_phase06_candidate_selection.{ts,json}; src/migrations/index.ts.
- Dependency and CI: package.json; pnpm-lock.yaml; patches/deepmerge@4.3.1.patch; scripts/audit-policy.ts; .github/workflows/ci.yml.
- Tests: tests/unit/{deepmerge-security,audit-policy}.test.ts; tests/integration/downloads.ts; tests/e2e/phase06-review.spec.ts; documentation/screenshots/phase-06-remediated-{admin-375,retry}.png. Ordinary download checks refresh their four existing ID/EN screenshots.
- Docs: this report, DEPENDENCY-SECURITY.md, PHASE-06-DOWNLOADS.md, 04-CMS-CONTENT-MODEL.md, 09-DEPLOYMENT-OPERATIONS.md, CHANGELOG.md, README.md, roadmap, decision register and historical review/evaluation pointers. Other dirty Phase 05/06 files are pre-existing work.

## Screens, routes and manual inspection

Chromium exercised the native release admin at 375/1280, both public download locales at 375/1280, direct multipart bytes/verification/redirect/retirement and failure recovery. The mobile document remains width375; uploader and file control stay inside it. Inspected the saved admin screenshot visually: the candidate selector and instructions fit, fields are labelled and no horizontal overflow appears. Scoped instruction contrast was measured in both themes; historical review screenshots are kept separately. The enabled-indexing test exercises localized detail routes, sitemap, robots and sensitive/draft paths. No real provider upload, real installer execution, screen-reader audit, deployment, real SMTP delivery, commit or push was performed.

## Security, localization, accessibility, responsive, performance and SEO

Status remains exact-origin, bounded JSON, rate-limited and active-Super-Admin-only, with upload-owner isolation. It returns only asset ID/state/release/expiry. Busy/expiry have structured codes without storage details. Candidate filtering in the UI is backed by server validation, not trusted for authorization. No secrets, local installer files or customer identifiers are introduced. Private object versions and immutable verification state are preserved; operational bucket protections and credentials remain untested external gates.

New admin text remains visibly marked as unreviewed sample copy; no fabricated translation or legal identity is introduced. Published release notes still require reviewed ID and EN with no fallback. Public locale/SEO behavior is unchanged. Upload controls retain labels, fieldset semantics, progress and polite status feedback; successful recovery clears both native and React selection. The visual review found muted candidate instructions; a scoped theme-aware color rule fixes that new helper text and final contrast/width checks pass. No screen-reader/WCAG certification or p75 performance claim is inferred. Status performs a bounded metadata lookup; no binary response or new public cache is introduced. Public download responses retain no-store/noindex and a short signed redirect.

## Open issues, required gates and next scope

| Severity / scope | Remaining item, reproducibility and owner | Required disposition |
|---|---|---|
| BLOCKER — live activation only | No supplied real provider/bucket credentials/policies or worker supervision evidence. Local HTTPS fixture does not enforce real IAM/signatures. Owner: operations. | Supply and test private versioning, least-privilege IAM, scoped upload/CORS, lifecycle, anonymous signed delivery, outages and supervised verification in the chosen environment. |
| BLOCKER — live activation only | No approved real Windows/macOS artifacts/architecture matrix, signing/notarization or real install results. Owner: release/build. | Supply approved build provenance and verify exact bytes/hash/signatures and supported OS installation before exposing real releases. |
| HIGH — launch approval | Production translation/content/legal identity, asset licensing and hosting approvals remain TBD. Owner: product/legal/operations. | Review and publish authorized ID/EN content and required real legal information; do not invent placeholders as facts. |
| LOW — dependency maintenance, mitigated locally | Raw registry audit still reports GHSA-gcqx-w48m-w2h4 at deepmerge 4.3.1. Reproduce with pnpm audit --audit-level low; verify mitigation with pnpm audit:policy. Owner: dependency maintainer. | Keep fingerprint/security tests and fail-closed policy mandatory; track and adopt a compatible verified upstream fix when available. No unmitigated finding is accepted by the policy. |

No next phase is advanced by this report. Local code/test remediation is complete; live gates above remain mandatory before activation. Contact mailbox/SMTP activation remains separately deferred and unchanged. The observed pg@8 concurrent-query deprecation warning is a future pg@9 compatibility concern, not a passing pg@9 test or a demonstrated current failure; retain the existing version pin and investigate before a major upgrade.

Doc drift/changelog: retry no longer reuploads every confirmed part or discards every 409; stale selected-file UI is fixed; duplicate verified candidates can be selected for publication without a new release/deletion; the migration count is eight overall; audit policy reports a local mitigation instead of claiming a clean raw advisory result. Historical 27/28 October review evidence is retained as historical, not rewritten as current success. Recommended next scope is external Phase 06 activation verification when approved real inputs are available, not automatic Phase 07 or future commercial features.
