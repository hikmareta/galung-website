# Galung Official Website & CMS — Development Pack v1.2

**Baseline:** 24 October 2026. **Domain:** `galung.id`. **Status:** Phase 04 locally closed — PASS after remediation and reevaluation. See [closure evidence](documentation/PHASE-04-CLOSURE.md). Production pending; Phase 05 not started.

## Current progress

Phase 01 requirements/reference audit is approved. Authorized content, visual and typography previews remain under `references/content-preview/`. Phase 02 adds the Next/Payload/PostgreSQL foundation. See [local setup and architecture](documentation/PHASE-02-FOUNDATION.md) and [Phase 02 evaluation](documentation/PHASE-02-EVALUATION.md) for actual verification and gate status. This is not a deployed or production-ready site.

The [Phase 02 closure report](documentation/PHASE-02-CLOSURE.md) supersedes the historical PARTIAL review and records regression evidence, isolated test databases, dependency fixes and Git delivery. Phase 03 design-system samples are implemented; see [design-system report](documentation/PHASE-03-DESIGN-SYSTEM.md) and [evaluation](documentation/PHASE-03-EVALUATION.md) for historical evidence. The [Phase 03 closure](documentation/PHASE-03-CLOSURE.md) records current passing checks and closes the six review findings.

Phase 04 CMS schemas, editorial roles, shared ID/EN blocks, media safeguards, drafts/preview/publication, cache invalidation and durable audit attribution are implemented. All five review findings are closed with 16 unit tests, complete integration/regression and migration/restore checks, and 28 browser tests passing locally. Tested migrations are applied to the backed-up local working database. See [closure/evaluation](documentation/PHASE-04-CLOSURE.md) and the [current schema map/editorial runbook](documentation/PHASE-04-SCHEMA-MAP.md). No Phase 05 activation or deployment is implied.

## Goal
Build a professional, bilingual corporate/product site for **Galung**, a music software product with an Angklung, visual-music and inclusive-learning focus, accompanied by a secure editorial CMS. This is a **new website repository**, separate from the Galung desktop application and licensing system.

## Locked MVP decisions
- A **single Galung product**, not separate Basic/Pro editions. Basic/Pro, plans, payment, customer accounts and subscriptions are **future-only**.
- Public downloads for Windows/macOS **without login**, no checkout; installer files are each < 1 GB.
- Content languages: Indonesian (`id`, default) and English (`en`). Site pages at `/id/...` and `/en/...`.
- Public corporate/product, software features, portfolio, news, download, contact, and legal pages.
- Authorized editors can change text, media, visibility and **order of predefined sections**; structured blocks, not freeform drag-and-drop canvas.
- Visual direction is grounded in `references/UI Galung.jpg`: ivory, forest green, gold and Angklung imagery, with **Poppins headings and Nunito Sans body/UI** approved by the user on 25 October 2026 (superseding the earlier serif direction). **Screenshot content is a design reference, not proof of approved copy or licensed production imagery.**
- Legal owner/company name is **TBD** and editable in CMS, not invented or published empty as factual copy.
- Production hosting TBD; do not assume Vercel Hobby is eligible for business use.

## Read order
1. `AGENTS.md` (binding Codex rules)
2. `documentation/01-PRODUCT-REQUIREMENTS.md`
3. `documentation/02-TECHNICAL-ARCHITECTURE.md`
4. `documentation/03-SITEMAP-AND-ROUTING.md`
5. `documentation/04-CMS-CONTENT-MODEL.md`
6. `documentation/05-UI-UX-DESIGN-SYSTEM.md`
7. Remaining numbered docs and `documentation/DECISIONS-AND-OPEN-QUESTIONS.md`
8. `prompts/00-START-CODEX.md` then one phase prompt at a time.

## How to use
1. Extract ZIP into a **new `galung-website` repository root** (or copy the contents into your existing clean repository), so `AGENTS.md` is at repository root.
2. Keep the reference screenshot in `references/`; do not use it as a deployed webpage asset.
3. Open the **repository root**, not the parent projects directory, in Codex.
4. Paste `prompts/00-START-CODEX.md` into Codex. Ask for a plan/compatibility review before application scaffolding.
5. Work through `prompts/01-PHASE-01.md` through `08-PHASE-08.md`; after each phase use `prompts/90-PHASE-EVALUATION.md`.
6. Review output, run checks, commit, then advance to the next phase.

**Important:** Follow the Phase 02 runbook to configure local secrets, PostgreSQL, migrations and the first administrator. Hosting, production brand assets, contact/legal data and installer variants remain TBD. Public routes currently contain clearly labeled foundation samples.
