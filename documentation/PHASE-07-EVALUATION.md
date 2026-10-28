# Phase 07 — quality and security hardening

28 October 2026. User explicitly activated Phase 07. This report applies
`prompts/90-PHASE-EVALUATION.md`; it does not activate Phase 08 or deploy anything.
Current gate: **PARTIAL — local regression verified; launch controls open**.

## Scope, dependencies and decisions

Preserve the pre-existing dirty Phase 05/06 work. Review and test the existing
modular Next/Payload/PostgreSQL implementation, not future commercial features.
Use Node 24.22.1 and pnpm 10.34.9 from ignored `.tools/`; the system Node 24.19.0
does not satisfy the project engine. Database checks create random disposable
databases; SMTP/storage fixtures stay local. No live email is authorized.

Reviewed sources: AGENTS.md, README.md, numbered documentation 01 through 10,
DECISIONS-AND-OPEN-QUESTIONS.md, PHASE-06-CLOSURE.md,
PHASE-02-FOUNDATION.md, PHASE-02-SECURITY-BOUNDARY.md and the evaluation prompt.
Implementation review: package/lockfile, next.config.mjs, playwright.config.ts,
CI workflow, scripts/run-tests.ts, verify-seo.ts, audit-policy.ts, Payload config,
Users collection, access/admin.ts, access/editorial.ts, contact security and form,
download guards, public content routing, header, primitives, robots, existing
unit/integration/E2E/SEO suites and public fixture. Read installed Next
`dist/docs/03-architecture/accessibility.md` before the UI change.

Acceptance plan: lint/strict types/format/unit/build; full integration covering
RBAC, lifecycle/localization, contact and downloads; Chromium E2E; enabled-indexing
HTTP SEO; migration rollback/reapply/backup restore. Add pinned axe-core scans
and local performance evidence. Keep unmet manual/external checks explicit.

## Changes in this phase

- `src/components/website/header.tsx`: primary CTA now targets the locale's
  Download route, as required by doc 03, instead of Software.
- `package.json`, `pnpm-lock.yaml`: exact dev-only axe-core 4.14.0 and Lighthouse
  13.6.0. Axe reused the local cache; Lighthouse's registry engine requirement
  (Node >=22.19) was checked against installed Node 24.22.1 before installation.
- `tests/e2e/hardening.spec.ts`: ID/EN mobile home scans with menu closed/open,
  WCAG A/AA tags through 2.2, header and CTA assertions; audit JSON and local
  paint/shift/navigation/resource measurements attached to Playwright results.
- `.github/workflows/ci.yml`: retain browser evidence even on failure.
- `tests/e2e/performance.spec.ts`: mobile Lighthouse lab reports on both locales,
  using a Playwright-launched debugging browser, with raw JSON retained.
- `playwright.config.ts`, `tests/seo/playwright.config.ts`: launch Next directly
  with the executing Node binary rather than an unrelated global pnpm launcher;
  the nested SEO config explicitly uses the repository working directory.
- `src/payload.config.ts`: disable background type generation for isolated test
  databases; explicit CI generation remains. Installed Payload's startup code
  was inspected: each non-production instance otherwise starts a generator
  against the same source file.
- `tests/e2e/editorial.spec.ts`: wait for observable publication (30-second bound)
  and scroll/decode lazy images before asserting their exact natural width.
- This report, README, roadmap, decision register and changelog: current gate,
  actual evidence and remaining work. Earlier dirty files are not attributed to
  this phase. Existing screenshot tests can refresh historical evidence paths.

## Commands and actual results

Commands below use the compatible local runtime and pinned pnpm entrypoint.
Initial bare `pnpm lint/typecheck/format:check/test` could not run because Corepack
could not resolve registry.npmjs.org. Retried with the installed local runtime.
The package-command rows were invoked as
`node .tools/node_modules/pnpm/bin/pnpm.cjs <script>` after prepending
`.tools/node_modules/node/bin` to PATH. Final runner invocations used:

```text
node --import tsx scripts/run-tests.ts integration
node --import tsx scripts/run-tests.ts e2e
node --import tsx scripts/run-tests.ts e2e editorial.spec.ts hardening.spec.ts performance.spec.ts
node --import tsx scripts/verify-seo.ts
node node_modules/eslint/bin/eslint.js src tests scripts playwright.config.ts '*.mjs'
node node_modules/typescript/bin/tsc --noEmit
git diff --check
```

| Command | Observed result |
|---|---|
| pnpm lint | PASS initially and after the new tests |
| pnpm typecheck | PASS initially and after the new tests |
| pnpm format:check | PASS initially and after formatting the new tests/workflow |
| pnpm test | PASS: 30 tests, zero failures/skips |
| pnpm audit:policy | PASS: five patch regressions; raw audit exit 1, one locally mitigated LOW advisory, zero unmitigated; raw audit is NOT clean |
| pnpm add -D -E axe-core@4.14.0 --offline | Restricted attempt failed EPERM at store symlink; retry with existing D:\.pnpm-store succeeded, one package, zero downloads |
| pnpm build | PASS on permitted retry; initial restricted attempt compiled/types passed but failed EPERM generating _not-found output |
| pnpm test:integration | Final clean run PASS: auth/bootstrap/reset/lockout, editorial, Phase 04 adversarial review, contact, Phase 05 adversarial review and downloads; isolated DB removed. Initial EACCES, bootstrap timeout and module-resolution failure during dependency relinking are retained as failed attempts |
| pnpm test:database | PASS: eight migrations forward/down/reapply; empty schema after down; clean connection shutdown; pg_dump/psql restore preserves fixture marker; disposable DBs removed |
| pnpm test:e2e | Initial server-launch failure repaired; full run: 33 passed / 4 failed (9.7m). After repairing two editorial timing assertions and two Lighthouse Windows-launch failures, focused editorial/hardening/performance rerun: 6 passed (2.8m). All 37 distinct cases now have passing evidence across runs; no claim of a single 37/37 run |
| pnpm test:seo | PASS on corrected run (exit 0): 1 indexed HTTP test passed (22.8s), disposable DB removed, normal noindex build restored successfully. First attempt failed at nested-config cwd before HTTP tests and also restored its normal build |

Final explicit lint, strict typecheck and format checks after the test edits
returned exit 0; `git diff --check` returned exit 0 with CRLF normalization
warnings only. No missing package check commands were found. Tests emit the
existing pg@8 concurrent-query deprecation warning (future pg@9 compatibility,
not a pg@9 pass) and harmless NO_COLOR/FORCE_COLOR precedence notices. The
indexed SEO build printed “Compiled with warnings” without a diagnostic body;
its final command status is recorded below, not assumed from that message.

## Acceptance and coverage matrix

Rows identify current execution, including partial results and focused reruns.

| Criteria | Coverage | Current Phase 07 status |
|---|---|---|
| Validation, roles, locale helpers, file signatures, safe rich text | 30 unit tests | PASS |
| AT-01–04: locale routes, drafts, shared blocks, detail publication | editorial/public-page integration and E2E | PASS, including corrected native editor cases at 375/1280 |
| AT-05–07/09: anonymous approved downloads, verification and denied activation | downloads integration/E2E with local storage | PASS, including scoped multipart, concurrent completion, independent checksum/format, outages/retry, anonymous projection/redirect, retirement, expiry and audit |
| AT-08: private company edits/audit | editorial integration | PASS |
| AT-10: contact validation, accessible errors, retention | contact integration/E2E with local TLS sink | PASS, including concurrent/idempotent receipts, post-send DB/audit failure, no-resend recovery and approved EN notice |
| AT-11: canonical/hreflang/sitemap/private noindex | separate enabled-indexing HTTP suite | PASS: real HTTP/browser assertions with indexing enabled, including reciprocal localized detail routes and draft/sensitive exclusions |
| AT-12: keyboard/menu, resizing, native ordering | foundation/design/editorial E2E | PASS locally, including native editor cases at 375/1280 |
| Automated accessibility | new mobile ID/EN home axe scans, menu closed/open | PASS: zero violations in four scans; raw JSON persisted; limited sample scope |
| Performance | local paint/shift/resource evidence and Lighthouse | PASS for producing local baselines; performance target compliance PARTIAL (field data absent, blocking-time opportunity remains) |
| Operational rehearsal | eight migrations, rollback/reapply, pg_dump/psql restored marker | PASS locally |

## Ranked open risks and required disposition

| Severity | Issue / reproduction or evidence | Owner and next action |
|---|---|---|
| HIGH, public-admin launch gate | MFA/recovery integration absent; Users config provides password sessions/lockout, not a second factor. Existing assessment identifies all API/reset paths | Security/operations: select maintained MFA/passkey/IdP after hosting choice; test direct API bypass, enrollment, recovery, revocation, inactive users and existing sessions before exposing admin |
| HIGH, launch hardening | No enforced Content-Security-Policy or deployed cross-instance auth/API abuse limits verified; current headers provide nosniff/frame denial/referrer policy, and account lockout is not a global request limit | Security/operations: configure and test CSP with Payload editor/preview and all Next script paths; verify origin protection and shared ingress limits in staging before public exposure |
| HIGH, launch | Real bucket IAM/CORS/versioning/worker supervision and signed Windows/macOS builds not supplied; local fixture is not real-provider evidence | Operations/release: run the Phase 06 live gates with approved real inputs |
| HIGH, launch | Content/legal identity, translation and hosting approvals remain TBD; Contact mailbox/real SMTP activation deferred | Product/legal/operations: resolve and verify before launch; keep contact disabled until ready |
| MEDIUM | Automated axe samples do not establish complete WCAG 2.2 AA; screen-reader review and cross-browser checks unperformed | QA: NVDA or equivalent, native admin/release/contact workflows and Firefox/WebKit review |
| MEDIUM | Lighthouse simulated mobile total blocking time 357/319ms and ~51KiB unused JS opportunity; fixture excludes production images/content/network and real-user p75/INP | QA/engineering/operations: profile main-thread/JS with representative approved assets on staging and collect eligible field data; do not equate TBT or local timings to INP/Core Web Vitals compliance |
| LOW, mitigated | Registry still flags deepmerge GHSA-gcqx-w48m-w2h4 | Maintainer: retain fail-closed audit/patch tests and adopt a compatible verified upstream fix when available |

No production security/accessibility/performance certification is claimed.
Provider-dependent TLS, Secure cookies, edge limits, secret rotation, least-privilege
DB roles, backup scheduling, monitoring and rollback need staging evidence.
Recommended next work is finishing Phase 07 evidence/remediation and resolving
its gates; no automatic Phase 08, pricing, payment or customer accounts.

## Measurements, screens and manual review

[PHASE-07-MEASUREMENTS.json](PHASE-07-MEASUREMENTS.json) retains exact Lighthouse
13.6.0 results, capture timestamps, transfer sizes and diagnostic opportunities.
One simulated-mobile run per locale on a synthetic published homepage:

| Locale | Performance | Accessibility | Best practices | LCP | CLS | TBT | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|
| ID | 92 | 100 | 100 | 793ms | 0 | 357ms | 213,774 bytes |
| EN | 93 | 100 | 100 | 780ms | 0 | 319ms | 213,066 bytes |

These scores are not thresholds introduced by the product owner. LCP/CLS are
within the numeric targets in these two lab samples; eligible real-user p75 and
INP are unmeasured. Lighthouse also reports unused/legacy JS, render-blocking,
document latency and same-URL redirect diagnostics; reproduce with approved
production assets/ingress before treating those estimates as production impact.

Four axe scans cover ID/EN menu closed/open, WCAG 2 A/AA, 2.1 AA and 2.2 AA tags.
Zero violations. Closed-menu scans each contain two incomplete contrast nodes:
decorative aria-hidden brand/menu glyphs, not the visible text labels. These are
manual-review results rather than auto-passes. Full screen-reader evaluation and
all CMS block/form/admin combinations remain untested.

Raw successful focused-run browser evidence is preserved locally in ignored
`.tools/phase07-browser-evidence/` before SEO can clear test-results; CI uploads
test-results immediately after its browser step. Raw dependency audit remains
`.tools/dependency-audit.json`. No credentials or real visitor records are added.

Browser routes exercised: root redirect, unknown locale, ID/EN published main
pages, localized news/project detail and filters, Contact, Download, private
preview, login/logout and native page/media/release administration. Widths:
320/375/639/640/768/1199/1200/1280/1440 where defined by each existing suite,
including 200% text and spacing overrides, keyboard/Escape/focus and reduced
motion. Refreshed screenshots retain the existing Phase 05/06 filenames.
Visually inspected the refreshed 375px English homepage: readable fixture text,
visible menu focus, fitting sections and legible footer. Also inspected
phase-05-regression-public-id-375.png and phase-06-remediated-admin-375.png:
published shared order/image and installer/candidate controls fit. The admin
timestamp strip is horizontally scrollable by Payload design (confirmed in
installed DocumentControls/index.scss); a static screenshot only shows its
initial segment. Its assistive-technology behavior remains part of manual QA.
No screen-reader,
Firefox/WebKit, real installer execution or production deployment was performed.

Commit-ready summary: fix localized Download CTA; stabilize isolated test startup
and asynchronous editorial assertions; add reproducible axe/Lighthouse evidence
and CI retention; document the measured Phase 07 gate and owned launch risks.
Do not include unrelated pre-existing work merely because it is dirty.

Final post-implementation evaluation: all AT-01–12 have local passing evidence
at their tested boundaries. Phase 07 remains PARTIAL because the ranked launch
security and broader manual/field quality gates above are not closed. The final
SEO wrapper returned exit 0 after restoring the normal build. No deployment,
real-provider activation, commit/push or Phase 08 advancement was performed.
