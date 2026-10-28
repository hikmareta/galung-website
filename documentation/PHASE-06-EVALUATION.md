# Phase 06 evaluation — 27 October 2026

**Historical implementation evaluation.** Current remediation evidence is in [PHASE-06-CLOSURE.md](PHASE-06-CLOSURE.md): local implementation PASS after R1/R2 fixes and verified R3 mitigation, with live activation still PARTIAL. [The fresh 28 October review](PHASE-06-REVIEW.md) supersedes this report's local PASS conclusion with PARTIAL. It records reproduced recovery/UI findings and a fresh LOW dependency advisory. The executed results below remain the original dated evidence, not current guarantees. No Phase 07 or deployment is authorized by this historical report.

Evaluation follows prompts/90-PHASE-EVALUATION.md against AGENTS.md, roadmap Phase 06, acceptance AT-05/06/07/09, and numbered requirements 01/02/03/04/06/07/09. Scope and operator details: [download runbook](PHASE-06-DOWNLOADS.md).

## Verdict and limits

**Local implementation gate PASS. Live Phase 06 gate PARTIAL.** Final local results are recorded below. No deployment or production-readiness claim. Real provider credentials, IAM/CORS/version/lifecycle behavior, approved build architectures, actual Windows/macOS installers, signing/notarization and installation tests remain unverified. The local S3 protocol fixture is explicitly not a real storage-provider certification. Production activation remains PARTIAL until those external release/storage gates close; no Phase 07 is automatically activated.

## Scope and acceptance matrix

| Criterion | Result | Evidence |
|---|---|---|
| S3-compatible abstraction, scoped direct multipart upload | PASS locally | InstallerStorage interface and pinned AWS SDK; browser fixture uploaded 8,388,639-byte Windows file across two parts and a 30-byte macOS package directly to separate HTTPS storage; no app binary upload request |
| AT-05 anonymous Windows redirect, no installer streaming | PASS locally | HTTP 302 with empty body, no-store, versioned signed storage URL; fetched storage bytes match SHA-256; public API request has no admin login |
| AT-06 macOS, OS/architecture/hash/notes and locales | PASS locally | Both cards/notes/checksums render in ID/EN at 375/1280; worker verifies immutable storage versions; no locale fallback |
| AT-07 sensitive access and unverified publication | PASS in focused integration | Anonymous/editor/publisher denied; direct admin asset writes denied; missing verified OS or EN notes rejects publication |
| AT-09 independent verification | PASS in focused integration | Whole-file streaming SHA-256/byte count and file signature/trailer checks; mismatched digest fails privately; storage outage stays retryable |
| Publication/retirement/audit | PASS in final full integration | Explicit reviewed-asset snapshot; late uploads excluded; retired redirect unavailable; records immutable and private with audit events |
| Upload errors/limits and availability | PASS locally | Owner/part/expiry checks; UI progress/retry/cancel; HTTP oversized JSON 413, origin denial 403, storage outage 503 with localized sample text/Retry-After |
| Migrations and local working DB | PASS | Seven-migration fresh/rollback/reapply, connection cleanup and pg_dump/psql restore; working DB backed up and both additive migrations applied |
| Keyboard/screen-reader/a11y certification | PARTIAL | Native labeled controls/progress/status, focus design tokens, wrapping hashes; responsive screenshots inspected. No screen-reader or WCAG conformance audit claimed |
| Real provider, real signed installers and supported OS install | NOT TESTED | No production provider/bucket credentials or approved installers/architectures supplied |
| Production SEO/performance | PARTIAL | Existing CMS metadata/canonical/hreflang/sitemap; download API noindex/no-store; no field CWV or provider/CDN performance measurements |

## Files created/modified in this phase

- Storage/workflow: src/services/downloads/{storage,validation,guards,workflow,public}.ts.
- HTTP: src/app/(payload)/api/installers/route.ts and api/downloads/[id]/route.ts.
- CMS/admin: src/collections/OperationalModels.ts, src/components/admin/installer-upload.tsx, src/app/(payload)/admin/importMap.js and generated src/payload-types.ts.
- Website: src/components/website/download-center.tsx and public-page.tsx; src/services/content/public.ts adds the download CMS route.
- Database: 20261027_091945_phase06_downloads.{ts,json}, 20261027_092310_phase06_approval_snapshot.{ts,json}, src/migrations/index.ts. Rollback unpublishes releases/resets verification before removing fields.
- Operator/testing: scripts/verify-installers.ts, scripts/run-tests.ts; tests/unit/{downloads,download-storage}.test.ts; tests/integration/downloads.ts; tests/e2e/downloads.spec.ts; tests/helpers/installer-storage.ts; tests/e2e/editorial.spec.ts synchronizes native approval with registered form state; tests/integration/phase04-review.ts adapts previous inactive-model assertions to guarded Phase 06 behavior.
- Configuration/dependencies: .env.example, package.json, pnpm-lock.yaml (AWS client/signing SDKs 3.1157.0).
- Documentation: README.md, documentation/04-CMS-CONTENT-MODEL.md, 09-DEPLOYMENT-OPERATIONS.md, PHASE-04-SCHEMA-MAP.md supersession note, DECISIONS-AND-OPEN-QUESTIONS.md, 08-DEVELOPMENT-ROADMAP.md, PHASE-06-DOWNLOADS.md and this evaluation; screenshots phase-06-{id,en}-{375,1280}.png.

All pre-existing Phase 05 modifications/untracked files were preserved. The complete Git diff contains earlier work and must not be misrepresented as all Phase 06 changes. No commit/push/deployment was performed in this phase.

## Commands and actual results

Commands use ignored local Node 24.22.1 and pnpm 10.34.9 (system Node is older). The browser server also requires .tools/node_modules/.bin on PATH in this environment. The shorthand pnpm corresponds to `.tools/node_modules/node/bin/node.exe .tools/node_modules/pnpm/bin/pnpm.cjs` with the project runtime on PATH.

| Command/check | Actual result |
|---|---|
| Registry pnpm view for both AWS SDK packages; pnpm add --save-exact ...@3.1157.0 | Verified 3.1157.0 for both; install exit 0, lockfile updated |
| payload generate:types; generate:importmap; migrate:create phase06_downloads; migrate:create phase06_approval_snapshot | Exit 0; generated artifacts present |
| pnpm test | Exit 0; 24 tests passed, zero failed, including real SDK URL signer scope/content-length/version/expiry assertions |
| pnpm lint; pnpm typecheck; pnpm format:check | Final exit 0 for all three after lease, error-state and UI review corrections |
| pnpm test:integration downloads | First exit 1 reproduced missing EN notes incorrectly accepted; fixed locale-bound request reuse. Rerun exit 0 for focused suite before final lease refinement |
| pnpm test:integration | First exit 1 at existing auth.ts bootstrap subprocess timeout under concurrent checks; never counted as pass. Final serial rerun exit 0: bootstrap/auth/reset, editorial/RBAC/lifecycle, Phase 04 adversarial, Contact/Phase 05 adversarial and downloads including renewable lease/concurrent completion and late-upload exclusion all passed; isolated DB removed |
| pnpm test:database | Exit 0; seven migrations up/down/up, pool release/destroy, pg_dump/psql restoration passed; isolated DBs removed |
| Working pg_dump; payload migrate; migrate:status | Exit 0; ignored backup .tools/backups/phase06-before-downloads-20261027.sql, 1,695,924 bytes; both Phase 06 migrations applied, all seven Ran=Yes |
| pnpm build | Passed; one overlapping build attempt failed Next build lock, rerun passed. Final post-review build exit 0; both new API routes and existing dynamic locale routes present |
| pnpm test:e2e downloads.spec.ts | First startup failed because system pnpm launcher was selected. Corrected runtime PATH; rerun exit 0, one browser test passed in 45.8s (37.3s test) before lease refinement |
| pnpm test:e2e (complete suite) | Initial final-build run: 31 passed / 1 failed in 6.0m; desktop CMS checkbox reset during hydration before Save. Test now retries the actual checkbox/save action until registered, retaining the database approval assertion. Final rerun exit 0: all 32 passed in 6.4m; both CMS widths and the final download flow passed; isolated database/storage fixtures closed |
| pnpm audit --prod --audit-level low | Exit 0; No known vulnerabilities found; advisory result only |
| git diff --check | Exit 0 at review checkpoint; only CRLF normalization warnings |

Screens manually inspected: phase-06-id-375.png and phase-06-en-1280.png. Cards/hash wrapping were legible with no horizontal overflow; both locales also have automated 375/1280 screenshots. Inspection corrected a primary-button token class. Admin upload exercised actual authenticated Payload editor; direct byte counts checked at storage fixture. Not a screen-reader or real installer smoke test.

## Review findings and remediations

- Resolved HIGH: missing EN notes accepted due to reusing locale-bound Payload request loader. Reproduction: ID-only notes plus both verified OS files, then active publish. Independent child requests now preserve locale isolation; regression rejects it.
- Resolved HIGH: verified late uploads could become public after publication without fresh review. Approved asset IDs are now snapshotted at publish; final integration includes a late-completion exclusion test.
- Resolved MEDIUM: a database connection held for storage IO could exhaust the pool under concurrent workflows. Replaced connection-held advisory locking with token-owned renewable KV leases; overlaps return retryable 409, successful completion replay is idempotent. Final full integration regression passed.
- Resolved MEDIUM: malformed/oversized upload-control JSON was mapped to a misleading 503 storage error. Now 400/413/415 with bounded parsing; browser checks 413.
- Resolved LOW: pre-existing desktop CMS test interacted with native approval before form hydration; retry synchronizes real checkbox/save controls without relaxing DB assertions. Final rerun passed all 32 tests.
- Resolved LOW: render try/catch lint issue, sample download button class, label grouping and long filename wrapping; corrected before final checks.

## Remaining issues, severity and owner

| Severity | Issue / reproduction | Owner / gate |
|---|---|---|
| HIGH, activation only | No chosen/configured real private versioned bucket. Test fixture does not validate provider IAM, CORS or signature enforcement. Configure runbook prerequisites and execute real multipart/retire/outage smoke test | Storage/hosting operator, before real downloads |
| HIGH, release only | Real architecture list, signing/notarization, trusted artifacts and installation behavior remain TBD. DOWNLOAD_ARCHITECTURES is intentionally empty by default | Product/build owner, before release activation |
| MEDIUM | CLI verification scheduling/monitoring, incomplete-upload lifecycle and ambiguous-completion orphan reconciliation need operator setup. Completion-response/DB-write loss remains private and requires replacement/reconciliation | Operations, before live workflow |
| MEDIUM | New ID/EN interface labels are explicitly unreviewed samples; public content and download pages need editorial approval | Content/translation owner, before production publication |
| LOW | Existing issued signed URL remains usable for up to 60s after retirement; no instantaneous revocation guarantee | Release/operations owner; documented behavior |
| LOW | Public catalog scan is bounded at 100 recent active releases / 200 assets each, and duplicate verified OS/architecture variants require a new release | Engineering; paginate before catalog grows to limits |
| LOW | Browser reload loses in-page upload retry state; use replacement session and storage cleanup. Multi-part throughput is sequential | Engineering/UX; optional later improvement |

No known production deployment, WCAG compliance, malware safety or provider compatibility is asserted. Phase 05 Contact stays disabled pending the user's existing external setup. Next concrete scope: provision/verify storage and real builds with owners, then request explicit Phase 07 QA activation.

## Final verification checkpoint

Evaluation completed after inspecting the final implementation, configuration, migration/source diffs and actual results. Final local checks: lint, strict typecheck, format, production build, 24 unit tests, full seven-script integration regression, seven-migration rollback/reapply and backup restore, and 32 browser tests all passed. Final browser run: exit 0, 32 passed in 6.4m. The dedicated download flow passed again in that suite (42.2s). Earlier failures remain recorded above and were not counted as successes. A final post-test lint/type/format and whitespace check confirms the test synchronization edit.

Observed non-failing warnings: existing pg client concurrent-query deprecation and Playwright NO_COLOR/FORCE_COLOR. These are not evidence of a failed check or a blanket security certification. No formatter/test command is missing; the separate indexed-production test:seo command was not rerun in this phase (public metadata/draft boundaries were covered by the full browser suite). No real provider, signing/notarization, OS installation, screen-reader, load or field-performance tests were run.

Commit-ready summary: add guarded immutable installer lifecycle, scoped S3 multipart control, separate SHA-256/format verifier, reviewed two-locale release snapshots and version-pinned anonymous redirects; include tests, migrations, configuration and runbook. Preserve the pre-existing Phase 05 work when preparing a commit. No future editions, pricing, payment, licensing or customer portal code was added.

Next concrete steps: configure a compatible private versioned bucket and worker operations, supply the approved architecture allowlist and signed Windows/macOS builds, execute real-provider multipart/download/retire and installation verification, review interface/CMS content, then obtain explicit Phase 07 authorization. The storage/build owners' activation work keeps the live gate PARTIAL.
