# Fresh Phase 02 review — 26 October 2026

Historical review. Its findings were subsequently remediated; current status and
new regression evidence are in `PHASE-02-CLOSURE.md`. The original reproduction
results below are retained to explain the fixes, not as current defect claims.

**Verdict: PARTIAL.** The implemented foundation builds and its existing tests
pass on an empty local database. A fresh review reproduces a password policy gap
and a normal-local-state test failure; the repository/lockfile is still uncommitted.
These findings supersede the initial PASS verdict. No Phase 03 work was started.

No BLOCKER or HIGH finding was reproduced for the present local-only setup. The
MEDIUM findings R01–R04 below must be addressed before declaring Phase 02 complete.
This is an evaluation, not remediation: application source/tests were left unchanged.

## Review scope and sources

Reviewed `AGENTS.md`, `README.md`, numbered docs 02, 03, 04, 06, 07, 08 and 10,
`DECISIONS-AND-OPEN-QUESTIONS.md`, the Phase 02 runbook and initial evaluation.
Also inspected package/lockfile, TypeScript/lint/PostCSS/Next/Playwright config,
Compose/environment examples, CI workflow, user collection/access/environment
helpers, bootstrap script, locale pages/layouts, unit/integration/browser tests,
generated migration/index, and the installed Payload create/reset/login operations.
The original implementation inventory remains in `PHASE-02-EVALUATION.md`.

Planned and delivered scope: source review, rerun available foundation checks,
targeted disposable-account probes, current acceptance/risk matrix and documentation
corrections. Assumptions: existing ignored local environment and PostgreSQL are
development-only; no real user account is modified; no production service exists.
Acceptance: report actual exits/observations, preserve source behavior, clean up all
review accounts, distinguish deferred product requirements from foundation defects.

## 1. Scope / acceptance matrix

| Requirement | Status | Current evidence |
|---|---|---|
| Compatible pinned Next/Payload/React/Node foundation | PASS | Installed Payload 3.92.0, Next 16.4.3, React 19.2.6; local Node 24.22.1/pnpm 10.34.9; fresh build succeeds. Official metadata evidence retained in runbook; no new latest-version claim |
| App Router, Tailwind, strict TypeScript, native Payload PostgreSQL adapter | PASS | Configuration and modules inspected; typecheck/build successful |
| Lockfile present and repeatable installation | PASS | pnpm install --frozen-lockfile succeeds without resolution changes |
| Commit lockfile / initialize tracked baseline (AGENTS engineering rule) | PARTIAL | All supplied/new files are untracked; git log reports no commits. A lockfile exists but is not committed |
| Local PostgreSQL / migration status | PASS | Migration 20261026_014426, batch 1, Ran Yes; queries and auth tests work |
| Clean-database migration, rollback, backup/restore rerun | NOT TESTED | This review inspected SQL and existing migration status; did not recreate/rollback the database |
| Env example and secret exclusion | PASS | Placeholders in example; .env and ignored review probe excluded by Git; validation helper tests pass |
| Anonymous users cannot create/read users or self-bootstrap | PASS | Existing integration/browser checks pass on an empty DB; first-register returns 403 |
| Active admin login/logout, inactive account denial, five-attempt lockout | PASS | Existing DB/browser tests pass; browser checks HttpOnly and SameSite=Lax |
| Stated password minimum across auth flows | FAIL | R01 probe: normal update rejects eight characters; reset with valid token accepts them; login then succeeds |
| Repeatable local browser checks after first admin setup | FAIL | R02: same empty-database test exits 1 with a disposable existing admin; normal empty-DB suite passes |
| Repeat-bootstrap rejection test reliably distinguishes process failures | PARTIAL | R03 assertion accepts null timeout status as nonzero; no explicit error/signal assertion |
| Lint/format/type/unit/build baseline | PASS | Fresh rerun succeeds; 3 unit tests pass |
| CI skeleton | PASS | Workflow has isolated Postgres and check/build/browser steps; source reviewed |
| Hosted CI execution | NOT TESTED | No remote/hosted run evidence; no success claimed |
| AT-01 locale homepage | PARTIAL | / redirects /id; id/en document language and sample labels tested; published CMS homepage/navigation absent |
| AT-02, AT-03, AT-04 content lifecycle | NOT TESTED | No pages/posts/projects, versions or publish flow yet; user access tests do not prove draft isolation |
| AT-05, AT-06, AT-07, AT-09 downloads | NOT TESTED | Installer pipeline absent, correctly deferred to Phase 06 |
| AT-08 legal/company audit; AT-10 contact | NOT TESTED | No company/contact/audit collections or form; no invented facts |
| AT-11 SEO | PARTIAL | noindex configuration and API header test; canonical/hreflang/sitemap/approved localized metadata absent |
| AT-12 mobile keyboard / ordering | NOT TESTED | Final header and editor-order controls absent; no mobile keyboard/a11y audit in this review |
| No future commercial features | PASS | Inspected application only has foundation pages, admin and API; no payment/customer/edition features |

## 2. Modules and architectural alignment

Implementation modules inspected:

| Area | Files / alignment |
|---|---|
| Runtime and dependencies | package.json, pnpm-lock.yaml, .node-version, .npmrc; exact direct pins and patched DOMPurify override |
| App and CSS | src/app/(entry), src/app/(website)/[locale], src/styles/globals.css; locale samples and minimal shell |
| CMS transport | src/app/(payload) layout, admin page/importMap, api route; follows Payload integration shape |
| Access and config | src/collections/Users.ts, src/access/admin.ts, src/payload.config.ts, src/lib/env.ts; server-side boundaries and default-disabled email/GraphQL |
| Database | compose.yaml, src/migrations/*, generated payload-types.ts; native adapter, explicit migrations, no extra ORM |
| Operator/tests | scripts/create-admin.ts, tests/unit, tests/integration, tests/e2e, playwright.config.ts |
| Automation | .github/workflows/ci.yml; no deployment job |

The modular monolith and scope restrictions are respected. Content blocks, public
CMS queries, storage/download services and publishing revalidation are absent at
this phase, rather than partially implemented. Minimal Super Admin-only accounts
are documented; granular editorial RBAC belongs to Phase 04.

There is no tracked baseline from which to produce a meaningful Git diff:
`git diff --stat` is empty because files are untracked. This review therefore
inspected actual file contents; an empty diff is not evidence of no changes.

This review changed only README.md, CHANGELOG.md, documentation/PHASE-02-EVALUATION.md,
PHASE-02-FOUNDATION.md, 08-DEVELOPMENT-ROADMAP.md, DECISIONS-AND-OPEN-QUESTIONS.md,
and this new report. An ignored .tools/phase02-review-probe.ts was used for targeted
verification. No application/schema/test source was changed during evaluation.

## 3. Fresh commands and raw result summary

Executed from the repository root. Command shells used the ignored local Node/pnpm
PATH. This table lists reruns in this evaluation; previous setup/package-generation
and preview checks remain historical and are not claimed as rerun here.

| Command | Actual outcome |
|---|---|
| git status --short | All source/baseline files untracked (??) |
| git log -1 --oneline | Fails: current branch master has no commits |
| git diff --stat / git diff --check | No tracked diff / whitespace errors; limited by untracked state |
| pnpm format:check | Exit 0; All matched files use Prettier code style |
| pnpm lint | Exit 0; no reported warnings/errors |
| pnpm typecheck | Exit 0 |
| pnpm test | 3 pass, 0 fail, 0 skip |
| pnpm build | Exit 0; compiled in 18.7s, TypeScript 10.0s, 3 static pages generated; app routes /, /[locale], /admin/[[...segments]], /api/[...slug] |
| pnpm install --frozen-lockfile | Exit 0; lockfile up to date, resolution skipped |
| pnpm db:status | 20261026_014426, batch 1, Ran Yes |
| pnpm test:integration | Prints PASS for operator bootstrap/repeat refusal and read/create/admin/inactive/lockout assertions; exits 0. R03 limits rejection-test evidence |
| pnpm audit --prod --audit-level high | One moderate vulnerability, zero high/critical; command succeeds at high threshold |
| pnpm test:e2e (empty users table) | 3 passed in 12.2s, exit 0 |
| pnpm exec tsx --env-file=.env .tools/phase02-review-probe.ts | Exit 0 after observing the defects below and cleaning fixtures; this is a diagnostic success, not a passing password-policy assertion |
| Same browser bootstrap test with one disposable existing admin | Exit 1, not timed out; fails expectation for Operator setup required heading |
| PostgreSQL SELECT COUNT(*) AS users_remaining FROM users | 0 after integration and final diagnostic cleanup |
| git check-ignore .env .tools/phase02-review-probe.ts | Both ignored paths returned |

Diagnostic output (no tokens/passwords printed):

```json
{"ordinaryWriteRejected":true,"resetAcceptedEightCharacters":true,"loginAcceptedEightCharacters":true}
{"existingAdminBrowserTestStatus":1,"timedOut":false,"expectedSetupHeadingFailure":true}
```

The ordinary suite's green results remain valid for its tested state. They do not
override the new failing policy/state probes. No deployment, fresh install on a
second platform, hosted CI, rollback rehearsal, accessibility or performance audit
was executed.

## 4. Ranked issues and reproduction

### R01 — MEDIUM: reset bypasses the documented password minimum

Owner: engineering/auth. `src/collections/Users.ts:26–38` checks length in
beforeChange. The installed Payload resetPassword operation hashes/writes the new
password directly and does not call that hook. Disabling email delivery does not
disable reset-password itself.

Reproduction using a disposable local fixture:
1. Create an active admin through trusted Local API bootstrap context with a strong password.
2. Ordinary payload.update with an eight-character password is rejected.
3. Set a random resetPasswordToken and future resetPasswordExpiration through trusted Local API.
4. Call payload.resetPassword with that token and the eight-character password.
5. Observe a returned token and successful subsequent login with that password; delete the fixture.

This needs a valid token; it is not an anonymous account takeover demonstration.
The present email-disabled setup limits token acquisition. The defect still
contradicts the stated auth baseline and must be fixed before enabling recovery.
Enforce the rule on reset as well as create/update, and add regression tests for
short-password rejection, valid reset, expired tokens and inactive accounts.

### R02 — MEDIUM: browser suite fails after normal admin initialization

Owner: engineering/tests. `tests/e2e/foundation.spec.ts:16–23` assumes no users
exist and always expects the operator setup screen. The runbook directs the
operator to create an administrator before using the app; in that normal state
Payload correctly shows login and the test fails.

Reproduction: create one disposable admin, run
`pnpm test:e2e -- -g empty-database` (or Playwright's equivalent filter), observe
heading expectation failure. The review used the Playwright CLI filter directly:
exit 1, no timeout. Do not delete real users to make the test pass. Isolate the
empty-database scenario in a dedicated disposable DB and test the initialized
login state separately.

### R03 — MEDIUM: repeat-bootstrap test can pass on subprocess timeout

Owner: engineering/tests. `tests/integration/auth.ts:50–54` uses
assert.notEqual(run().status, 0). spawnSync can return status null with a timeout,
signal or launch error; null is not zero, so it satisfies the assertion.
This false-positive branch is established by source semantics, not an injected
timeout run. Require no process error/signal, expected nonzero numeric exit, the
specific nonempty-table refusal, and unchanged user count. Also report skipped
bootstrap checks explicitly when pre-existing users cause the block to be skipped.

### R04 — MEDIUM: lockfile/source baseline not committed

Owner: repository owner/engineering. AGENTS requires a committed lockfile. The
lockfile is generated and installable, but git status still lists every file as
untracked and git log has no history. The initial matrix overstated full compliance.
Review the initial staging set and secret/asset exclusions, then commit the intended
baseline and lockfile. This evaluation does not create a commit.

### R05 — MEDIUM: migration-tool dependency advisory remains

Owner: engineering/upstream adapter. Fresh pnpm audit reports one moderate esbuild
advisory GHSA-67mh-4wv8-2f99 in db-postgres -> drizzle-kit -> esbuild-kit -> esbuild.
No high/critical finding in this rerun. Keep migration tooling local and avoid its
vulnerable serve mode; resolve through a supported upstream dependency update.
This is not proof that the application server is exploitable.

### R06 — MEDIUM: production admin hardening remains deferred

Owner: engineering/security, Phase 04/07. MFA strategy, durable user-change audit,
distributed request throttling, configured recovery, production CSP and database
least privilege remain open. Existing password lockout is tested, not a complete
rate-limiting assessment. These are public-exposure blockers, not new UI features.

### R07 — LOW: tooling and verification limitations

Owner: engineering/operations. ESLint 9 is pinned for current peer compatibility
but unsupported; Postgres adapter CLI shutdown uses explicit exit; hosted CI,
rollback/restore and production HTTPS-cookie checks are untested. Playwright's
reuseExistingServer setting can test a stale local server, so run CI or force a
fresh test server for release evidence. The retained .env SITE_INDEXABLE variable
does not enable indexing; it is reserved, as the runbook states.

## 5. Security / i18n / UI / performance / SEO assessment

Security: active Super Admin checks are server-side. Anonymous read/create and
first-register denial, inactive login denial, lockout and login/logout are verified.
Update/delete/unlock HTTP denials, post-deactivation existing sessions, malformed
requests and hostile-origin CSRF behavior were not exercised by the current tests.
No draft schema exists, so no draft-leak protection claim can be made yet. Password
reset is FAIL as described in R01; secure-cookie behavior over actual HTTPS is NOT TESTED.

Localization: ID/EN samples are explicit/unreviewed, default routing deterministic,
unknown locale is 404, document lang changes correctly, and CMS fallback is false.
Both sample routes still share the English foundation metadata title; approved
localized SEO is future Phase 05 work. Article-equivalent switching is unimplemented.

Accessibility/responsive: semantic main/H1, native links and focus styling exist.
The browser suite uses desktop defaults; it does not measure narrow layouts,
keyboard focus, screen-reader output or WCAG 2.2 AA. Fonts/design are correctly
deferred to Phase 03. No visual-reference parity claim is justified at this phase.

Performance: optimized build succeeds. No Lighthouse, bundle budget, load test,
Core Web Vitals or field measurement was performed; performance targets remain
NOT TESTED. SEO: noindex headers/meta are configured; no production sitemap,
canonical/hreflang or approved content exists. No production indexing should be enabled.

## 6. Required remediation and next scope

Before closing Phase 02:
1. Fix R01 across reset/create/update flows and add meaningful auth regression tests.
2. Isolate empty/initialized browser scenarios (R02); make subprocess rejection
   checks fail on timeout/launch errors and explicitly identify skips (R03).
3. Review and commit the intended repo baseline/lockfile (R04).
4. Rerun all foundation checks, including the new regression cases, and update the verdict.

R05–R07 must retain owners and be resolved or explicitly assessed at their
hardening/production gates. Do not introduce Phase 04 CMS workflows simply to
complete this review. Once Phase 02 closes, recommended Phase 03 scope remains
tokens, approved self-hosted fonts, responsive shell and accessible UI primitives.
No phase is advanced by this report.

## 7. Documentation drift and changelog

Corrected README's stale "not an implemented app" statement and exposed current
PARTIAL status. The initial evaluation is retained as historical evidence with a
superseding notice; roadmap, runbook and decision register link the new findings.
CHANGELOG records this review and that behavior was not remediated during evaluation.
The initial report's blanket password-baseline PASS and complete lockfile-compliance
claim must not be used as current acceptance evidence.

Commit-ready review summary: document fresh Phase 02 findings, rerun foundation
checks, reproduce reset-policy and initialized-DB test gaps, and correct gate status.
