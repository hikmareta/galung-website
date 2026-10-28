# Phase 05 — Fresh review, 27 October 2026

Historical review before remediation. See [PHASE-05-CLOSURE.md](PHASE-05-CLOSURE.md) for subsequent fixes and current evidence. Findings and results below describe the reviewed snapshot, not the remediated code.

## Verdict and scope

**PARTIAL — Phase 05 is not closed.** The ordinary regression suite passes, but adversarial review reproduces two defects, formatting fails, and real Contact activation is blocked. Do not automatically advance to Phase 06, enable Contact, or deploy.

This review covers the uncommitted Phase 05 public-page implementation plus the subsequent contact-form/SMTP/retention extension. Baseline Git HEAD: `890bf02`; the reviewed working tree includes tracked modifications and untracked source/tests/screenshots. Earlier PHASE-05-EVALUATION.md is historical evidence for the smaller pre-contact snapshot, not the current gate. No production application fixes were made during this review.

Reviewed sources: AGENTS.md; README.md; documentation/01-PRODUCT-REQUIREMENTS.md, 02-TECHNICAL-ARCHITECTURE.md, 03-SITEMAP-AND-ROUTING.md, 04-CMS-CONTENT-MODEL.md, 05-UI-UX-DESIGN-SYSTEM.md, 07-SECURITY-QUALITY-TESTING.md, 08-DEVELOPMENT-ROADMAP.md, 10-ACCEPTANCE-CRITERIA.md, DECISIONS-AND-OPEN-QUESTIONS.md, PHASE-05-PUBLIC-PAGES.md, PHASE-05-EVALUATION.md, CONTACT-PRIVACY-DRAFT.id.md, CONTACT-SMTP-VERIFICATION.md; prompts/90-PHASE-EVALUATION.md. Inspected actual public routes/readers/components, CMS access/schema/hooks, SMTP/contact endpoints/services/scripts, test runner/fixtures, config, lockfile and diffs.

Plan executed: read-only source review, normal checks in isolated databases, fault-injection probes, local SMTP sink browser tests, documentation updates. Expected touched review files: new review report/probes, runner dispatch and status/changelog docs. The working .env and CMS content were not changed, no real SMTP authentication retried, and no real email sent.

## 1. Acceptance matrix

PASS means the stated local scenario passed, not production approval. PARTIAL distinguishes remaining functional or operational gaps from later-phase work.

| Requirement | Status | Current evidence / limit |
|---|---|---|
| PUB-01 / AT-01 ID/EN public routes | PARTIAL | All fixed routes and localized article/project routes pass browser tests. Locale switch works. CMS navigation to translated detail slugs fails P05-R1. |
| PUB-02 / CMS-02 homepage blocks | PARTIAL | Published blocks/shared ID/EN order pass integration and native editor/publisher browser flows. Some exposed layout controls are ignored, P05-R4. No approved production homepage content is certified. |
| PUB-03 About/company | PASS | Fixture route renders; limited published global projection reviewed. Dedicated global draft-transition control passes. Production legal facts remain TBD. |
| PUB-04 Software/Features | PASS | Both CMS-backed single-product routes pass; no editions, pricing or customer account logic. |
| PUB-05/06 Portfolio/News | PASS | Listings, detail routes, category positive/empty filtering, localized slugs and draft exclusion pass. Multi-page pagination dataset and all content variants were not separately exercised. |
| PUB-08 Contact delivery | PARTIAL | Validated ID form works through local TLS SMTP sink; private REST/KV access, origin/token/replay checks and limits pass. Actual account is unregistered and Contact readiness is false; P05-O1. Post-send audit failure gives misleading delivery failure, P05-R2. |
| AT-10 invalid contact / anti-spam | PASS | Client errors/focus, server rejection, token/replay/honeypot and atomic persistent limits pass. Initial token-fetch failure UX remains P05-R3. |
| Contact retention | PARTIAL | Expired records are removed and hidden from ordinary admin reads; stale-cleanup readiness disables the form in tests. No healthy working retention process or supervised production schedule was evidenced. |
| PUB-09 legal content | PASS | Published fixture privacy/terms render; absent documents 404. Approved ID near-form notice is separate from a complete production legal policy. |
| AT-02/03 drafts/publication/order | PASS | Integration plus native editor/publisher at 375/1280 verify draft/public boundaries, approved media and shared ordering. |
| AT-04 unpublished content | PASS | Unknown/wrong-locale slugs return 404; later post drafts and navigation-global drafts remain private. |
| AT-08 company controls | PASS | Existing admin/audit regressions pass; public projection limited to published fields. No company identity was invented. |
| AT-11 SEO | PARTIAL | Canonical/hreflang/browser noindex pass. Enabled sitemap generator produces reciprocal localized slugs and excludes drafts in an isolated process. Enabled production-mode HTTP headers/XML crawl and staging access were not audited. |
| AT-12 responsive/keyboard | PASS | Menu/locale keyboard tests, native admin controls, 320/375 through 1440 layouts, 200% root text, spacing, fonts and reduced-motion cases pass. Not a complete WCAG 2.2 AA certification. |
| AT-05/06/07/09 installer delivery | NOT TESTED | Phase 06 deferred. Private operational model rejection remains covered by integration; no installer delivery/upload was added. |
| Performance/CWV, full screen-reader/security/production ops | NOT TESTED | No Lighthouse, field p75, load/DoS, full screen-reader or production monitoring/storage/backup-restore audit executed in this review. |

## 2. Changed modules and architecture

Phase 05 files under review:

- Public routing and SEO: src/app/(website)/[locale]/page.tsx, layout.tsx, [...path]/page.tsx; src/app/sitemap.ts, robots.ts; next.config.mjs.
- Anonymous data boundary: src/services/content/public.ts. Fixed page-key resolution, localized detail equivalents, published-only reads, private-global whitelist projection and referenced category labels.
- Public presentation: src/components/website/public-page.tsx, header.tsx, content-blocks.tsx, content-image.tsx, feed.tsx; src/styles/globals.css.
- Contact extension: src/components/website/contact-form.tsx, contact-section.tsx; src/services/contact/{configuration,policy,security,store,mail,handler}.ts; src/app/(payload)/api/contact/{route.ts,token/route.ts,retention/route.ts}; scripts/contact-{retention,status,smtp-verify}.ts.
- Access/schema metadata: src/collections/OperationalModels.ts filters expired contact reads; src/payload-types.ts changes only the generated description. No new DB fields or migration.
- Dependencies/config: package.json and pnpm-lock.yaml pin nodemailer 10.2.1 and @types/nodemailer 8.0.2; .env.example adds non-secret SMTP/readiness settings. Actual secrets remain ignored in .env.
- Tests: scripts/run-tests.ts, playwright.config.ts, public-page/contact unit/integration/browser tests, published-home and TLS SMTP fixtures, historical browser-test adaptations and Phase 05 screenshots.
- Docs: public-page/evaluation/SMTP/privacy reports, decision register, roadmap and README. Pre-existing AGENTS.md changes are not authored by this review.

The stack remains strict TypeScript, App Router, React/Tailwind, Payload and its PostgreSQL adapter. No second ORM or commercial feature introduced. Atomic counters use parameterized queries through the existing Payload adapter pool and internal private KV table; this is an intentional atomicity requirement rather than an in-memory limiter. The worker/maintenance endpoint is portable, but supervising it is an operational dependency. Contact transport is isolated from Payload's disabled password-reset email adapter.

Public reads explicitly request published content with locale fallback disabled and no authenticated request context. Globals require an explicit whitelist and published status; draft-transition review control passes. Canonical origins use validated server configuration rather than visitor Host headers. Remaining architectural gaps are the localized-link string rewrite and contact delivery/audit failure boundary.

## 3. Findings, severity, reproduction and owners

### P05-O1 — BLOCKER for Contact activation: mailbox and local readiness are not ready

Evidence: the user confirmed the email account had not been registered. Earlier live verification returned EAUTH/535; it was **not retried in this review**. Read-only `contact:status` now reports:

```json
{"smtpFieldsComplete":true,"contactEnabled":false,"publishedIndonesianContactPage":false,"retentionHealthy":false,"ready":false}
```

The fields being filled does not prove authentication or delivery. There is no registered mailbox evidence, published ID Contact document or recent successful retention task in the working environment. Do not advertise activation.

Owners: user/provider for mailbox creation and webmail login; engineering/operator for TLS/auth re-verification, publishing approved CMS content and supervising retention. Only activate after those gates and tests pass. The ID notice is approved; full policy/company details and EN notice approval remain separate.

### P05-R1 — MEDIUM: translated CMS navigation preserves the wrong detail slug

Source: src/services/content/public.ts:148; src/components/website/header.tsx consumes this result.

Reproduced using `test:integration phase05-review`: publish one post with ID slug `id-article`, EN slug `en-article`; publish a navigation link `/id/news/id-article`; read EN public settings. Actual href is `/en/news/id-article`, which resolves no publication, while `/en/news/en-article` exists. The locale-switch control works; this defect is specifically CMS-authored navigation.

Remediation: resolve internal links using collection/document identity and the target locale's published slug, or use an explicit validated localized target policy. Test header and footer links to translated posts/projects and unavailable translations.

Owner: engineering. Resolve before closing public-navigation acceptance.

### P05-R2 — MEDIUM: audit failure after SMTP acceptance becomes a 503 delivery failure

Source: src/services/contact/handler.ts:163–179, src/app/(payload)/api/contact/route.ts:18; client retry at src/components/website/contact-form.tsx:95–108.

Reproduced with a synthetic SMTP acceptance callback and an injected audit create failure. One contact record exists and one send callback was accepted; then the handler rejects. The route catches this as unavailable/503, and the UI refreshes the token to permit resubmission. **Actual external duplicate email was not sent or tested**; duplicate delivery is the resulting retry risk.

Remediation: durably track delivery/result with a stable submission identity, preserve an already accepted result independently from subsequent audit failures, and retry audit/reconciliation separately. Distinguish SMTP-accepted, failed and unknown delivery; do not promise exactly-once SMTP delivery. Add post-send/audit-outage and safe-resubmit regressions.

Owner: engineering. Resolve before Contact activation.

### P05-R3 — MEDIUM: initial token failure silently leaves an enabled form with disabled submit

Source-review finding: src/components/website/contact-form.tsx:11–26 and :192. `refreshToken` returns an empty string on non-OK or network failure; the initial effect updates only token. It sets no message/retry affordance. With server `ready=true`, the fields remain enabled, the unavailable banner is absent, and submit stays disabled.

Reproduction steps for remediation: render a ready Contact page, intercept/fail GET /api/contact/token, and inspect submit and live status. This specific fault was **not separately executed in a browser during this review**; the control flow is inspected source evidence. Add a visible accessible error/retry state and distinguish loading from unavailable.

Owner: engineering/UI. Resolve before enabling the public form.

### P05-R4 — MEDIUM: schema-exposed layout controls are ignored by the public renderer

Source-review finding: src/blocks/registry.ts:78 (`imagePosition`) and :87 (`columns`) define controls; src/components/website/content-blocks.tsx never reads either. Current classes/styles do not encode them.

Reproduction steps: publish identical imageText blocks choosing left versus right, or featureGrid choosing two versus three columns. The corresponding setting cannot change public markup/layout through this renderer. This setting-toggle comparison was **not separately executed in a browser**; source evidence establishes the missing use.

Remediation: implement the validated options responsively, or explicitly remove/defer unsupported controls from the editor and update its contract. Do not silently leave ineffective controls.

Owner: engineering/design. Required to close the corresponding CMS-driven layout scope.

### P05-R5 — LOW: required formatting check fails in two production source files

Actual `format:check` exit 1:

```text
[warn] src/components/website/contact-form.tsx
[warn] src/services/contact/policy.ts
Code style issues found in 2 files.
```

No formatter fix was applied to application code during this review. Owner: engineering; format these files and rerun the check before a commit/gate closure.

## 4. Security, i18n, UI, performance and SEO risks

- RBAC/privacy positives: anonymous contact collection/KV reads and direct creates remain denied. Public contact writes use bounded JSON, field allowlists, validated locale/policy consent, signed cookie-bound single-use token, fill-time guard, honeypot and persistent atomic counters. Retention endpoint needs a separate long secret. Raw SMTP errors/passwords/messages are not logged by the application; real .env is ignored by Git. The committed TLS key is deliberately public and loopback-test-only, not a production credential.
- SMTP positives: fixed approved recipient, validated reply address, TLS certificate verification, timeouts, file/URL attachment access disabled. A passing local SMTP sink is not proof of DomaiNesia authentication, mailbox delivery or spam-folder placement.
- Operational/privacy risks: no healthy working retention process is evidenced; the marker means recent successful cleanup, not proof of a supervised worker. Retention cannot remove copies already delivered into email or backups. Inbox retention remains TBD. Stored submissions do not retain the validated privacy revision/consent evidence as fields; consider minimal version attribution if future policy changes require traceability.
- Availability: without a trusted proxy header all visitors share the 10/hour client bucket; a global request/token budget can also be exhausted. This is a deliberate conservative configuration but needs realistic traffic/proxy/abuse assessment before production; no load/DoS certification performed.
- Localization: only ID notice is approved and only ID submissions/forms are enabled in code. EN form is deliberately absent rather than auto-translated. Bilingual contact feature parity remains incomplete. P05-R1 affects shared CMS links. Unreviewed UI copy remains sample-labelled while indexing is off; production copy/asset approval remains pending.
- Accessibility/UI: labels, inline associations, error focus/live status, keyboard menu, mobile overflow, font/text-resize/reduced motion and contact happy path pass. Manual inspection of the current 375px contact screenshot is readable with no horizontal overflow. P05-R3 is an unhandled error state; P05-R4 breaks editor expectations. Blank optional CMS blocks and heading/content combinations still need content-specific review. No full screen-reader or WCAG certification.
- Performance: `publicCategories` scans all published documents, potentially once per feed; public pages use request-driven data access and sitemap resolves many items individually. Images retain unoptimized development delivery. No real-volume/Lighthouse/field CWV result claimed.
- SEO: tested canonical/hreflang/noindex defaults and sitemap-generator reciprocity/draft exclusion are positive. Production-indexing HTTP headers/XML and staging exclusion were not crawled in an enabled environment. Public legal pages and structured claims still require real approvals. Installer CTA/delivery remains Phase 06.

## 5. Actual commands and raw result summary

All package commands used the documented local Node 24.22.1/pnpm 10.34.9 PATH and `node .tools/node_modules/pnpm/bin/pnpm.cjs <command>`. No dependency updates were performed in this review.

| Command | Actual result |
|---|---|
| git status/diff/rev-parse; rg/Get-Content | Inspected tracked/untracked working tree against HEAD 890bf02; generated payload type diff is description only |
| lint | PASS, exit 0 |
| typecheck | PASS, exit 0; repeated after review probes were added |
| format:check | FAIL, exit 1, the two files listed in P05-R5 |
| test | PASS, 20/20, 0 failed |
| test:integration | PASS, exit 0; bootstrap/login/reset/lockout, editorial/media/audit and new contact checks; isolated DB cleaned up |
| build | PASS, exit 0; compile/typecheck/page generation/traces and route table include all public/contact/token/retention routes |
| test:e2e | PASS, 30/30 in 5.4 minutes; isolated DB and TLS sink cleaned up |
| test:integration phase05-review | FAIL, exit 1, **two findings reproduced**, not a passing check. R1/R2 reproduced twice; extended run also passes published-global draft exclusion and enabled sitemap-generator controls |
| audit --prod --json | PASS, exit 0; info/low/moderate/high/critical advisory counts all 0 at query time; raw local output .tools/phase05-review/audit.json |
| contact:status | PASS read-only execution, but `ready:false` and the exact flags shown above. Does not authenticate SMTP or activate anything |
| scoped eslint for review probe/runner | PASS, exit 0 |
| git diff --check | PASS, exit 0, line-ending notices only |
| git check-ignore .env | PASS, .env is ignored |

No real SMTP auth retry, email sending, deployment, working CMS publication, full enabled-indexing HTTP crawl, backup/restore rehearsal, Lighthouse or load test was run. Migration application occurred only as part of disposable test setup; rollback/restore was not repeated because no schema fields/migrations changed. The earlier 535/TLS results are historical evidence explicitly labelled as such.

Browser paths: both locales' Home/About/Software/Features/Portfolio/News/Contact/Privacy/Terms and localized detail paths; unknown/wrong-locale/draft and private API rejection; mobile keyboard; native media/editor/publisher/preview. Current contact screenshot: documentation/screenshots/contact-id-375.png, using synthetic data and the loopback SMTP sink. Existing Phase 05 screenshots were regenerated by the ordinary browser suite. No production-image rights or real content accuracy certification is implied.

## 6. Required remediation and next scope

1. Engineering: fix R1 translated CMS targets and R2 delivery/audit failure boundary, with regressions that assert the corrected behavior. The review probe deliberately exits 1 while these defects remain.
2. Engineering/UI: fix R3 token-load failure feedback/retry and R4 ineffective editor controls; fix R5 formatting. Re-run relevant unit/integration/browser checks and format gate.
3. User/provider and operator: create/register the actual mailbox, verify webmail and SMTP TLS/auth after account setup, publish approved ID Contact content and run/supervise retention before switching CONTACT_ENABLED on. Do not automatically send real test email without an explicit send instruction.
4. Content owner: provide/review EN notice and form copy separately; finish actual public/legal/asset data. Product/legal identity and inbox retention remain TBD.
5. QA before launch: realistic-volume/performance, screen-reader/accessibility, enabled-indexing HTTP crawl, production storage and operational evidence at their roadmap gates.

Recommended next work is **Phase 05 remediation and reevaluation**, not Phase 06 implementation. No Basic/Pro, pricing, payments, subscription, license or customer portal/auth feature introduced.

## 7. Doc drift, changelog and review artifacts

Old Phase 05 evaluation/runbook/roadmap describe 16 unit tests, 29 browser tests, unapproved ID notice and missing contact implementation. Those statements are historical after the extension: current code has 20 unit tests and 30 browser tests, ID notice approval, contact endpoints/worker, and the external mailbox blocker. The earlier evaluation is retained and marked historical; README/roadmap/decision register point to this review. The runbook's contact paragraph is updated to the actual source/readiness limits. SMTP verification history now records the user's mailbox-registration clarification.

Review-authored files: tests/integration/phase05-review.ts; scripts/run-tests.ts (one isolated review branch); documentation/PHASE-05-REVIEW.md; status/doc links in README.md, documentation/08-DEVELOPMENT-ROADMAP.md, DECISIONS-AND-OPEN-QUESTIONS.md, PHASE-05-EVALUATION.md, PHASE-05-PUBLIC-PAGES.md, CONTACT-SMTP-VERIFICATION.md. Ordinary tests regenerate screenshot evidence and Next may regenerate its typed/schema-description artifacts. No production application fix, dependency update, .env edit, Git commit/push or deployment was made in this review.
