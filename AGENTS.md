# AGENTS.md — Codex Contract (Galung Website)

## Source of truth
Read `README.md`, the relevant numbered `documentation/*.md` and `documentation/DECISIONS-AND-OPEN-QUESTIONS.md` before changes. User's latest explicit decisions supersede these files; record approved changes in documentation. Do not silently reinterpret locked requirements.

## Product and scope guards
- ONE product: Galung. Basic/Pro and paid plans are **future considerations only**; don't create pricing, payment, subscription, license verification, customer auth, or customer dashboard during MVP.
- Public installers for Windows and macOS without login. Admin authentication is separate.
- ID/EN locale routes and localized copy/SEO. Do not manufacture translations; use explicitly identified sample copy until reviewed.
- Company legal identity and legally required information remain TBD; use editable CMS fields and no fictitious assertions.
- User-provided image is a **design reference**, not permission to publish its component photos/text as production assets.
- Hosting provider is undecided: design platform-portable services.

## Engineering rules
- TypeScript `strict`, App Router, React, Tailwind CSS, Payload CMS and PostgreSQL. Use a verified mutually compatible release set, pin versions and commit lockfile; do not guess package versions.
- Prefer Payload collections/globals and its DB adapter over adding Prisma/Drizzle without demonstrated need.
- Maintain clear modules for website components, CMS schema, auth/access, storage, localization, SEO, downloads and tests.
- Server-side access control for every sensitive read/write; never rely on hidden UI routes.
- Never proxy large installer files through Next.js serverless responses. Use direct-to-object-storage upload and delivery, with signed/upload-scoped authorization; validate files and only publish verified releases.
- Separate preview/draft from publicly published content; ensure CDN/cache invalidation on publishing.
- Protect admin endpoints, upload paths, contact form, secrets and personal data. Least privilege, rate limits, input validation, CSRF-related mitigations applicable to chosen auth, audit events.
- WCAG 2.2 AA target; keyboard support, reduced motion, proper semantics, accessible color contrast.
- SEO for both locales: canonical, hreflang, metadata, sitemap; noindex for admin, drafts and staging.
- Componentized UI with documented tokens; pages use reusable CMS blocks. Block ordering shared across locales in MVP; translated fields may vary.

## Working process for EVERY phase
1. Inspect repository and current state; list exact docs and relevant files reviewed.
2. State planned scope, dependencies, assumptions, touched files and acceptance tests.
3. Do not implement unrelated future-phase features. Mark unresolved decisions as TBD rather than guessing.
4. Make small, testable changes; preserve existing functionality.
5. Run available format/lint/typecheck/unit/build/e2e checks; explicitly report missing commands or failures.
6. Add tests for permissions, localization, content lifecycle and download paths where applicable.
7. Update docs/ADR when behavior changes; report completed tasks, open risks, next phase and commit-ready summary.

## Completion report template
- Phase and delivered acceptance criteria
- Files created/modified
- Commands executed and **actual** results
- Screens/routes/manual checks performed
- Security/accessibility/localization findings
- Open issues (severity and owner)
- Next concrete steps

NEVER claim deployment, test success, security compliance or production readiness without evidence.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
