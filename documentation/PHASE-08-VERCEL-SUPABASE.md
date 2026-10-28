# Selected direction — Vercel web and Supabase database

28 October 2026. User explicitly selected **Vercel for web hosting and Supabase
for the database** during Phase 08. This supersedes the initial portable-VM
recommendation and provider-TBD statements for these two services only. Plans,
region, credentials, storage, workers and deployment approval remain open.
No project was created, linked, purchased or deployed.

## Cost and account approval

Propose Vercel Pro for commercial eligibility and Supabase Pro with separate
staging/production projects. Plan purchase is not implied by provider selection.
Official Supabase pricing: $25/month organization, Micro compute $10 per project,
$10/month compute credit. Two full-month Micro projects in one organization imply
`25 + 2 × 10 - 10 = $35/month` database baseline. With the advertised Vercel
$20 baseline, the combined starting point is **$55/month**, before extra seats,
usage/egress, durable media, versioned installer storage, workers, independent
backups/PITR, monitoring, domain/mail, tax and labor. Confirm checkout and billing
scope; included transfer credits are not a blanket allowance for external storage.

Supabase Pro lists seven-day automatic DB backups; optional PITR starts at
$100/month per seven days of retention. Neither proves restored files or the
proposed 30-day independent backup policy. Obtain exact quotes and approve RPO,
RTO and retention. Do not use free-tier expiry/pausing as the production strategy.

Sources checked 28 October 2026: [Supabase pricing](https://supabase.com/pricing),
[Vercel pricing](https://vercel.com/pricing). Cost model and transfer sensitivity
in [the comparison](PHASE-08-HOSTING.md) still apply; alternative-host rows are
comparison evidence, not the chosen implementation.

## Concrete configuration prepared

Root `vercel.json` sets Next.js, frozen pnpm install, the existing build command
and private deployment logs/source. It contains no secrets, domains, project IDs,
region, cron, migration hooks or deploy credentials. It has not been validated by
a live Vercel build. Keep the pinned package/lockfile and local CI workflow.
[Vercel configuration reference](https://vercel.com/docs/project-configuration).

After account approval, prepare separate staging and production Vercel projects
with separate Supabase projects. Select co-located available regions after checking
actual latency, residency and current plan options. Set Vercel Node 24.x and
verify the actual patch satisfies package.json (>=24.22.1 <25). Do not change
Next/Payload pins or replace Payload authentication with Supabase Auth.

Scope secrets independently for each Vercel environment: DATABASE_URL,
PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL, PUBLIC_INDEXING=false initially,
CONTACT_ENABLED=false and actual storage variables only after its provider is
approved. Protect preview deployments and never inject production secrets into
untrusted PR builds. Stable staging origin must match exact CORS/CSRF origins;
arbitrary preview URLs are not automatically authorized. Rebuild for the correct
origin/indexing setting. Do not enable Git auto-deploy/import until staging is
approved and its blockers below are closed. Production promotion stays manual.

## Supabase connection and data-access gates

Keep `@payloadcms/db-postgres`; Supabase supplies PostgreSQL, not a replacement CMS.
Copy endpoints from the actual dashboard, never infer project/pooler names.
Supabase documents transaction pooling for serverless and direct connections for
migrations/backups; direct connectivity may require IPv6 or its paid IPv4 option.
Session pooling is an IPv4 alternative. Use certificate-verified TLS and distinct
runtime, migration and restore identities; no service-role key in client code.
[Connection reference](https://supabase.com/docs/guides/database/connecting-to-postgres).

The current adapter accepts node-postgres PoolConfig, but payload.config.ts only
sets connectionString and inherits its pool defaults. Before deployment implement
and load-test a bounded pool for Vercel concurrency, with explicit connection
timeouts and verified TLS. Do not paste Postgres.js `prepare:false` into this
node-postgres adapter: inspect actual query/prepared-statement behavior and test
transactions/KV leases under the chosen pooler. Transaction poolers have session
state restrictions. Use a separate operator-injected DATABASE_URL for migrations
and pg_dump/restore, never migrate inside the web build or each function startup.
[Driver guidance](https://supabase.com/kb/troubleshooting/disabling-prepared-statements-qL8lEL).

Supabase's data API is a second access boundary independent of Payload RBAC.
Before importing data, disable its exposure for CMS tables or remove exposed
schema access and prove anon/authenticated API keys cannot read users, drafts,
Contact records, audit data or release metadata. Do not assume Payload collection
access applies to Supabase REST/GraphQL. Keep runtime SQL access narrowly scoped;
record and test the actual project/grant configuration. Do not move existing
migrations into a new schema without a reviewed migration plan.

## Blocking compatibility work before a staging deployment

1. **CMS media:** current disk uploads cannot persist on Vercel. Select an object
   storage provider, pin a mutually compatible Payload adapter and preserve private
   unapproved files, approval reads, immutable replacements and reference/history
   safeguards. Existing CMS uploads can reach 8 MiB; verify Vercel's current body
   limits and use a supported direct-upload design if required. An object-store
   adapter alone does not prove those security or upload semantics. This is not
   implemented merely by adding vercel.json.
2. **Installers:** Supabase Storage explicitly lacks S3 bucket versioning and is
   incompatible with the current version-pinned installer adapter. Keep a separate
   version-capable provider (AWS S3 remains a candidate) or obtain explicit approval
   for an alternative integrity design and test it. Do not disable version checks.
   [Supabase compatibility](https://supabase.com/docs/guides/storage/s3/compatibility).
3. **Workers:** select separate bounded-job compute for downloads:verify and Contact
   maintenance. Do not start the hourly worker in a Vercel request or stream large
   files through functions. A scheduler alone is not a proven worker runtime.
4. **Cache/access:** test publication/retirement through Vercel's actual distributed
   cache, protected previews, sensitive no-store, private media, auth cookies, rate
   limits, CSP and all admin API/MFA/recovery paths. Supabase MFA does not itself
   protect Payload users. Existing process-local behavior is not hosted evidence.
5. **Recovery:** rehearse compatible migrations, restore and app/schema rollback
   against disposable Supabase data, plus external media/version manifest and
   worker health. Vercel artifact rollback does not roll back PostgreSQL or buckets.

Follow [the operational runbook](PHASE-08-RUNBOOK.md) for DNS/TLS, least privilege,
alerts, redaction, launch gates and handover; its persistent-VM mount/start examples
apply only to alternatives, not to this selected Vercel target. Before approval
record plan/region/budget/terms, storage and worker choices and secure credential
availability. These blockers prevent a claim of deployability or production readiness.
