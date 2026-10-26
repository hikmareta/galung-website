# 02 — Technical Architecture

## Pattern
Portable **modular monolith**: one Next.js App Router app hosts public rendering and Payload admin/API, backed by PostgreSQL and external object storage. Keep business concerns separated in modules, not separate network services initially.

## Proposed stack
TypeScript strict; Next.js App Router; React; Tailwind CSS; Payload CMS with compatible Postgres adapter; next-intl or equivalent internationalization layer; shadcn/ui selectively; Zod for custom endpoints; Vitest and Playwright; pnpm; GitHub Actions (optional). Do **not** hard-code versions without checking current official compatibility; commit pinned lockfile.

Phase 02 implements the compatible core with exact versions and pnpm lockfile;
see `PHASE-02-FOUNDATION.md`. Native Node tests cover the small foundation helpers;
Playwright covers browser behavior. No extra test framework or locale library is
needed yet for the two explicit route samples. Add them only when later content
workflows justify the dependency. No custom input endpoint, rich-text field,
uploads or third-party ORM is introduced in this phase.

## Architectural boundaries
- Public renderers only fetch **published**, locale-appropriate content via server-side data access.
- Payload collections/globals model editors, media, pages, news, projects, product and releases; access controls enforce roles on reads and writes.
- Localized routes `/id` and `/en`; `/` resolves to a default/negotiated locale deterministically; admin route unlocalized `/admin`.
- CMS blocks are schema-driven; visual React block registry maps allowed `blockType` to presentational components.
- Content drafts/preview authenticated via secure preview flow, distinct from public cached content.
- Published content changes invalidate affected pages and indexes; never cache privileged responses for public reuse.
- Direct object uploads for potentially large installer files; asynchronous/verified checksum and file metadata before publish. Download link uses redirect to storage/CDN, not application binary proxy.
- Storage credentials server-only; public links only for intentionally public assets.

## Trust boundaries
Browser -> public web endpoints (untrusted); authenticated editor -> CMS endpoints (role-gated); CMS -> DB and storage (private credentials); visitor -> approved CDN/download endpoint. Separate read-only public access from admin mutation.

## Suggested modules
`src/app` (website and Payload routes), `src/collections`, `src/globals`, `src/blocks`, `src/components`, `src/lib/i18n`, `src/lib/seo`, `src/services/downloads`, `src/access`, `src/hooks`, `src/styles`, `tests`. Follow the official Payload scaffold route layout, not a blindly imposed directory tree.

## Environment contracts
`DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, object-storage endpoint/bucket/access credentials, contact integration secret, optional monitoring config. Populate `.env.example` with descriptions **without real secrets**.

## Production portability
Choose runtime-compatible hosting after measuring cost and checking commercial terms; Vercel Hobby must not be assumed valid for commercial production. Persistent Postgres and object storage are separate services. Dev, staging and prod isolated, with migrations and backups.

## Future expansion
A single product model may later reference multiple editions, but no edition/pricing/checkout tables or UI are required until specifically approved. Keep future functionality **documented**, not partially implemented.
