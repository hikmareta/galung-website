# Phase 08 — deployment and operations runbook

28 October 2026. **Unexecuted deployment procedure.** Vercel web and Supabase database are selected; PHASE-08-VERCEL-SUPABASE.md is the target-specific supplement and supersedes persistent-VM examples below. Follow only after the
provider/account/region/budget and staging deployment approval are recorded in
[the hosting decision pack](PHASE-08-HOSTING.md). Production requires a separate
go/no-go. No infrastructure exists by virtue of this document. Current local-disk media must be replaced with tested durable object storage before Vercel deployment.

## Environment inventory and ownership

| Contract              | Staging                                                 | Production                                                   |
| --------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| Origin                | Proposed https://staging.galung.id; approval TBD        | https://galung.id                                            |
| Indexing              | PUBLIC_INDEXING=false at build and runtime; access gate | false until launch sign-off, then rebuild with true          |
| Database              | Separate synthetic PostgreSQL database and roles        | Separate database, private network and TLS verification      |
| Media                 | Separate durable media/ directory or reviewed adapter   | Separate durable media/ directory or reviewed adapter        |
| Installers            | Separate private versioned bucket and credentials       | Separate private versioned bucket and credentials            |
| Contact               | Disabled; local sink for QA, no real messages           | Disabled until mailbox, delivery and maintenance gate closes |
| Secrets               | Unique staging values                                   | Unique production values, restricted recovery escrow         |
| Owner/account/on-call | TBD                                                     | TBD                                                          |

Use `.env.example` as the actual variable inventory. Inject DATABASE_URL,
PAYLOAD_SECRET (independent random value >=32 characters), NEXT_PUBLIC_SITE_URL,
PUBLIC_INDEXING, CONTACT_* and DOWNLOAD_* through the approved secret manager.
Never copy `.env`, DB dumps, test credentials or bootstrap passwords into artifacts.
Do not enable GALUNG_TEST_DATABASE on either deployed environment. Preserve the
current blank architecture allowlist until actual builds are approved.

Build separately for staging/prod: NEXT_PUBLIC_SITE_URL is bundled and PUBLIC_INDEXING
also affects build-time headers. Do not relabel a staging build using runtime
variables alone. Build with a scoped same-environment database credential where
Payload requires it; no automatic schema push (`push:false`). Rotate credentials
after exposure and test session/recovery consequences before PAYLOAD_SECRET rotation.

## Preflight, artifact and release record

1. Preserve the current dirty tree. Before any remote release, review all intended
   changes, create an approved commit, and capture commit ID, lockfile hash, build
   ID, Node/pnpm versions and migration names. Do not deploy an unreviewed workspace.
2. Existing CI checks only; no CD workflow is enabled. Require green CI for that
   exact commit: frozen install, format, lint, generated types/import map, strict
   types, units, isolated DB rehearsal, integration, audit policy, build, E2E, SEO.
   Review the disclosed deepmerge mitigation; raw audit is not clean.
3. Linux artifact must preserve lockfile patches, migration sources, public/,
   package metadata and required runtime dependencies, including tsx/Payload CLI
   for operator jobs. Do not prune tools needed by `db:migrate`/worker scripts.
   Verify native dependencies on the actual host; Windows build is not Linux proof.
4. Name migration, DNS, release and incident operators; record previous artifact,
   backup IDs, restore commands, immutable installer version manifest and approval.

## Provisioning sequence after approval

1. Create isolated environment resources and private DB networking. Runtime DB
   role must not be superuser/CREATEDB; migration DDL role is separate and used
   only for migration jobs. Verify schema/table/sequence permissions and Payload
   KV/audit writes. Backups use restricted read access, restores a separate role.
2. Run one web instance initially. Current cache invalidation is process-local;
   multiple replicas/CDN HTML caches require tested coordination before scaling.
   No edge cache for admin, API, preview, cookies or authorization. Honor no-store.
3. Current Media stores files at `path.resolve('media')`. Mount a durable directory
   there, owned by the unprivileged app user. Test approved and unapproved media
   access through Payload; do not expose the directory as a public static bucket.
   Back it up consistently with DB and retain files referenced by history. An
   object-store migration requires a compatible pinned adapter and access tests;
   it is not implemented here. Persistent disks may prevent rolling/parallel
   deploys: plan a maintenance window, not an unsupported zero-downtime promise.
4. Supervise web, Contact maintenance and installer verification independently.
   Exact host unit/service configs follow provider selection. No shell startup
   script that runs a migration on every replica boot. Restart on failure, bound
   job overlap, alert on stale completion and give graceful shutdown time.

Commands below are **operator instructions, not executed remote actions**. They
assume pinned Node 24.22.1/pnpm 10.34.9 and secrets injected securely. Existing job
scripts read `.env` explicitly: on a host create a restricted file from its secret
store or use an empty `.env` with injected variables; never bundle real secrets.

```text
pnpm install --frozen-lockfile
pnpm db:status
pnpm build
# Only after verified backup + schema review, one migration operator:
pnpm db:migrate
pnpm db:status
# Same-host reverse proxy uses existing loopback start:
pnpm start
# Managed ingress/container alternative (not publicly exposed without ingress):
pnpm exec next start --hostname 0.0.0.0 --port <assigned-port>
# First administrator only, temporary bootstrap secrets injected then removed:
pnpm admin:create
# Separate supervised jobs, never HTTP installer streaming:
pnpm contact:worker
pnpm contact:status
pnpm downloads:verify
```

Contact worker runs maintenance on startup and hourly. Supervise failure and
heartbeat age; status must report healthy before enabling Contact. Run installer
verification on a proposed five-minute schedule, with no overlapping invocations,
until the backlog drains; each invocation covers at most 100 uploaded assets.
Schedule/thresholds are proposals for operator approval. Invalid installer exits
nonzero and needs release-owner review; do not blindly retry known-invalid files.
Workers and maintenance writes outside HTTP need explicit web cache refresh/restart
when they change public content, as documented in the CMS runbook.

## DNS, TLS and ingress

Export existing DNS records securely and record rollback values before changes.
Verify domain ownership and authoritative nameservers with the owner. Preserve
MX/SPF/DKIM/DMARC and unrelated TXT records. Add only selected-provider A/AAAA/CNAME
records after checking targets; remove stale IPv6 if the host lacks support. Use
a temporary low TTL for cutover, restore normal TTL afterwards. Prove apex and
chosen www redirect, no redirect loops and no dangling provider aliases.

Issue managed/ACME certificates, verify chain, renewal and HTTPS redirection.
Avoid HSTS preload/includeSubDomains until every relevant subdomain is audited;
roll out HSTS only after HTTPS/renewal verification. Keep DB and Node origin
unreachable from the public internet; restrict administrative SSH to approved
access. Trusted forwarded-IP headers must be stripped/replaced at ingress before
CONTACT_TRUSTED_IP_HEADER is set; otherwise keep its shared-limit default.

Complete Phase 07 MFA/recovery and CSP work before exposing admin. A gateway
must cover all sensitive CMS API/login/reset/preview paths, not just /admin;
anonymous published media/download/contact paths must remain usable. Test bypass
through alternate hostnames and direct origin. Add provider ingress rate/body
limits compatible with current 9 MiB CMS request limit (8 MiB images), bounded
Contact/installer JSON and signed storage uploads; installer bytes bypass ingress.
Test CSP in report-only then enforce with real Payload editor/Next script behavior.
Do not fabricate a nonce or call the existing headers a complete CSP.

## Installer storage and release gate

Follow [Phase 06](PHASE-06-DOWNLOADS.md) exactly: private bucket, versioning,
version-pinned reads, exact-origin CORS, prefix-scoped IAM, HTTPS, one-day abandoned
multipart cleanup, no deletion/expiry of referenced versions. Use distinct
credentials per environment; separate verifier/read/upload identities where the
chosen provider and current adapter configuration permit. Never claim separation
the implementation does not enforce. Block anonymous listing/direct unsigned reads.

Test real multipart completion returns VersionId; HeadObject/GetObject accept
that version; independently verify full hash/size/format. Wrong hash, wrong role,
expired session and outage must fail closed. Release owner additionally verifies
signing/notarization, architecture, provenance and Windows/macOS installation.
Then publish reviewed ID/EN notes with the exact approved asset snapshot. Anonymous
GET /api/downloads/<id>?locale=id must return an empty 302 to storage; follow in a
separate client to verify bytes and digest. Verify retirement blocks new redirects;
previous signed URLs may live up to 60 seconds. Do not record signed URL queries.

## Backups and restore rehearsal

RPO/RTO/retention/budget require owner approval. Proposed starting targets: RPO
24 hours, RTO 4 hours, daily encrypted off-host DB+media backups for 30 days and
pre-migration snapshots; managed PITR if purchased. These are not tested promises.
Include CMS history/audit, globals, release/asset metadata, matching media and an
installer version manifest. Versioning is not an independent backup. Restrict
backup deletion and encrypt with recoverable separately held keys. Do not retain
Contact data indefinitely in backups; approve bounded expiry and a restore-time
30-day purge procedure. Backup locations/jurisdiction and restore access are TBD.

On a compatible PostgreSQL client, inject connection details securely (avoid
passwords in arguments/logs), then use the approved backup/restore roles:

```text
pg_dump --format=custom --file=<encrypted-volume>/predeploy.dump
pg_restore --list <encrypted-volume>/predeploy.dump
# Into a NEW isolated target, selected via secured connection configuration:
pg_restore --exit-on-error --no-owner --no-acl --dbname=<isolated-db-name> <encrypted-volume>/predeploy.dump
```

Listing is not restore proof. Restore into an isolated environment with outbound
mail disabled, paired media snapshot, and no public ingress. Reapply role grants,
purge expired Contact data, check migration ledger/counts and sample localized
published/draft/media/release references and actual stored installer versions.
Measure RPO/RTO and record operator, timestamps, backup/manifest hashes and results.
Monthly rehearsal is proposed; require a successful actual staging drill before
launch. Never restore destructively over a running production DB as a smoke test.

## Observability and incident response

Provider/tool and recipients TBD; no monitoring is active from this document.
Configure external HTTPS probes for both locale homepages and reviewed Download
pages (expected content, not status alone), TLS expiry and origin availability.
No generic readiness endpoint currently exists; these probes plus private DB/job
checks are required. Monitor 5xx/error rate, latency, memory/disk, DB connections,
backup age/restore result, worker failures/backlog, retention health and budget.
Suggested alerts: two consecutive failed one-minute probes, certificate <14 days,
backup age >26 hours, Contact heartbeat >2 hours, verifier backlog >15 minutes.
Approve thresholds and prove delivery to named primary/backup operators.

Use request/release IDs, timestamp, route template, status and safe error category.
Redact Authorization/Cookie/Set-Cookie, secrets, signed URLs, reset/preview tokens,
contact bodies/email, raw query strings and DB URLs. Restrict log access; retention
TBD pending privacy approval. Test redaction with synthetic canaries before real
traffic. Payload audit events complement, not replace, runtime/ingress logs.

For an incident: acknowledge, record timeline, contain affected service, disable
Contact/release exposure if needed, preserve redacted evidence, choose rollback
or forward fix, verify both locales and access boundaries, then review causes.
Credential compromise requires revocation/rotation and provider access review.

## Rollback and launch record

Keep the previous immutable artifact and pre-migration backup manifest. For an
application-only regression with compatible schema, restore the previous artifact,
restart web/workers, purge relevant caches and repeat smoke tests. DNS rollback
alone cannot undo schema changes and propagates according to cache TTL.

For incompatible schema, stop writes and jobs, preserve post-release evidence,
restore the paired DB/media snapshot into a new target, point the matching old
artifact at it and validate before cutover. Quantify lost writes against agreed
RPO. Prefer a reviewed forward fix where feasible. Never run `migrate:down` blindly
on production: Phase 06 down migrations reset release publication/verification.
Reapplication needs verification and fresh publication; see the Phase 06 runbook.

Record each launch gate with approver/date and evidence URL: provider/terms/budget,
CI commit, staging isolation/noindex, DNS/TLS/renewal/origin protection, MFA/recovery,
CSP/rate limits, least-privilege roles, real storage/signed builds, restore and
rollback drill, alert delivery/redaction, approved content/legal/assets/ID+EN,
screen-reader/cross-browser/representative performance review, editor rehearsal.
Contact remains disabled until its separate activation gate is fulfilled.

Staging smoke must verify AT-01–12 from doc 10: locales/navigation/equivalent
slugs; draft privacy/shared ordering; role denial including direct API; media
approval/access; anonymous both-OS downloads and invalid verification denial;
private legal edits/audit; invalid Contact handling; keyboard/native admin controls;
canonical/hreflang/sitemap and sensitive noindex. Also test cache refresh through
the real proxy/CDN, Secure cookies, storage outage, alerting and backup restore.
Noindex is not access control. Use synthetic fixtures, not invented legal facts.

Production go/no-go requires named approval of all applicable gates and a rollback
window. Repeat safe read/access smoke after cutover, enable indexing only after
approved content and rebuild, verify robots/sitemap/headers, monitor and record
handover acceptance. Missing gates mean **NO-GO**, not an implicit launch waiver.
