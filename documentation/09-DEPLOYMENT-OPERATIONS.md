# 09 — Deployment, Hosting and Operations

## Hosting decision criteria
Commercial-use eligibility, Next.js + Payload compatibility, Node server/runtime behavior, region/latency, deploy model, environment config, limits, observability, predictable cost and support. **Do not select Vercel Hobby as Galung's commercial production platform without explicit eligibility verification.** Look at paid Vercel and appropriate Node/VPS options when planning production.

## Architecture by environment
Local: application + PostgreSQL locally, development storage or R2 dev bucket. Staging: separate database/storage and secret, noindex and authenticated access where appropriate. Production: `galung.id`, HTTPS, managed database or maintained Postgres, R2-style object storage for media/installers, monitoring and backups.

## Upload/download approach
Direct browser -> object storage multipart/signed upload for installer <1GB, never browser -> Next.js large binary upload. Store metadata/checksum in Postgres; serve public installer via CDN/object storage redirect. Validate storage policies, rate limiting, bandwidth/quotas and cache behavior before production.

## Runbook
Build and test; DB backup; migrate with rollback plan; deploy; smoke test ID/EN pages/admin/download; monitor errors; confirm scheduled backups; record release version and operator. Restore tests must be periodically exercised.

## Domain
`galung.id` canonical, `/id` and `/en` locales, `/admin` restricted; `downloads.galung.id` and `staging.galung.id` optional after choosing storage/hosting.

## Compliance/launch blockers
Company legal owner, privacy/contact disclosures, production asset licenses, hosting ToS, final installer signing/notarization expectations, data retention/consent and security review must be confirmed before public launch. These **do not block feature development**.
