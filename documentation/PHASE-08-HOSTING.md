# Phase 08 — hosting decision pack

Prepared 28 October 2026. **Vercel web + Supabase database selected by the user; see PHASE-08-VERCEL-SUPABASE.md. Budget, region and terms
acceptance remain TBD. No purchase, provisioning or deployment is approved.**

## Runtime and eligibility

The installed set is Node 24.22.1, pnpm 10.34.9, Next 16.4.3, Payload 3.92.0,
React 19.2.6 and PostgreSQL 17.10. Preserve package pins, lockfile and patches.
The installed Next deployment/self-hosting guides support a full Node server;
static export cannot host this CMS. A persistent worker must run installer
verification separately from HTTP. Contact maintenance already has a worker mode.

| Candidate                                               | Commercial assessment                                                                                                        | Runtime and operational fit                                                                                                                                                                                                                    | Decision                                                                                                               |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| DigitalOcean Droplets + managed PostgreSQL + AWS S3     | Paid business infrastructure candidate under provider agreement; owner must accept terms/DPA, account eligibility and region | Can install exact Node/pnpm; persistent Node and workers, managed DB, durable media disk. Operator owns OS, TLS, ingress, patching and recovery                                                                                                | Initial recommendation, superseded by the Vercel/Supabase selection; viable **if a named Linux operator is available** |
| Render paid compute + managed PostgreSQL + AWS S3       | Paid commercial candidate; use current workspace plan and terms, not assumptions about free plans                            | Official Node default currently 24.22.1; explicitly pin it. Separate worker/schedules and durable media mount required. Existing start script binds loopback: managed ingress needs an explicit 0.0.0.0 launch command                         | Unselected alternative; current full quote remains pending                                                             |
| Vercel Pro + external DB/storage + separate worker host | Pro candidate; Hobby explicitly excludes commercial use                                                                      | Node 24 supported but patch managed by provider. Ephemeral filesystem cannot retain existing CMS media; requires a tested media storage adapter. Separate verifier/retention compute, connection pooling and function limits need verification | More adaptation than a persistent Node host; do not deploy existing media configuration here                           |

These are engineering suitability assessments, not legal opinions or assertions
that account-specific agreements were accepted. MFA/gateway, CSP and ingress gates
from Phase 07 apply to every candidate. The user subsequently selected Vercel + Supabase; this comparison retains the alternatives as historical assessment.

## Comparable monthly cost model

USD before taxes/FX, domain renewal, mailbox, paid support and operator time.
Assumptions for comparison: two isolated always-on environments, one web instance
and database per environment, 20 GB total CMS media, 50 GB retained installer
versions, 20 GB backup data, 10,000 web visits and 1,000 downloads averaging
0.5 GB (500 GB installer egress). Traffic is a planning scenario, not a forecast.
Staging uses synthetic content and test installers. No production database clone.

| Candidate    | Verified published components                                                                                                                              | Two-environment subtotal and omissions                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DigitalOcean | 4 GiB/2 vCPU web VM $24/month each; managed DB 1 GiB advertised $15.15 each, storage shown separately at $0.215/GiB/month; daily VM backup 30% of VM price | $48 web + $30.30 DB compute + $4.30 for two 10 GiB DB allocations + $14.40 VM backups = **$97.00 planning subtotal**. Confirm whether checkout includes baseline DB storage to avoid double counting. Existing VM disks hold media; workers share each environment's VM initially. Add independent backup storage, S3, monitoring, DNS/mail, tax and labor. Single-node DB is not HA; restore, capacity/build memory and backup coverage remain gates |
| Render       | Current Pro workspace $25/month; official indexed pricing exposes 1 GiB DB compute $19/month, expandable storage $0.30/GB, persistent disk $0.25/GB        | Known components: $25 + 2 × $19 + 20 × $0.30 + 20 × $0.25 = **$74/month before both web services, workers/schedules, S3 and backup/monitoring/egress**. Dynamic pricing page did not expose all current compute rows reliably; obtain exact current quote before comparing totals. This is not a complete $74 hosting offer                                                                                                                           |
| Vercel Pro   | Advertised $20/month baseline, $20 included usage credit                                                                                                   | **$20 baseline only** plus two DBs, media object storage/adapter, external workers, backups, monitoring and usage beyond applicable credit. Seats, preview isolation, regional pricing and overages need checkout verification; no credible all-in fixed quote yet                                                                                                                                                                                    |

Common addition for every row: `S3 = retained_GB × regional_storage_rate +
PUT/GET/HEAD/LIST charges + billable_egress_GB × regional_egress_rate +
replication/KMS/retrieval costs if enabled`. Versioned/noncurrent objects consume
billable storage. AWS publishes a first 100 GB/month internet transfer allowance
aggregated across eligible AWS services/regions; do not allocate it twice or
assume it is available to this account. In the 500 GB scenario, 400–500 GB may
remain billable depending on account usage. Verification also reads each new file
from S3 to the worker: budget cross-provider transfer separately.

Sensitivity examples using **assumed**, not quoted, rates of $0.025/GB storage
and $0.12/GB internet egress: 50 GB installers cost $1.25 storage; 400 GB egress
costs $48, or $60 without an available allowance. At 10,000 downloads (5,000 GB),
4,900–5,000 GB costs $588–600 at that illustrative rate. Replace these rates with
the chosen region/account calculator quote before approval. The DO planning
subtotal plus this example installer storage/egress is $146.25–158.25, still
excluding requests, independent backups, monitoring, mail, domain, taxes and labor.

Full TCO includes both-environment compute, DB/storage, workers, retained object
versions, delivery/verification transfer, independent backups, monitoring/logs,
DNS/domain/mail, support/tax and operator_hours × agreed_hourly_rate. Labor and
RPO/RTO are TBD, so no final total or cheapest-provider claim is justified.
Set billing alerts at 50/80/100% of the approved budget; preserve backups and
retirement controls during traffic spikes. Alerting is not a hard spend cap.

## Approval record to complete before provisioning

Record owner/date, provider/services, exact region, current commercial terms and
DPA acceptance, account ownership/MFA/recovery, monthly ceiling, traffic budget,
backup retention/RPO/RTO, named operator, DNS authority and secure credential
handover. Obtain an exact quote for both environments and common costs above.
Credentials belong in a secret manager, never this record or chat. Provider
selection permits preparing its final configuration; staging deployment and
production launch each require explicit approval and their own gate evidence.

## Official sources checked

Checked 28 October 2026; prices can change. Search-index excerpts sometimes expose
pricing tables missing from the dynamically rendered page; recheck checkout.

- [DigitalOcean Droplet pricing](https://www.digitalocean.com/pricing/droplets)
- [DigitalOcean managed DB pricing](https://www.digitalocean.com/pricing/managed-databases)
- [DigitalOcean agreement](https://www.digitalocean.com/legal/terms-of-service-agreement)
- [Render pricing](https://render.com/pricing), [workspace pricing change](https://render.com/blog/better-pricing-for-fast-growing-teams), [Node versions](https://render.com/docs/node-version), [terms](https://render.com/terms)
- [Vercel pricing](https://vercel.com/pricing), [commercial-use restriction](https://vercel.com/docs/limits/fair-use-guidelines), [Node 24 support](https://vercel.com/changelog/node-js-24-lts-is-now-generally-available-for-builds-and-functions)
- [S3 pricing](https://aws.amazon.com/s3/pricing/), [versioning semantics](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)

AWS S3 is a capability candidate for the current version-pinned adapter, not an
approved purchase. R2 or another S3-compatible name alone is insufficient proof
of the required multipart/version-ID/HeadObject/GetObject behavior.
