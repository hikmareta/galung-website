# Fresh Phase 06 review — 28 October 2026

**Historical review:** user-authorized remediation and current evidence are in [PHASE-06-CLOSURE.md](PHASE-06-CLOSURE.md): local implementation PASS, P06-R1/R2 fixed and P06-R3 locally mitigated; live activation remains PARTIAL. The original defect reproduction and command results below are retained unchanged as historical evidence.

**Original verdict: PARTIAL.** This review supersedes the local PASS conclusion in PHASE-06-EVALUATION.md. The ordinary download path passes, but a reproduced retry/replacement defect prevents reliable release publication after a lost completion response. A smaller file-input state defect and a current dependency-advisory failure also remain. No BLOCKER or HIGH application-security bypass was reproduced. Real storage and real installer activation remain separately unverified.

This is evaluation work, not remediation or authorization for Phase 07. No application logic, dependency versions, database schema, production configuration or working data was changed. No real uploads, mail delivery, deployment, commit or push occurred.

## Scope, reviewed inputs and architecture

Reviewed AGENTS.md, README.md, documentation/01–10 (download/security/UI/routing requirements), DECISIONS-AND-OPEN-QUESTIONS.md, PHASE-06-DOWNLOADS.md, PHASE-06-EVALUATION.md, and prompts/90-PHASE-EVALUATION.md. Read the installed Next route-handler guide before adding review tests. Inspected actual working files and Git diffs; the working tree still contains the pre-existing Phase 05 and Phase 06 work, so the entire diff must not be attributed to this review.

Phase 06 modules inspected:

- src/services/downloads/{guards,public,storage,validation,workflow}.ts: internal mutation capability, publication snapshot, scoped multipart state, renewable database lease, format/size/hash verification and public projection/target.
- src/collections/OperationalModels.ts; src/access/admin.ts; src/hooks/editorial.ts; src/payload.config.ts: private collections, active Super Admin gate, audit/revalidation, PostgreSQL adapter and no schema push.
- src/app/(payload)/api/installers/route.ts and api/downloads/[id]/route.ts: same-origin/authenticated JSON controls, persistent counters, bounded bodies, no-store/noindex and empty redirects.
- src/components/admin/installer-upload.tsx, website/download-center.tsx and public-page.tsx; content/public.ts; scripts/verify-installers.ts; migration source/registry; generated type/import-map integration; package.json/pnpm-lock.yaml, .env.example, CI and test runner.
- Unit download/signature tests, integration/downloads.ts, e2e/downloads.spec.ts and the local HTTPS storage fixture. The fixture does not enforce real S3 signatures, IAM or bucket policy; its success cannot certify a real provider.

Architectural alignment is sound: TypeScript/Next/Payload/PostgreSQL modular monolith, no extra ORM, installer bytes uploaded/downloaded directly to storage, bounded-memory verification in a separate operator process, private immutable asset metadata, and explicit reviewed locale/asset publication. Storage remains replaceable through InstallerStorage, but the implemented adapter requires versioned S3 semantics and does not support every S3-compatible provider. No future commercial or customer-account scope was introduced.

## Acceptance matrix

| Requirement / scope | Status | Fresh evidence and limits |
|---|---|---|
| Direct scoped multipart upload | PASS locally | SDK signer unit test checks key/upload/part/content-length/expiry; browser uploads an 8 MiB-plus Windows fixture in multiple parts directly to separate HTTPS storage |
| Phase 06 gate: no installer bytes through app endpoints | PASS locally | Browser asserts no oversized app upload; download response is an empty 302; source shows binary read only in verification worker |
| AT-05 anonymous Windows download | PARTIAL | Anonymous fixture redirect and downloaded hash pass; no real Windows installer or provider tested |
| AT-06 macOS selection/metadata/hash/locales | PARTIAL | Correct macOS fixture, notes and checksums render in ID/EN at 375/1280; no real macOS package installation tested |
| AT-07 / CMS-01 access and unverified activation | PASS locally | Anonymous/editor/publisher denied, asset writes guarded, missing verified OS and missing EN notes rejected server-side |
| AT-09 checksum/file rejection | PASS locally | Stored-byte SHA-256/size/signature checks and mismatched checksum/private failure state pass; these are integrity/format checks, not signing or malware certification |
| Drafts, reviewed publication snapshot and retirement | PASS locally | Focused integration proves no pre-publication exposure, late verified assets excluded, retired target unavailable and audit records present |
| Admin retry/replacement/error flow (doc 06, CMS-05) | FAIL | P06-R1: lost completion response followed by Retry/replacement creates duplicate verified variants and blocks publication |
| Selected-file UI consistency | FAIL | P06-R2: after success the native file input still holds a file while React state disables Upload |
| Responsive layout | PASS for measured views | Public ID/EN cards at 375/1280 pass; new admin screenshot at 375 has document width 375, uploader right edge 359 and file-control right edge 295 |
| Accessibility | PARTIAL | Native labeled controls, progress/status, wrapping checksums and standard focus styling inspected; no fresh complete keyboard, screen-reader, contrast or WCAG 2.2 AA audit |
| SEO | PARTIAL | Published CMS route and locale metadata wiring/noindex/no-store inspected; no fresh indexed-production test:seo run |
| Dependency advisory gate | FAIL | Fresh production audit exits 1: one LOW deepmerge advisory through Payload; no known fixed version listed |
| Fresh migration application | PASS | Both isolated runners successfully apply all seven migrations; this review does not repeat rollback/restore |
| Real IAM/CORS/versioning/lifecycle, signed builds, OS installation | NOT TESTED | Provider credentials, approved architectures and actual artifacts remain absent/TBD |
| Load/CWV/CDN performance, production rollback | NOT TESTED | No new measurements or provider environment; previous phase evidence is historical only |

## Findings and reproductions

### P06-R1 — MEDIUM: completion-response loss becomes an unrecoverable duplicate release variant

References: installer-upload.tsx:27–30, 40–68; workflow.ts uploadAction completed-state branch; guards.ts:65–74; OperationalModels.ts ReleaseAssets access.

Reproduced in tests/e2e/phase06-review.spec.ts against the real app and SDK with isolated storage/database:

1. Upload Windows successfully. Let POST action=complete reach the app and return 200, then replace only the response delivered to the browser with 503. The private asset is already uploaded.
2. Click Retry upload. The component starts the part loop again instead of retrying the idempotent complete action. The part endpoint returns 409 because the asset is uploaded; call() discards the session on every 409.
3. The UI now offers a new upload while the original remains uploaded. Follow that replacement flow, upload macOS, and run the actual verification function for all uploaded records, as the batch CLI does.
4. Two Windows assets become verified. Complete both locale notes and publish: the guard rejects duplicate OS/architecture. Asset update/delete is intentionally unavailable through CMS, so the release cannot be repaired through its ordinary interface.

This is different from the already documented storage-completed/DB-write-lost orphan case: here the database successfully recorded completion and the server already supports idempotent completion replay. The client does not use it. A green ordinary upload test did not cover this boundary.

Required remediation: retain upload stage/identity across ambiguous responses; when all parts were sent, retry completion or query authenticated status before requesting/replacing parts. Distinguish retryable busy 409 from terminal/expired states. Provide a controlled, audited way to supersede/exclude duplicate candidates without mutating a verified binary or requiring a fabricated new software version. Convert this reproduction into an acceptance assertion that recovery keeps one eligible variant and allows publication.

Owner: engineering. Required before local Phase 06 closure.

### P06-R2 — LOW: native file selection is not reset after success

Reference: src/components/admin/installer-upload.tsx:68–70 and file input at lines 140–151.

The same browser probe observes input.files.length=1 after successful completion, while Upload is disabled because setFile(null) cleared only React state. Valid OS/architecture/hash remain populated. The control therefore displays a selected file that the component no longer considers selected. The probe establishes this visible/state mismatch; it does not claim a tested native file-picker reselection sequence.

Remediation: clear the native input through a ref/reset/key when clearing file state, and verify consistent selection/disabled state after success and replacement. Owner: engineering/UX.

### P06-R3 — LOW security advisory, currently failing CI policy

References: pnpm-lock.yaml deepmerge@4.3.1; package path payload > deepmerge; .github/workflows/ci.yml runs pnpm audit --audit-level low.

Fresh `pnpm audit --prod --audit-level low` reports one LOW issue and exits 1. [GHSA-gcqx-w48m-w2h4 / CVE-2026-93753](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) covers deepmerge 4.2.0–4.3.1, with no patched version listed when checked. The advisory concerns attacker-controlled merge inputs altering a returned object's prototype. This review confirms the installed dependency/advisory, not application exploitability or a global prototype-pollution exploit.

The 27 October zero-advisory result remains historical evidence, not a current assurance. This dependency arrives through Payload, not the newly added S3 SDK. Do not blindly choose an invented patch version, suppress the advisory or add a broad override. Assess reachable merge inputs and follow upstream/compatible mitigation, with bounded tests and an explicit risk disposition if a fix remains unavailable. Owner: engineering/dependency security; disposition required for the failing advisory gate before closure.

### Existing activation gates — HIGH importance, not newly reproduced code vulnerabilities

Storage/hosting owner must verify a real private versioned bucket, least-privilege IAM, CORS, incomplete-upload cleanup and worker operations. Build owner must supply approved architectures and real signed/notarized artifacts and verify supported OS installation. Content owner must review UI sample copy and CMS download publications. These remain open; this review did not activate any of them.

## Security, localization, UI and performance assessment

No anonymous release mutation, draft/key leak or unverified public download was reproduced. Server-side active-admin checks, exact Origin, bounded JSON and persistent counters remain in place. The HTTP public target checks the current published stable snapshot and versioned storage size, then signs a short-lived attachment response. Existing signed links can remain usable for up to 60 seconds after retirement; immediate revocation is not promised.

Release notes are localized with no fallback and reviewed in both locales. New interface labels are explicitly unreviewed samples. Public cards and mobile admin layout passed measured width checks. The retry and stale-selection findings are actual UI/state issues, not translation failures. Formal assistive-technology and touch-target review remains untested.

Verification streams hash/count data without retaining the installer; format signatures do not prove signing, authenticity, malware safety or actual architecture. The public selector scans up to 100 active releases and performs per-release asset queries (up to 200 each); this is a documented scaling risk rather than measured production performance. Worker batches are limited to 100 uploaded records; pagination/backoff/operational monitoring still need production assessment. No new throughput or CWV claim is made.

## Commands executed and raw results

Used ignored project Node 24.22.1 / pnpm 10.34.9, with `.tools/node_modules/node/bin` and `.tools/node_modules/.bin` on PATH. Shorthand pnpm invokes the local pinned runtime. Tests use randomly named disposable databases and local HTTPS storage, then remove their own fixtures.

| Command | Actual result in this review |
|---|---|
| git status --short; git diff -- scoped modules; rg/Get-Content source/docs/config | Inspected current dirty tree, implementation and relevant diffs; no production changes |
| pnpm lint | Exit 0 both initially and after final review-probe formatting |
| pnpm typecheck | Exit 0 initially and after adding review probe |
| pnpm format:check | Initial baseline exit 0; one intermediate check exit 1 on the new review test; corrected with Prettier and final check exit 0 |
| pnpm test | Exit 0; 24 passed, zero failed |
| pnpm build | Exit 0; new installer/download APIs and dynamic locale routes present |
| pnpm test:integration downloads | Exit 0; RBAC, owner/expiry/parts, concurrency/lease replay, checksum, outage, locales, late-upload snapshot, retirement and audit checks pass; isolated DB removed |
| pnpm test:e2e downloads.spec.ts phase06-review.spec.ts | Exit 0; 2 passed in 59.0s: ordinary acceptance 33.9s, adversarial review 18.5s. The second test asserts observed defects; its PASS means reproduction succeeded, not that recovery acceptance passed |
| pnpm audit --prod --audit-level low | Exit 1; 1 vulnerability, severity LOW, deepmerge through Payload, no patched version supplied by advisory |
| git diff --check | Exit 0; only existing CRLF normalization warnings |

Fresh tests applied all seven migrations in isolated databases. Full integration, full browser suite, rollback/reapply/restore, indexed-production SEO, real provider and OS-install tests were **not rerun**; the 27 October 24-unit/full-integration/32-browser/restore figures in the earlier report are historical and are not counted as fresh review execution.

Screens inspected: documentation/screenshots/phase-06-review-admin-375.png. Evidence also includes phase-06-review-completion-retry.png and the refreshed ordinary ID/EN screenshots. Mobile dimensions: viewport/document=375, uploader width=343 at x=16, file control right edge=295. No horizontal overflow was found. No broad accessibility certification is inferred.

## Review files and documentation/changelog

Added only tests/e2e/phase06-review.spec.ts, this report and two review screenshots. The ordinary browser run refreshes its four existing Phase 06 screenshots. README.md, PHASE-06-EVALUATION.md, PHASE-06-DOWNLOADS.md, roadmap and decision register are updated with pointers/current PARTIAL status while preserving the original command history. No app fix, new migration or dependency update is included.

Doc drift corrected: the earlier local PASS did not cover completion-response loss; the orphan runbook did not distinguish successful DB completion from DB-write loss; the old clean advisory result is time-specific. Architecture restrictions and external production gates remain unchanged. No new business approval is inferred.

## Required next scope

1. Remediate P06-R1 and preserve immutable verified files/audit history while making retry and candidate selection recoverable. Add acceptance tests for lost responses, busy leases and subsequent publication.
2. Fix P06-R2 and validate native selection state after upload/replacement.
3. Triage P06-R3 and resolve or explicitly disposition the advisory/CI failure with evidence; rerun relevant checks after any compatible fix.
4. Reevaluate Phase 06 technical closure. Separately verify real storage/build/content activation gates with their owners.

Recommended next work is **Phase 06 remediation**, not automatic Phase 07 or deployment. No Basic/Pro, pricing, payments, licensing or customer accounts were introduced.
