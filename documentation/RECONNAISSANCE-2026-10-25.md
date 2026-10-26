# Repository reconnaissance and implementation plan — 25 October 2026

## Active scope and evidence

START reconnaissance only. No application scaffold, package installation, product implementation or deployment was requested in this phase. This report records findings and proposals, not new approved product decisions.

Reviewed in full: `AGENTS.md`, `README.md`, `documentation/01-PRODUCT-REQUIREMENTS.md`, `02-TECHNICAL-ARCHITECTURE.md`, `03-SITEMAP-AND-ROUTING.md`, `04-CMS-CONTENT-MODEL.md`, `05-UI-UX-DESIGN-SYSTEM.md`, `06-ADMIN-REQUIREMENTS.md`, `07-SECURITY-QUALITY-TESTING.md`, `08-DEVELOPMENT-ROADMAP.md`, `09-DEPLOYMENT-OPERATIONS.md`, `10-ACCEPTANCE-CRITERIA.md`, and `DECISIONS-AND-OPEN-QUESTIONS.md`. Also reviewed `prompts/00-START-CODEX.md`, `01-PHASE-01.md` and `02-PHASE-02.md`.

The root contains AGENTS.md, README.md, documentation/, prompts/ and references/. `references/UI Galung.jpg` exists; no visual inspection or screenshot annotations were performed in START. Treat it solely as a visual reference; a detailed visual audit belongs to Phase 01. No production rights or factual claims are inferred from it.

No package.json, lockfile, node_modules, application source, environment example or application configuration was found. No installed project dependencies can therefore be audited. `git status --short` reports that this directory is not a Git repository.

## Compatibility findings and scaffold proposal

Official sources consulted:

- https://payloadcms.com/docs/getting-started/installation
- https://payloadcms.com/docs/database/postgres
- https://payloadcms.com/docs/local-api/overview
- https://nextjs.org/docs/app/getting-started/installation

Payload's installation page currently lists Node `^22.23.4 || >=24.22.1` and Next ranges `15.2.9–15.2.x`, `15.3.9–15.3.x`, `15.4.11–15.4.x`, or `16.2.6+`. Installed Node `24.19.0` does not meet that Payload requirement, although it exceeds Next's documented Node minimum of `20.9`. These are documentation constraints, not a tested dependency set. Recheck them against the selected release metadata when scaffolding; do not infer compatibility from Next alone.

Propose the official Payload blank template with PostgreSQL, preserving its generated Payload route group and adding a public route group. Use TypeScript strict, React/React DOM satisfying the selected Next and Payload peer requirements, Tailwind, and Payload's own Postgres adapter. That adapter already uses Drizzle internally; no additional application ORM is proposed. Add localization routing, validation and test tools only after checking their peer requirements. Do not start from an ecommerce template.

Before installation, inspect the exact stable template/release and package manifests, select mutually compatible patched versions, pin direct dependencies and the package manager, generate pnpm-lock.yaml, and run a frozen-lockfile install and baseline checks. Exact Payload, React, Tailwind, PostgreSQL and tooling versions remain unselected; no fully verified release set is claimed. Preserve the existing AGENTS.md and planning files when importing the scaffold.

## Scope and architecture

One Galung product, public Windows/macOS downloads under 1 GB per installer, Indonesian/English public content and a separate authenticated editorial admin. No Basic/Pro, pricing, payment, subscriptions, licensing, customer login or customer dashboard.

Use a portable modular monolith: Next App Router public rendering plus Payload admin/API, PostgreSQL and external object storage. Modules separate components/blocks, CMS schema, access rules, localization, SEO, media/storage, releases/downloads and tests. Public server queries must enforce access checks, publication and locale readiness. Payload Local API defaults to bypassing access control (`overrideAccess: true`); public data helpers must explicitly enforce access and constrain returned fields, including populated relationships.

Draft previews require authorization and isolated caching. Publishing and retirement invalidate affected detail routes, listings, feeds and SEO outputs. Installer uploads go directly to storage with scoped authorization; server-trusted verification precedes activation. Downloads resolve an approved asset to storage/CDN; Next never streams installer bytes. Contact submissions and audit records have restricted access and retention rules.

## Routes and CMS model

Public routes under both `/id` and `/en`: home, `/about`, `/software`, `/software/features`, `/portfolio`, `/portfolio/[slug]`, `/news`, `/news/[slug]`, `/download`, `/contact`, `/privacy`, `/terms`. `/admin` is unlocalized. Root redirect policy remains to be signed off; deterministic `/id` is the proposed baseline pending language-detection decision. No public pricing or account routes.

Collections: users, pages, posts, postCategories, portfolioProjects, portfolioCategories, products (one active stable key `galung`), softwareReleases, releaseAssets, media, contactSubmissions, downloadEvents, auditEvents. Globals: siteSettings, companyProfile, headerNavigation, footerNavigation, contactSettings. Collect analytics only with a defined privacy/retention policy.

Initial predefined blocks: hero, richText, imageText, featureGrid, mediaShowcase, stats, gallery, videoEmbed, portfolioFeed, newsFeed, faq, callToAction, communityShowcase. Layout order and composition are shared across locales; translated fields vary. Empty or unapproved legal identity is not public factual content. Sample text must be labeled and reviewed; no invented translations, claims or testimonials.

## Risks and unresolved decisions

| Severity | Finding / decision | Owner and deadline |
| --- | --- | --- |
| High | Node below documented Payload requirement; registry DNS prevents pnpm bootstrap | Engineering/environment owner, before Phase 02 installation |
| High | No Git repository or lockfile; reproducibility not established | Engineering, Phase 02 |
| High | Locale publication semantics need an explicit design: localized text does not alone ensure independent publication; shared order must still affect both locales | Engineering + content approver, before Phase 04 schema acceptance |
| High | Local API access bypass, draft relationships and cache reuse could expose privileged content if defaults are used | Engineering, Phase 04 integration tests |
| High | Installer architecture, signing/notarization, trusted checksum verification and storage policy unresolved | Product/release owner + engineering, Phase 06 and launch |
| High for launch | Legal identity/policies, photo/logo/font rights and approved product claims missing | Product/legal/content owners, before publication |
| Medium | Minimal role set, scoped authorship, publisher powers and admin MFA approach unselected | Product/admin owner + engineering, Phase 04 |
| Medium | Language detection, missing-translation behavior and locale readiness rules need sign-off | Product/content owner, routing and CMS gates |
| Medium | Contact destination, spam controls, retention and analytics policy undefined | Operations/privacy owner, before contact launch |
| Medium | Hosting, database/storage providers, backup/restore and commercial terms undecided | Operations owner, Phase 08; remain portable meanwhile |

No business TBD blocks this reconnaissance. Required public content and legal pages should remain unpublished until approved. Gold/ivory token contrast and long English strings require measurement and manual review; no accessibility conformance has been established.

## Exact implementation order and acceptance gates

1. Phase 01: visually inspect the reference, annotate relevant patterns, inventory pages/components/assets and user flows; map PRD IDs to backlog and acceptance tests. Touch only audit/design/backlog documentation and reference annotations. Gate: reviewed visual interpretation and content requirements; no fabricated content.
2. Phase 02: resolve runtime/registry access, establish Git, verify and pin the official blank scaffold, configure local PostgreSQL, strict TS, env example, admin authentication baseline, scripts and CI skeleton. Expected files: package.json, pnpm-lock.yaml, package-manager/runtime pins, Next/TS/lint/test config, src/app Payload/public groups, src/payload.config.ts, minimal users collection, local DB configuration, .env.example, .gitignore, CI and setup docs. Gate: repeatable install/start, DB migration, admin smoke test and baseline checks.
3. Phase 03: tokens, licensed typography, layout primitives, responsive header/footer, keyboard menu and reduced motion. Expected areas: src/styles, src/components, shell routes and design documentation. Gate: desktop/mobile reference review, contrast and keyboard checks, long-string coverage.
4. Phase 04: users/access policies first, then globals and core content collections, shared blocks/localized fields, versions, locale readiness, preview, publication invalidation, media references and audit hooks. Expected areas: src/collections, globals, blocks, access, hooks, CMS data services, migrations and integration tests. Gate: editor changes text/image/order in ID/EN without code; drafts remain private and permissions pass.
5. Phase 05: localized shell/routes and CMS block rendering, then product/about, portfolio/news, contact and approved legal content, followed by metadata/canonical/hreflang/sitemap. Expected areas: public route group, components, i18n/SEO services and public tests. Gate: published-only bilingual routes and accessible responsive flows.
6. Phase 06: release/asset validation and access, scoped direct storage upload, trusted verification, publish/retire, then anonymous OS/architecture download UI. Expected areas: release collections, storage/download services, admin upload UI, download routes and integration/E2E tests. Gate: invalid/unverified files denied and real installer delivery bypasses the app server.
7. Phase 07: cross-role and cross-locale regression, upload abuse/outage cases, accessibility/SEO/performance audit, backup restore and rollback rehearsal. Gate: evidence against AT-01–AT-12, defects owned, no unsupported security/readiness claims.
8. Phase 08: choose eligible hosting, provision isolated environments/secrets/storage/DB, migrate/deploy, verify DNS/TLS and smoke tests, then deliver operator/editor guides. Gate: actual deployment, backup and rollback evidence.

This order follows the approved roadmap. Only START is active; no later phase has begun.

## Test strategy

- Every implementation phase: available formatting, lint, strict typecheck, unit/integration tests and production build; E2E checks when routes exist. Record failures and unavailable commands explicitly.
- Unit: locale URL equivalence, invalid locale/slug handling, block guards, validation, release selection and checksum formatting.
- PostgreSQL-backed integration: anonymous/author/editor/publisher/admin access including direct API attempts, self-escalation, related draft leakage, independent locale content readiness, shared layout publication, preview isolation, revalidation, used-media deletion, legal approval, release verification and retirement.
- Playwright: AT-01–AT-12 across both locales, narrow/mobile and desktop; menu keyboard use, draft/public separation, reordered blocks, accessible form errors, missing translations, anonymous downloads and unauthorized activation denial.
- Storage integration: expired/replayed upload authorization, object-key isolation, oversize/type mismatch, server-verified digest mismatch, retries and storage outage. Assert redirect destination and absence of installer response streaming; use a real storage fixture before final acceptance.
- Manual/operational: keyboard and screen-reader review, contrast/reduced motion, responsive screenshots, SEO crawl, Lighthouse baseline, restore and rollback. Real-world p75 Core Web Vitals require post-launch traffic and cannot be claimed from local Lighthouse.

## Actual checks and deliverables

- `Get-Location`: D:\Projects\galung-website.
- `rg --files` and hidden manifest/lock/config searches: documentation pack only; no application/dependency files found. No matches produce exit 1 for the targeted search.
- Full documentation reads and directory listing: successful.
- `git status --short`: failed, not a Git repository.
- `node --version`: v24.19.0; `npm --version`: 11.17.0.
- `pnpm --version`: failed during Corepack registry lookup with ENOTFOUND registry.npmjs.org; usable pnpm version not confirmed.
- `docker --version`: Docker 29.9.2, build a82e528. Daemon availability was not tested.
- `psql --version`: command not found; PostgreSQL server availability was not tested.
- Official web documentation retrieved for Payload installation, PostgreSQL adapter, Local API and Next App Router installation. A separate localization-document URL failed to load; no claim relies on it.
- Formatting/lint/typecheck/unit/build/E2E: unavailable because no package.json, scripts or application exists; none was run or passed.
- Screens/routes/manual UI tests: none; there is no running application.
- Created only this report; no application or baseline requirements changed. Commit-ready summary: document repository/environment audit, official compatibility constraints, scoped implementation sequence, risks and test gates. Git must first be initialized before any commit is possible.

Next concrete step: activate Phase 01 requirements/reference audit. Phase 02 scaffolding follows its gate and verified toolchain setup.
