# Phase 05 — Public pages and editorial routing

Activated by the user on 27 October 2026. No Phase 06 activation or deployment.

## Reviewed inputs and planned scope

Reviewed AGENTS.md, README.md, documentation/01-PRODUCT-REQUIREMENTS.md through 10-ACCEPTANCE-CRITERIA.md, DECISIONS-AND-OPEN-QUESTIONS.md, PHASE-04-SCHEMA-MAP.md and prompts/90-PHASE-EVALUATION.md. Inspected locale routes/layout, ContentBlocks/Header, CMS collections/globals, publication/access hooks, content readers, tokens/styles, test runner and browser tests. Read the installed Next dynamic-route guide before implementation and checked the installed sitemap, metadata and robots references during verification.

Scope: bilingual public Home, About, Software/Features, Portfolio, News, Contact, Privacy and Terms; published-only detail pages; feeds, filtering/pagination, translated slugs, canonical/hreflang, sitemap/robots, reusable responsive blocks. Reuses the existing stack and approval workflow. The subsequent Contact extension adds pinned Nodemailer and a receipt migration; no installer workflow or commercial features.

## Editorial route contract

Pages keys: home, about, portfolio, news, contact, privacy, terms. Their URLs use the fixed sitemap paths regardless of CMS slug. Products key galung serves /software and /software/features. Posts and portfolioProjects use each locale's own slug for detail routes. Both title and slug must exist in the requested locale. Unknown, unpublished and incomplete content returns 404. Locale fallback is disabled, including relationships and globals. No sample material is automatically seeded or published to the working database.

All content reads explicitly use draft:false, overrideAccess:false and a published-status filter with no visitor/editor identity. Request-scoped React memoization prevents privileged persistent-cache reuse. Existing publication hooks continue invalidating locale layouts. The older publishedHome reader is retained for existing integration checks but is no longer the public-page entry point.

Private globals remain private in REST. A narrow server-side projection reads only published navigation/contact/company values and returns whitelisted fields. Only category IDs referenced by published localized content can contribute public filter labels. Staff accounts, submissions, audit records and release records are never projected.

Header/footer links from CMS accept existing safe-link validation. Missing header navigation uses sample ID/EN interface labels; these remain unreviewed UI copy, not approved translations. Shared page block ordering is unchanged. Portfolio/news editorial dates do not schedule publication.

## Indexing

PUBLIC_INDEXING defaults false. Rebuild and restart when changing it for the Next response-header policy; robots and sitemap are dynamic. Keep false on local/staging. Only enable on approved production after content, translations, assets, legal facts and hosting approval. Metadata uses NEXT_PUBLIC_SITE_URL for canonical and absolute reciprocal hreflang links. Sitemap includes only available publications and localized detail slugs; it is empty while indexing is disabled. Robots disallows admin/API/preview and disallows all crawling while indexing is disabled. No unsupported structured-data assertions.

## Contact and legal limits

Contact pages remain CMS-published documents. The extension provides ID/EN forms, bounded/validated server endpoints, private 30-day website copies, atomic anti-spam limits, SMTP transport and a maintenance worker/protected endpoint. Both near-form notices were explicitly approved on 27 October 2026; see CONTACT-PRIVACY-DRAFT.id.md and CONTACT-PRIVACY-APPROVED.en.md. This does not approve a complete legal policy or fill company identity fields.

Approved recipient/retention: admin@galung.id / 30 days. Configured provider: DomaiNesia, mx3.mailspace.id:465, TLS. The user subsequently confirmed the mailbox has not been registered. Historical authentication returned 535; no live retry or real mail was performed in the fresh review. Read-only working status reports Contact disabled, no published ID Contact page, no healthy retention marker and ready=false. The form is not active. Inbox retention remains TBD.

The user explicitly deferred live activation and requested code/tests first while the mailbox remains unregistered. PHASE-05-CLOSURE.md supersedes the historical PHASE-05-REVIEW.md for technical remediation. Local TLS sink results do not prove real mailbox delivery. Keep CONTACT_ENABLED=false until the operational gates below are met.

## Receipt and maintenance operations

Apply the registered 20261027_064206_phase05_contact_receipts migration after backup. It adds a unique submission identity, request fingerprint, approved privacy revision, delivery state, acceptance timestamp and audit-pending flag. Legacy records become unknown rather than inventing delivery history. Server-only writes control these fields; CMS administrators may mark a message handled but cannot forge delivery/policy state through ordinary API writes.

The browser keeps only a random submission UUID in sessionStorage; entered personal data remains in component memory until navigation/reset. A repeated request with that identity and matching content returns its durable receipt without sending again. Changed content returns 409. SMTP acceptance yields sent/200, definite rejection yields delivery/503, pending/uncertain results yield processing or unknown/202. Acceptance is not proof of inbox delivery. Network-response loss offers a status check using the same request identity, not an automatic resend. Starting another message is explicit. Losing browser state does not establish whether a prior message was received; operators should inspect receipts/provider logs before manual resends.

Run `pnpm contact:retention` once, then supervise `pnpm contact:worker` (hourly), or invoke the authenticated POST /api/contact/retention at least hourly using CONTACT_MAINTENANCE_SECRET. Never put that secret in public/client configuration or access logs. Maintenance deletes website copies at or beyond 30 days, expires rate-limit keys, marks stale pending receipts unknown and retries audit recording without sending email. Receipt audit events contain resource IDs/status, not message bodies or email addresses. Failed audit writes retain auditPending for a later run. A completed maintenance heartbeat is required within two hours; visitor submissions cannot refresh it. A stale/missing heartbeat disables new submissions. Monitor worker failures and stale heartbeat; this is fail-closed availability, not a substitute for supervised deletion. Physical deletion follows the hourly schedule and may be delayed by an outage; expired records are hidden from ordinary admin reads. Backup retention and recipient-inbox deletion are separate production policies.

Before real activation: create admin@galung.id and confirm webmail access, verify TLS/auth with `pnpm contact:smtp:verify` without printing credentials, arrange supervised maintenance/monitoring, publish reviewed Contact documents in both locales, then enable CONTACT_ENABLED and restart. Run `pnpm contact:status`; arrange an explicitly authorized real-message smoke test and inspect the recipient inbox. The current task does not perform these external actions. Production proxy configuration must strip/spoof-protect CONTACT_TRUSTED_IP_HEADER; without a trusted proxy the client limit is intentionally shared. Retain staging PUBLIC_INDEXING=false.

## Regression commands

`pnpm test:integration` includes Phase 05 adversarial regressions. `pnpm test:e2e` uses a disposable database and local TLS SMTP sink, never the configured real SMTP account. `pnpm test:seo` builds with indexing enabled, runs HTTP metadata/XML/draft checks on an isolated database/server, then rebuilds the original environment in a finally block. It must run sequentially after the main browser suite because both use .next. A failed final restoration build must be fixed before serving the working checkout. CI runs these suites sequentially.

## Acceptance checks

New public-pages browser coverage creates disposable, explicitly labelled fixtures for every route, translated detail links, metadata, unknown locale/slug, private-global access and published content surviving a new draft. Historical design/browser tests now seed published homepage fixtures so responsive/keyboard/text-resize checks target the actual public renderer. No production claims or imagery is published by tests.

See PHASE-05-CLOSURE.md for current command results, gate verdict, issues and deferred work. PHASE-05-REVIEW.md and PHASE-05-EVALUATION.md remain historical snapshots.
