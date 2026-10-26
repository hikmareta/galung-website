# Phase 04 — CMS foundation (26 October 2026)

**Historical initial implementation report.** The subsequent review and remediation are retained separately. Current verdict: local Phase 04 PASS in [PHASE-04-CLOSURE.md](PHASE-04-CLOSURE.md), closing R1–R5. Use [PHASE-04-SCHEMA-MAP.md](PHASE-04-SCHEMA-MAP.md) for the current schema/editorial procedure; old generic-schema, delete-lock, cache and dependency descriptions below are historical.

## Scope and source review
Read AGENTS.md, README.md, numbered documentation 01–10, DECISIONS-AND-OPEN-QUESTIONS.md, prompts/90-PHASE-EVALUATION.md, existing Payload configuration, Users/access/password rules, generated types/migration, test runner, integration and browser tests, and Phase 02 local runtime runbook. Existing uncommitted Phase 03 changes were preserved.

Implements pages, posts, portfolioProjects, products (unique Galung key), postCategories, portfolioCategories, media, auditEvents; siteSettings, companyProfile, headerNavigation, footerNavigation, contactSettings. Editorial roles: editor, publisher, super-admin. No author role is advertised until ownership scoping is implemented. No customer accounts or commercial flows.

## Decisions and behavior
- All 13 approved block names are registered. Shared unlocalized layout and item arrays preserve stable IDs/order across locales; text/media fields localize with fallback disabled. Initial bodies are plain text rendered through React escaping; no arbitrary HTML or embedded scripts. Specialized feed/video rendering belongs to Phase 05.
- Editors save drafts; publishers approve shared publication after both locale titles/slugs exist and both review flags are checked. Save both locale drafts before initial publication. Review flags are an explicit editorial attestation, not automatic translation certification. Publication is shared across locales in this first implementation.
- Versions retain 30 entries. Preview requires an active CMS session, uses access-enforced draft reads, is dynamic/private/no-store/noindex and renders escaped text. Public homepage reads explicitly published content with overrideAccess:false; other public page implementations remain Phase 05. Empty CMS retains the existing labeled design specimen.
- HTTP hooks invalidate ID/EN layouts. CLI Local API writes have no Next cache context; the homepage is dynamic. Distributed CDN invalidation remains provider-dependent and must be verified at deployment.
- Audit hooks record content/user/media saves/deletes and company/global changes in the same Payload request/transaction. APIs cannot create, edit or delete audit records; super-admin can read them. Events contain IDs/actions, not passwords/contact bodies.
- Globals remain private to editorial users; settings changes require super-admin. No unapproved legal facts are public. Phase 05 must expose only approved global projections.
- Local development media uses Payload-managed private disk outside public/, approved file access only, JPEG/PNG/WebP, 8 MiB and signature validation. Editor edits to an already approved public image are denied; new/unapproved editor uploads remain private until publisher approval. No executable/SVG/installer uploads. Production object storage remains TBD.
- Media deletion conservatively blocks while any content exists, including the possibility of historical references. Exact reverse usage lookup and an operator archival workflow remain deferred.
- PostgreSQL enum upgrade replaces the enum through text in the migration: adding an enum value and using it as a default in the same transaction is rejected by PostgreSQL. The down migration requires removing/reassigning editorial accounts before rollback.

## Modules changed
New access/editorial.ts; blocks/registry.ts; collections/Content.ts and Media.ts; globals/editorial.ts; hooks/editorial.ts; services/content/read.ts and media-validation.ts; components/website/content-blocks.tsx; authenticated preview route/layout; integration/editorial.ts; e2e/editorial.spec.ts; unit/editorial.test.ts. Updated Users.ts, payload.config.ts, generated payload-types.ts, migrations/index plus Phase 04 migration/snapshot, homepage, next.config.mjs, scripts/run-tests.ts, .gitignore and phase documentation. Dependency versions/lockfile unchanged.

## Editorial runbook
1. Apply migrations with the compatible ignored local runtime or install the pinned Node/pnpm versions from the foundation runbook. Back up a non-disposable database first.
2. Sign in as super-admin; create editor/publisher accounts in Users (new account role defaults to editor).
3. Create a Pages document with key `home`. Save ID title/slug and blocks as draft. Switch locale to EN; enter reviewed translation and localized image descriptions. Shared layout changes affect both draft locales.
4. Upload a licensed image in Media, provide attribution and both alt descriptions; publisher approves its public availability. Choose it in a block's localized media field.
5. Use block row action menu Move Up/Move Down with keyboard, save draft, and use Preview. Review both locales; publisher sets both reviewedLocales flags and publishes.
6. Check /id and /en. Public content must remain unchanged before publication. Keep legal/company content empty/draft until the owner supplies and approves it.

## Deferred by roadmap
Full public pages/SEO/feed layouts and navigation projections: Phase 05. softwareReleases/releaseAssets/downloadEvents and direct verified installer delivery: Phase 06. Contact submission endpoint/storage/retention requires the contact implementation. Scheduled publishing, automatic translation, arbitrary canvas, pricing/payment/customer portal are absent. Production storage/CDN, final legal identity, approved assets/translations, role assignments and hosting remain owner decisions.

Actual execution evidence and gate verdict are recorded in PHASE-04-EVALUATION.md; this report does not imply deployment or production readiness.
