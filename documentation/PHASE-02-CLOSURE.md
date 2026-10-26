# Phase 02 remediation and closure — 26 October 2026

## Gate and scope

**Gate: PASS for the local Phase 02 foundation.** Acceptance checks below pass after remediation. This
report supersedes the original implementation PASS and subsequent PARTIAL review.
Git delivery and successful hosted CI observations are recorded below; no production
readiness, WCAG certification or deployment is claimed. Phase 03 has not started.

Reviewed before changes: AGENTS.md, README.md, documentation/02, 04, 06, 07, 08,
10, decision register, Phase 02 review/runbook, current auth/config/test/CI files
and installed Payload operation/adapter code. Scope was R01–R07 remediation within
the foundation gate, relevant regression tests, reproducible setup, documentation
and user-authorized initial commit/push. Existing product and legal TBDs are unchanged.

## Findings disposition

| Review item | Disposition / evidence |
|---|---|
| R01 password reset bypass | Fixed. Shared policy in src/access/password.ts; beforeOperation validates reset, beforeChange validates ordinary writes. Tests reject short create/update/reset; valid 16-character reset succeeds; expired/replayed token and inactive account fail. HTTP reset is also exercised |
| R02 populated database breaks tests | Fixed. Each suite creates a fresh randomly named DB; dev users are never cleared. Empty and initialized admin screens are tested separately; fresh server/temporary port prevents stale-server evidence |
| R03 timeout mistaken for rejection | Fixed. Exact exit code, no process error/signal, expected refusal text and unchanged count required. Unit cases reject timeout/null/signal/launch errors. No silent bootstrap skip |
| R04 uncommitted lockfile/baseline | Fixed by initial commit 5962ae8, including baseline and pnpm lockfile. User-supplied author identity is local to this repo. Remote verification below |
| R05 moderate esbuild advisory | Fixed by scoped verified esbuild 0.25.12 override; migrations/rollback/reapply pass; full audit reports no known vulnerabilities |
| R06 later production controls | Explicitly assessed and assigned to original Phase 04/07/08 gates in PHASE-02-SECURITY-BOUNDARY.md. No public exposure or false implementation claim |
| R07 unsupported lint / adapter shutdown / operational test gaps | ESLint 10-compatible rule stack installed; adapter lifecycle patch committed via pnpm; no forced-success exit. Migration rollback, actual pg_dump/restore and clean pool shutdown verified. Hosted CI status reported separately |

## Acceptance matrix

| Phase 02 criterion | Status | Evidence |
|---|---|---|
| Compatible Next/Payload/React/Node foundation | PASS | Exact core pins unchanged; clean typecheck and optimized build |
| PostgreSQL local and repeatable migration lifecycle | PASS | Fresh UP, DOWN (no tables remain), reapply, pool-release/destroy assertions |
| Environment example and isolated secrets | PASS | Example placeholders; ignored .env/.tools; no production identity invented |
| Admin auth baseline / reset policy | PASS | DB and HTTP regressions; access/CSRF/inactive-session/login/logout checks |
| Repeatable checks with populated dev DB | PASS | Random disposable DBs and guarded direct test execution; sentinel verification recorded in command results |
| pnpm manifest/lockfile reproducibility | PASS | Frozen installation includes patch hash and scoped overrides |
| Formatting/lint/strict TS/unit/build | PASS | Fresh checks and six unit tests |
| CI skeleton | PASS | Same database/integration/audit/build/browser commands, disposable service, no deployment |
| Hosted CI | PASS | GitHub Actions run 40259752751 completed successfully on Ubuntu for b306ccf; all steps including browser tests succeeded |
| Production hardening / full product AT-01–12 | NOT TESTED / later phases | Boundary assessment defines owners; sample locale/noindex is only partial product evidence |

## Architectural changes and file inventory

Original scaffold/baseline inventory remains in PHASE-02-EVALUATION.md. This
remediation modifies Users hooks, bootstrap script, integration/browser tests,
Playwright and ESLint configs, package/lockfile, CI workflow and .env.example.
New files: src/access/password.ts; scripts/run-tests.ts; tests/helpers/process-result.ts
and isolated-database.ts; tests/unit/process-result.test.ts and isolated-database.test.ts;
tests/integration/auth-regressions.ts and database.ts; the Postgres patch under
patches/; .gitattributes; this report and PHASE-02-SECURITY-BOUNDARY.md.

README, changelog, roadmap, decision register, initial evaluation/review and
foundation runbook now link current evidence and mark superseded verdicts historical.
No content schemas, uploads, installer pipeline, payments or customer portal added.
No new ORM: pg is a test-driver dependency used only for ephemeral database lifecycle.

The pinned Postgres package patch returns its retained health-check connection to
the pool and closes its pool on destroy. The patch is installed by pnpm using a
lockfile hash; lifecycle regression checks fail if it stops applying/working.
Reassess the patch when upgrading Payload; do not copy it blindly to another version.

## Commands and actual results

All application commands use Node 24.22.1 and pnpm 10.34.9. The first interim
typecheck found a captured optional bootstrap value and missing explicit reset
overrideAccess in test calls; both were corrected before final checks.

| Command | Result |
|---|---|
| Official npm version/peer metadata queries | Verified ESLint 10.13.0, @eslint/js 10.0.1, typescript-eslint 8.72.0, modern React/Hooks/Next packages, pg/types 8.23.1 and esbuild 0.25.12 |
| pnpm patch / patch-commit | Recorded @payloadcms/db-postgres@3.92.0 lifecycle fix in patches/ and lockfile |
| pnpm generate:types / generate:importmap | Succeeded; no schema/import drift |
| pnpm lint / typecheck / format:check | Final checks pass without lint warnings |
| pnpm test | Six unit cases pass: existing guards plus subprocess-error and DB-isolation guards |
| pnpm test:integration | Bootstrap/repeat refusal, anonymous access, active/inactive/login/lockout and reset-policy regressions pass; isolated DB removed |
| pnpm test:database | Fresh UP/DOWN/reapply pass; all clients idle after queries; pool ends on destroy; pg_dump/psql restore preserves schema and fixture JSON; both disposable DBs removed |
| pnpm build | Successful optimized compile, typecheck, static generation and traces; app routes unchanged |
| pnpm test:e2e | Four tests pass in 18.5s; fresh app server and isolated DB removed |
| pnpm install --frozen-lockfile | Up to date, no resolution changes |
| pnpm audit --audit-level low | No known vulnerabilities found, full dependency set |
| Existing preview server tests | 10 pass, 0 fail |
| Existing preview generator tests under PowerShell 7 | 5 pass |
| Secret-pattern review | No private-key/PAT/AWS-key match in intended source files; .env, .tools, node_modules and outputs excluded |
| Git identity / remote inspection | Local identity set from user instruction; commits pushed to authorized origin/master; remote b306ccf65df7a55a8b79348f513734368d1b58f9 matched local HEAD at verification |
| Hosted GitHub Actions | Run 40259752751 completed success: frozen install, format/lint/generation/typecheck, six unit tests, database/backup/integration, clean audit, build, Chromium and browser suite all succeeded |
| Existing-development-admin sentinel proof | Both integration and browser suites pass with the sentinel unchanged; fixture removed afterward. Final dev user count 0 and no galung_test databases remain |

Initial staging also exposed trailing whitespace in archived text/notices and
generated migration SQL, despite the code formatter passing (those archives and
generated files are intentionally outside its scope). A follow-up normalizes only
that whitespace; license wording, reference imagery and SQL behavior are preserved.
The final diff whitespace check passes. No successful-check claim is inferred from
an earlier command batch continuing after a failed whitespace check.

The dev-database sentinel proof runs integration/browser suites while a disposable
admin exists in the development DB, verifies it is unchanged, then removes it.
The normal suites themselves never create fixtures in that development DB.

## Screens and risks relevant to this phase

Browser checks: / redirects /id; /en has correct document language; /fr returns404;
empty DB admin setup message; initialized login/logout; anonymous read/create/patch/
delete/unlock and first-register denied; short reset400, valid reset200, replay403;
HttpOnly/SameSite cookie; hostile-origin mutation403; inactive existing session403;
320px no horizontal overflow and keyboard language navigation. These are regression
checks, not a visual design review or full screen-reader/WCAG audit.

Locale copy remains explicitly unreviewed. Public CMS content, canonical/hreflang/
sitemap, design fonts/shell and full AT-01–12 are future phases. Global noindex stays
enabled; misleading unused SITE_INDEXABLE example variable removed. No CWV/Lighthouse
claim. Security hardening beyond the local baseline has concrete owners/gates in
the boundary assessment. Two deprecated transitive esbuild-kit packages remain
upstream migration dependencies, but the patched dependency audit is clean.

## Git delivery and hosted verification

The user explicitly authorized initial commit and push and supplied the Git author.
The intended baseline includes original planning/reference assets, application,
tests, patch, documentation and lockfile. Secrets/local runtimes/test output are
excluded. Remote: https://github.com/hikmareta/galung-website.git.
Initial commit: 5962ae8, authored with the user-provided identity, includes the
lockfile and complete reviewed baseline. Follow-up b306ccf finalizes evidence and
normalizes archived/generated whitespace. Both were pushed successfully to master;
git ls-remote confirmed b306ccf65df7a55a8b79348f513734368d1b58f9 on origin/master.
Local Git status was clean; .env/.tools/node_modules/.next/test-results were absent
from tracked files, and staged secret-value scanning found no local secrets.

Hosted verification: [Foundation checks run 40259752751](https://github.com/hikmareta/galung-website/actions/runs/40259752751)
completed with conclusion success on the exact b306ccf source. This is independent
Ubuntu execution, not an inference from the local Windows run. Documentation-only
follow-ups record that observed outcome without altering tested application behavior.

## Next scope

No unresolved implementation defect from R01–R05 remains after these regression
checks. Git delivery and hosted verification are complete for the tested source.
There is no remaining BLOCKER/HIGH/MEDIUM defect within the Phase 02 gate. The
production obligations in the security-boundary document are later release gates,
not claims of implemented production controls. No phase advances automatically.
Recommended next work, when authorized:
Phase 03 approved tokens/fonts, responsive shell and accessible primitives. Later
security, content lifecycle, download, legal and hosting gates remain unchanged.
