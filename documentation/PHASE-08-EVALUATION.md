# Phase 08 — evaluation and operational handover status

28 October 2026. Evaluation follows `prompts/90-PHASE-EVALUATION.md` against
AGENTS.md, roadmap Phase 08, doc 10 and the actual implementation/configuration.
**Gate: PARTIAL. Preparation delivered; deployment and operational acceptance
remain unverified. Vercel web + Supabase PostgreSQL selected; no resources provisioned or site deployed.**

## Scope, dependencies and reviewed files

The explicit user request authorizes Phase 08 preparation, comparisons and
handover documents; actual setup is approval-gated. User subsequently selected Vercel web + Supabase PostgreSQL. No approved plans,
credentials, account access, budget or deployment approval was provided. Existing
Phase 07 security/quality launch findings remain open. Preserve all pre-existing
dirty Phase 05–07 changes. Only a minimal Vercel project file was added alongside documentation. No application, package, lockfile, CI or schema changes
are attributed to this phase. No new future product/commercial features. Selected-provider details and compatibility work are in PHASE-08-VERCEL-SUPABASE.md.

Reviewed: AGENTS.md, README.md, numbered docs 01–10,
DECISIONS-AND-OPEN-QUESTIONS.md, PHASE-07-EVALUATION.md,
PHASE-06-DOWNLOADS.md, PHASE-04-SCHEMA-MAP.md, prompts/08-PHASE-08.md,
prompts/90-PHASE-EVALUATION.md; package.json, migration registry, .env.example,
next.config.mjs, .github/workflows/ci.yml, .gitignore, src/payload.config.ts,
src/collections/Media.ts and Users.ts, src/lib/env.ts, robots/sitemap,
scripts/run-tests.ts, verify-installers.ts, contact-retention.ts, Contact SMTP
configuration. Read installed Next deployment and self-hosting guides, including
proxy, build/runtime environment and single/multi-instance cache constraints.
Consulted official provider pricing/runtime/terms and S3 versioning sources linked
in PHASE-08-HOSTING.md; distinguish incomplete dynamic tables from confirmed quotes.
After provider selection, reviewed official Vercel project configuration, Payload
deployment guidance and Supabase pricing/connection/S3 compatibility; inspected
the installed Postgres adapter PoolConfig/schemaName types. These inform the new
target-specific checklist, not a claim of tested Supabase compatibility.

Planned/touched files: new vercel.json, PHASE-08-VERCEL-SUPABASE.md, PHASE-08-HOSTING.md, PHASE-08-RUNBOOK.md,
EDITOR-HANDBOOK.md and this evaluation; small status additions to README.md,
CHANGELOG.md, roadmap, doc 09 and decision register. Existing edits in those files
are retained. Acceptance plan: documentation/link/diff review; available local
format/lint/types/unit/build and isolated operational/regression checks; explicitly
withhold remote acceptance. No tests added for reversible documentation changes.

## Acceptance matrix

Vercel web + Supabase PostgreSQL selection is confirmed. Pro plans remain a
proposal: the two-Micro-project Supabase baseline plus one Vercel baseline is
$55/month before the explicit additions/overages in the selected-provider plan.
No paid plan purchase or final all-in budget is approved. Minimal vercel.json is
locally syntax/setting checked, not a verified hosted configuration.

| Scope / roadmap requirement           | Status                        | Evidence and limits                                                                                                                                                                         |
| ------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commercial hosting/runtime comparison | PASS for decision preparation | Three paid candidates; Hobby exclusion, exact Node requirement, persistence/worker differences, primary links. Account terms acceptance remains TBD                                         |
| Total cost and provider decision      | PARTIAL                       | Two-environment model, traffic/retained versions, egress sensitivity, backup/monitoring/labor/tax categories; dynamic quotes, plans, region, budget and storage/worker selection unresolved |
| Isolated staging/prod setup           | NOT TESTED                    | Detailed variable/resource inventory only; selected providers, but no approved account/plan/region or credentials                                                                           |
| DNS/TLS and origin protection         | NOT TESTED                    | Cutover/renewal/MX preservation/rollback and ingress procedures; no remote change or certificate checks                                                                                     |
| Migrations, backup and rollback       | PARTIAL                       | Executable existing isolated rehearsal plus code-aware paired restore procedure; deployed recovery time, real backups/schedules and rollback not verified                                   |
| Installer storage and workers         | PARTIAL                       | Existing version-pinned adapter/CLI reviewed; IAM/CORS/versioning/signed real builds and supervision need actual provider evidence                                                          |
| Monitoring and incident handover      | PARTIAL                       | Metrics, proposed alerts, redaction, escalation and incident/rollback procedure documented; provider, recipients and alert delivery untested                                                |
| Editor documentation                  | PASS for written guide        | Roles, ID/EN shared order, draft/preview, media approval, publish/version restore, installer retirement, Contact privacy and reporting documented; named staff rehearsal pending            |
| Deployment smoke and launch gate      | NOT TESTED                    | AT-01–12 staging/production checklist and approval record supplied; no deployment performed                                                                                                 |
| Architecture/product alignment        | PASS for documentation scope  | Portable Next/Payload/Postgres, direct installer delivery, separate CMS auth, existing locale/content lifecycle preserved; no new ORM or future commercial features                         |

## Commands and actual results

Commands use `.tools/node_modules/node/bin` prepended to PATH and installed pnpm
entrypoint `node .tools/node_modules/pnpm/bin/pnpm.cjs <script>`. Runtime verified
as v24.22.1. Do not interpret the runbook's example commands as executed actions.

| Executed command                                                                             | Actual result                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get-Location; git status --short; rg --files; targeted Get-Content/rg and git diff --numstat | Repository/docs/config inspection completed; extensive pre-existing dirty tree preserved                                                                                         |
| pnpm lint                                                                                    | PASS, exit 0                                                                                                                                                                     |
| pnpm typecheck                                                                               | PASS, exit 0                                                                                                                                                                     |
| pnpm format:check                                                                            | PASS, exit 0 (configured source/config scope excludes Markdown)                                                                                                                  |
| pnpm test                                                                                    | PASS: 30 tests, zero failures/skips                                                                                                                                              |
| Explicit prettier --check for new handover Markdown                                          | PASS on final explicit check of all five new Markdown files; initial exit 1 corrected by formatting                                                                              |
| pnpm build                                                                                   | PASS, exit 0; optimized build and all seven static outputs completed                                                                                                             |
| node --import tsx scripts/run-tests.ts database                                              | PASS on permitted retry: eight migrations forward/down/reapply, clean shutdown, pg_dump/psql restored fixture, isolated DBs removed; initial EACCES retained                     |
| node --import tsx scripts/run-tests.ts integration                                           | PASS, exit 0: bootstrap/auth/reset/lockout, RBAC/editorial, Phase 04 review, Contact/Phase 05 recovery and downloads; isolated database removed                                  |
| pnpm audit:policy                                                                            | PASS on permitted registry retry: five patch tests, one locally mitigated advisory, zero unmitigated; raw audit exit 1 remains. Initial restricted registry lookup failed closed |
| git diff --check                                                                             | PASS, exit 0; CRLF normalization warnings only                                                                                                                                   |

Focused browser smoke `node --import tsx scripts/run-tests.ts e2e foundation.spec.ts hardening.spec.ts`: PASS, seven tests (1.1 minutes), isolated database removed. Covers ID/EN routing/keyboard language switching, anonymous denial/bootstrap, real admin login/logout/reset policy, mobile layout and four axe menu/locale scans. Full 37-case suite and indexed SEO suite were not rerun for this documentation/configuration change; their historical Phase 07 evidence is not claimed as a fresh result. No live
credentials used, real email sent, real installer uploaded or working DB migrated.
Production commands and DNS/provider changes in the runbook are unexecuted.

Automated screens/routes: `/`, `/id`, `/en`, unknown `/fr`, `/admin/login`,
admin dashboard/users/edit and denied user APIs. Foundation tests refresh existing
`documentation/screenshots/phase-05-admin-login.png`, `phase-05-admin-375.png`,
`phase-05-admin-768.png`, `phase-05-admin-1440.png`, `phase-05-admin-users.png`
and `phase-05-admin-edit.png`; these are test evidence, not new UI implementation.
No new manual screen-reader, production screen inspection or real installer
execution was performed. The new documents' relative Markdown links were
checked with PowerShell and all resolved.

Final additional checks: node-based Vercel JSON/settings validation, relative
Markdown link resolution across all five new documents, historical changelog
preservation and repaired-text checks all PASS. Final `pnpm format:check`, explicit
Markdown formatting check and `git diff --check` PASS (normalization warnings only).
No available package check command was missing. Full E2E/SEO were deliberately not
repeated; no staged/provider smoke result is inferred from the focused local run.

## Findings ranked by severity and owner

| Severity       | Finding / reproduction or reference                                                                                                                            | Owner and required next action                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BLOCKER        | Vercel/Supabase selected; no approved account/plan/region/budget/credentials/deployment approval                                                               | Product owner + operations: complete selected-provider approval record and securely supply scoped access before provisioning                                  |
| HIGH           | Media uses path.resolve('media') in src/collections/Media.ts; ephemeral replacement loses files                                                                | Operations/engineering: approve durable mounted storage and paired backup/restore, or implement/test an adapter; never publish the private directory directly |
| HIGH           | Selected Supabase database needs bounded node-postgres pooling/TLS/transaction testing, and its separate Data API must not bypass Payload RBAC                 | Engineering/operations: implement/test the chosen connection mode and restrict API schema/grants before importing private CMS records                         |
| HIGH           | Supabase Storage does not provide required S3 versioning; Vercel cannot persist current CMS disk uploads or host the existing long-running worker as a request | Owner/engineering/operations: select and test media adapter, version-capable installer storage and job compute; no weakening of release integrity             |
| HIGH           | Phase 07 MFA/recovery, CSP and ingress controls remain open; reset email is deliberately disabled in payload.config.ts                                         | Security/operations: implement chosen controls and test all sensitive API paths plus direct-origin bypass and real recovery before public admin exposure      |
| HIGH           | Real installer versioning/IAM/CORS, signed builds, actual architecture/OS verification and worker supervision absent                                           | Operations/release owner: execute real-provider Phase 06 gates and anonymous redirects in both locales                                                        |
| HIGH           | Company/legal/content/translation/asset approvals and Contact mailbox/activation remain incomplete                                                             | Product/legal/localization + operations: approve factual content, keep Contact disabled until its separate live gate passes                                   |
| HIGH           | Real backup/restore, rollback, TLS renewal and alert delivery have no target evidence                                                                          | Operations: approve RPO/RTO/retention, provision and rehearse, record measured outcomes and on-call ownership                                                 |
| MEDIUM         | Process-local cache and loopback start require deliberate host/proxy configuration; multi-instance invalidation unverified                                     | Engineering/operations: one instance initially; correct bind for managed ingress, validate cache/no-store through actual proxy                                |
| MEDIUM         | Incomplete full quotes and workload estimates; download transfer may dominate bill                                                                             | Owner/operations: confirm both-environment quote, region/request/egress rates, labor, taxes and spend alerts                                                  |
| MEDIUM         | Phase 07 screen-reader/cross-browser and representative performance/field evidence incomplete                                                                  | QA: actual staging ID/EN public/admin/Contact/release review, approved assets and eligible field collection                                                   |
| LOW, mitigated | Existing deepmerge registry advisory remains disclosed                                                                                                         | Maintainer: retain exact patch/policy tests and monitor verified compatible upstream remediation                                                              |

No new UI was changed. No new translation, legal statement or asset approval is
inferred. Automated regression does not certify WCAG 2.2 AA or field CWV. Current
handbook expressly describes shared layout and publication in both locales;
unpublished localized pages may return 404 rather than fabricated fallback copy.

## Doc drift, next scope and commit-ready summary

README/roadmap/decision register now reflect explicit Phase 08 preparation,
superseding historical no-automatic-activation notices for this scope only. Doc 09
links current operational procedures; historical phase evidence is preserved.
Changelog records the documentation and minimal Vercel configuration separately
from earlier dirty work. An intermediate text-replacement error in README,
roadmap and changelog was repaired from captured pre-task text and Git history,
retaining the existing Phase 05–07 additions; final document/link checks followed.

Next: owner approves fully costed Vercel/Supabase plans/region/budget and storage/worker choices, names the
operator and supplies scoped credentials through a secure channel. Prepare and
review the provider-specific configuration, obtain staging deployment approval,
close Phase 07 security controls and execute staging smoke/restore/rollback/alert
and editor rehearsals. Production launch remains a separate explicit go/no-go.
Do not advance or call Phase 08 complete while these blockers remain.

Commit-ready summary: record the Vercel/Supabase selection, minimal vercel.json,
target-specific compatibility/cost plan, researched hosting comparison, approval-gated
operations/rollback/launch runbook and current editor handbook; record actual
evaluation limits. No application runtime change, paid purchase, remote deploy,
commit or push is included.
