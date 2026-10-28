# 09 — Deployment, Hosting and Operations

Phase 08 preparation, 28 October 2026: current detailed procedures are in the
[hosting decision pack](PHASE-08-HOSTING.md), [operations runbook](PHASE-08-RUNBOOK.md)
and [editor handbook](EDITOR-HANDBOOK.md). [Evaluation](PHASE-08-EVALUATION.md)
records actual local checks and unexecuted remote gates. The user selected Vercel web and Supabase PostgreSQL; see PHASE-08-VERCEL-SUPABASE.md. These documents do not
provision resources or authorize deployment. Current media is
local disk: a tested object-storage adapter is mandatory before Vercel staging.

## Hosting decision criteria
Commercial-use eligibility, Next.js + Payload compatibility, Node server/runtime behavior, region/latency, deploy model, environment config, limits, observability, predictable cost and support. **Do not select Vercel Hobby as Galung's commercial production platform without explicit eligibility verification.** Look at paid Vercel and appropriate Node/VPS options when planning production.

## Architecture by environment
Local: application + PostgreSQL locally, development storage or R2 dev bucket. Staging: separate database/storage and secret, noindex and authenticated access where appropriate. Production: `galung.id`, HTTPS, managed database or maintained Postgres, R2-style object storage for media/installers, monitoring and backups.

## Upload/download approach
Direct browser -> object storage multipart/signed upload for installer <1GB, never browser -> Next.js large binary upload. Store metadata/checksum in Postgres; serve public installer via CDN/object storage redirect. Validate storage policies, rate limiting, bandwidth/quotas and cache behavior before production.

Phase 06's implemented adapter requires private bucket versioning and version-pinned reads. S3-compatible providers without those semantics are currently unsupported; the earlier R2-style example is not a provider selection or compatibility claim. Verify these capabilities before selecting hosting/storage. See PHASE-06-DOWNLOADS.md for IAM/CORS/lifecycle and verification-worker requirements.

## Runbook
Build and test; DB backup; migrate with rollback plan; deploy; smoke test ID/EN pages/admin/download; monitor errors; confirm scheduled backups; record release version and operator. Restore tests must be periodically exercised.

Dependency checks use `pnpm audit:policy`, which retains the full raw registry audit and verifies the narrowly scoped deepmerge patch and regressions before accepting the known LOW advisory. Raw audit is not claimed clean while that registry entry remains. See DEPENDENCY-SECURITY.md for fail-closed conditions, CI evidence and upstream maintenance. A new advisory or patch drift must block the check.

## Domain
`galung.id` canonical, `/id` and `/en` locales, `/admin` restricted; `downloads.galung.id` and `staging.galung.id` optional after choosing storage/hosting.

## Compliance/launch blockers
Company legal owner, privacy/contact disclosures, production asset licenses, hosting ToS, final installer signing/notarization expectations, data retention/consent and security review must be confirmed before public launch. These **do not block feature development**.
