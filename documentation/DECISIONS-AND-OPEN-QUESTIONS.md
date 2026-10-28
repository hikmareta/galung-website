# Decision Register

## Phase 08 preparation activated — 28 October 2026

**Subsequent user decision:** web hosting will use Vercel; database will use
Supabase. This supersedes the initial provider-TBD/recommended-VM proposal below.
PHASE-08-VERCEL-SUPABASE.md records costs, minimal local vercel.json and required
media, pooling/API-exposure, worker and versioned-installer compatibility work.
No plan purchase, region, storage provider, worker host, budget, credentials or
staging/production deployment approval is inferred. Supabase is PostgreSQL only;
Payload retains CMS authentication/access. Supabase Storage's missing S3 versioning
precludes using it with the existing installer adapter without a separate approved
design change. No deployment occurred.

User explicitly requested hosting/runtime/TCO comparison, approval-gated staging
and production setup, operations/editor handover and phase evaluation. Earlier
no-automatic-Phase-08 statements are superseded for this preparation scope only.
No provider, region, budget, credentials or deployment approval was supplied.
PHASE-08-HOSTING.md recommends a portable paid Node host conditionally, compares
Render and Vercel Pro, and distinguishes published prices from cost assumptions.
This is a recommendation, not an approved provider or purchase.

PHASE-08-RUNBOOK.md specifies environment isolation, durable current media storage,
DNS/TLS, private DB roles, jobs, real versioned installer gates, redacted monitoring,
paired backup/restore and safe schema-aware rollback. Proposed RPO/RTO, schedules,
retention and alert thresholds need owner approval. EDITOR-HANDBOOK.md describes
implemented roles and bilingual shared-layout publishing without inventing copy.
Named operators, MFA/recovery/CSP/ingress work, live storage/build verification,
Contact activation and legal/content/translation approvals remain unresolved.
Phase 08 stays PARTIAL until real staging smoke, rollback/access/backup evidence
and separately approved production handover exist. No new commercial features.

## Fresh Phase 06 review — 28 October 2026

User requested evaluation of the completed phase. PHASE-06-REVIEW.md supersedes the historical local PASS with PARTIAL based on reproduced upload recovery/duplicate-publication and native file-selection issues, plus the current LOW Payload/deepmerge dependency advisory. Ordinary local transport, permissions, checksum/localization/lifecycle checks pass. This records review evidence, not new business requirements, application fixes, provider/build approval, Contact activation or later-phase authorization. Existing live storage/signing/architecture/content decisions remain TBD. Recommended next scope is Phase 06 remediation and reevaluation.

## Phase 06 activation — 27 October 2026

User explicitly authorized the download system and phase evaluation. Implementation uses a private versioned S3-compatible bucket, short-lived scoped multipart parts, a separate CLI whole-file SHA-256/format verifier, immutable asset records and explicit ID/EN release approval snapshots. Only Super Admin manages releases; anonymous visitors download approved stable builds without login. Active publication requires both Windows and macOS builds; actual architectures must be explicitly configured from approved builds and remain TBD. Versioning is an adapter prerequisite, not a hosting-provider selection. New interface labels are identified as unreviewed samples. Provider/IAM/CORS/lifecycle, signing/notarization, real installation and production content verification remain distinct launch gates. See PHASE-06-DOWNLOADS.md and PHASE-06-EVALUATION.md; no later phase, commercial functionality, Contact activation or deployment is authorized automatically.

## Confirmed 2026-10-24
- Brand: Galung, owned by company whose identity is not yet specified.
- Domain: `galung.id`.
- Product: one Galung application in MVP; Basic and Pro future only.
- Site languages: ID/EN; Indonesian proposed default.
- Platform: Windows/macOS; public download no login; each installer <1GB.
- Site function: corporate identity, product showcase, portfolio, news, highlights and contact.
- Admin: edit text/media and rearrange predefined section order.
- Visual reference: screenshot (`references/UI Galung.jpg`), premium light/forest green/gold.
- No user payments in MVP; no public customer account portal.
- Hosting undecided; assess commercial ToS and runtimes before choosing.

## Open items and blocking stages
| Item | Status | Must resolve before |
|---|---|---|
| Production logo and source brand files | TBD | Visual production sign-off |
| Permission to publish photos and claims from screenshot | TBD | Publishing real content |
| Actual installer OS architectures + signing | TBD | Release testing/public launch |
| Versioned installer bucket, provider IAM/CORS/lifecycle and worker operations | TBD; adapter prerequisites in PHASE-06-DOWNLOADS.md | Real Phase 06 upload/download activation |
| Product requirements and minimum supported OS | TBD | Final download content |
| Legal company name/address | TBD; CMS editable | Public legal/company statements |
| Contact destination/email | admin@galung.id approved 27 October; delivery configuration TBD | Working contact form launch |
| Contact retention | Website copy: 30 days approved; inbox retention TBD; deletion workflow pending | Working contact form launch |
| Final privacy/terms policies | TBD | Public launch |
| Production provider and ToS | Vercel web + Supabase DB selected 28 October; plans/terms/budget/region/credentials remain TBD | Deployment |
| Admin role assignments and content approver | TBD | CMS release |
| Whether language detection redirect is desired | Proposed | Routing sign-off |

Record later user-approved changes with date and rationale. Do not silently implement guesses.

## Phase 02 activation — 2026-10-26

The user subsequently authorized full remediation of Phase 02 findings, provided
the Git author identity and authorized push to https://github.com/hikmareta/galung-website.git.
`PHASE-02-CLOSURE.md` records the resulting fixes and delivery evidence, superseding
the historical PARTIAL verdict below. Production hardening remains at its existing
Phase 04/07/08 gates; this does not authorize advancing to Phase 03.

Fresh evaluation on the same date supersedes the initial PASS verdict with PARTIAL.
See PHASE-02-REVIEW.md for reproduced reset-password policy bypass, test isolation
and timeout-assertion gaps, and missing initial repository/lockfile commit. No
business decision changes and no Phase 03 authorization are implied by this review.

The user explicitly authorized repo/technical foundation implementation under the Phase 02 gate. Exact verified package pins, local-only PostgreSQL, operator-created initial admin and foundation sample routes are documented in PHASE-02-FOUNDATION.md. The minimal role set is active Super Admin only until Phase 04 introduces editorial RBAC. This technical implementation does not resolve business/legal/hosting/translation TBDs or approve sample copy for publication. See PHASE-02-EVALUATION.md for measured gate status; Phase 03 is not automatically started.

## Phase 01 audit status — 2026-10-25 (historical; superseded by approval below)

Requirements/reference audit and proposed visual interpretation are recorded in `PHASE-01-AUDIT.md`, with `../references/PHASE-01-ANNOTATIONS.html` and `PHASE-01-EVALUATION.md`. Existing locked decisions remain unchanged. Content requirements and visual interpretation await explicit product/design owner sign-off under the Phase 01 gate; creation of the audit is not approval. No later phase started. Asset rights, product claims, legal identity and locale policies remain TBD as listed above.

## Persetujuan Phase 01 dan tambahan konten — 2026-10-25

Pengguna menyatakan “Saya menyetujui semuanya” atas hasil Phase 01. Gate sign-off konten requirements dan interpretasi visual Phase 01 ditutup; catatan pending pada laporan sebelumnya adalah status historis yang kini digantikan persetujuan ini. Pengguna juga meminta foto berlisensi gratis dan draf konten utama terlebih dahulu untuk melihat hasilnya. Lingkup tambahan: riset lisensi/kredit, konten ID berlabel draf dan pratinjau lokal; tidak memulai implementasi penuh/deployment. Lihat CONTENT-AND-PHOTO-PACK.md dan CONTENT-PREVIEW-EVALUATION.md. Persetujuan atas audit tidak menetapkan fakta produk/legal yang sebelumnya TBD, dan tidak menjadi persetujuan otomatis atas draf baru atau terjemahan yang belum ditinjau.

## Revisi visual mengikuti referensi — 2026-10-25

Pengguna meminta kecocokan visual sedekat mungkin dengan referensi, tombol header lebih elegan sesuai referensi, hero buatan AI dengan gradasi gelap, tambahan visual buatan dan ikon. Arahan ini menyetujui pembuatan ilustrasi konseptual orisinal menggunakan referensi sebagai panduan komposisi. Bukan izin mengambil foto referensi sebagai aset produksi. Lingkup tetap pratinjau lokal satu Galung, tanpa checkout/customer dashboard atau fase fondasi penuh.

Tiga ilustrasi baru: hero konduktor/ansambel, laptop konseptual, panggung komunitas. Kartu ganda menyajikan produk tunggal dan inspirasi budaya, bukan edisi berbeda. Copy hero ID baru “Musik melampaui bunyi.” berstatus draf; tidak memakai slogan Inggris sebagai terjemahan yang seolah telah ditinjau. Layar dalam ilustrasi bukan screenshot/fitur terverifikasi. Lihat VISUAL-REVISION-02-EVALUATION.md dan ../references/content-preview/GENERATED-VISUAL-PROMPTS.md. Produksi logo, legal, fitur, installer dan penerjemahan tetap TBD.

## Tipografi disetujui — 2026-10-25

Pengguna menetapkan Poppins untuk title/heading dan Nunito Sans untuk body/paragraf. Ini menggantikan arahan serif sebelumnya, tanpa mengubah aset/gambar, warna, scope produk atau fase implementasi. Pratinjau lokal menerapkan font self-hosted dengan lisensi SIL OFL 1.1 dari sumber Google Fonts; lihat TYPOGRAPHY-UPDATE-EVALUATION.md.

## Evaluasi terkini — 2026-10-25

Phase 01 beserta tambahan pratinjau telah dievaluasi pada COMPLETED-PHASE-EVALUATION-2026-10-25.md. Tidak ada blocker yang ditemukan untuk melanjutkan ke pekerjaan fondasi Phase 02 setelah aktivasi pengguna. Ini bukan kelulusan Phase 02/03 atau kesiapan produksi. Temuan aset, sumber teks, heading pada 320px dan struktur heading dicatat; gate produksi/CMS/download tetap belum diuji. Tidak ada fase implementasi baru dimulai oleh evaluasi ini.


## Remediasi temuan yang dapat ditutup sekarang — 2026-10-25

Pengguna meminta perbaikan menyeluruh atas temuan yang dapat ditutup saat ini. Ditutup untuk pratinjau: aset berat (WebP responsif/WOFF2 lokal), teks tertanam (83 key UI dalam JSON), overflow kotak judul 320px, lompatan hierarki heading, dan ketahanan/error headers server lokal. Ditambahkan pengujian regresi generator/server, CSP dan panduan regenerasi. Git lokal diinisialisasi dengan .gitignore; belum ada commit/remote. Aset asli dan lisensi dipertahankan. Tidak mengaktifkan fase scaffold/CMS/installer, tidak membuat data legal atau terjemahan. Lihat PREVIEW-REMEDIATION-EVALUATION.md; temuan produksi G01/G02 tetap milik fase/pemilik terkait.

## Phase 03 activation — 26 October 2026
User explicitly authorized Phase 03. Implemented design-system samples use existing approved font direction, provisional wordmark and original decorative CSS bamboo. New ID/EN UI copy is labeled unreviewed; no production claims, translations or asset rights are approved by this implementation. See PHASE-03-DESIGN-SYSTEM.md and PHASE-03-EVALUATION.md. No later phase automatically activated.

## Phase 03 remediation authorized — 26 October 2026
User requested complete remediation of the fresh Phase 03 findings. P03-R1–R6 are closed with evidence in PHASE-03-CLOSURE.md. Existing generated conceptual illustrations are reused solely in labeled noindex local design specimens. No new production copy/translation, legal identity, actual product claims or hosting decision is approved. Admin visual branding is present; CMS-editable settings and editorial workflows keep their Phase 04 gate. No later phase automatically started.

## Phase 04 activation — 26 October 2026
User explicitly authorized CMS schemas/editorial flows and phase evaluation. Implementation choices and limits are recorded in PHASE-04-CMS.md: editor/publisher/super-admin roles, shared layout order with localized values, explicit two-locale review before shared publication, private globals and development-only media storage. This does not approve translations, legal data, hosting, production assets or future commercial features. Gate evidence: PHASE-04-EVALUATION.md. No automatic Phase 05 activation.

## Fresh Phase 04 evaluation — 26 October 2026
User requested an independent evaluation of the completed phase. PHASE-04-REVIEW.md supersedes the earlier local PASS with PARTIAL after adversarial reproduction of destructive media rejection, pending-image publication, missing EN media alt and lost audit attribution on user deletion. This is a technical review result, not approval to change business requirements or activate Phase 05. Application fixes are not included in this review.

## Phase 04 remediation and closure — 26 October 2026
User explicitly requested complete fixes and closure. PHASE-04-CLOSURE.md supersedes the historical PARTIAL review with local PASS and closes R1–R5 after executed regression/browser/migration checks. Files are immutable for every CMS role: replacements use new Media records to preserve current and historical references; approved metadata requires publisher/admin and both alt locales. Publication validates all referenced images in both locales. Exact usage includes retained versions; referenced media cannot be deleted or unapproved. Minimal immutable audit ID/role snapshots survive staff deletion; unknown historical roles are labelled, not inferred.

Schema additions fulfil doc 04, including specialized restricted rich text/blocks and private release/asset/contact/download models. These schemas do not activate later workflows. Dates do not imply automatic scheduled publication; build architectures and production storage remain TBD. Public reads use an anonymous-only cache with tag/path invalidation verified after HTTP publication; maintenance CLI writes require explicit refresh/restart. Matching pinned Lexical dependency and a verified scoped happy-dom security override update the lockfile. Current schema/procedure: PHASE-04-SCHEMA-MAP.md. No production content/translation, legal identity, hosting choice, future commercial features or Phase 05 activation is approved by this closure.

## Phase 05 activation — 27 October 2026
User explicitly authorized public bilingual pages and phase evaluation. Fixed page keys, localized detail slugs, published-only anonymous reads, limited published-global projections and opt-in indexing are documented in PHASE-05-PUBLIC-PAGES.md. No production translation/content/legal or hosting approval is inferred. Contact delivery/retention remain TBD; public submission stays disabled. No Basic/Pro, pricing, payments, account portal, installer delivery or Phase 06 activation.

### Contact direction — 27 October 2026
User selected email delivery and described retention as “estimated daily.” No recipient address or approved privacy notice was supplied. Retention remains ambiguous: clarification requested whether daily means deleting stored submissions after 24 hours. Do not infer a deletion policy or activate submissions until clarified/configured. This does not approve policy text or external test messages.

### Contact clarification — 27 October 2026
User supplied admin@galung.id, selected 30-day retention for the website copy and requested an Indonesian privacy-notice draft. This supersedes the earlier ambiguous “estimated daily” note. CONTACT-PRIVACY-DRAFT.id.md is unapproved draft copy, not published legal policy. Email-inbox retention/provider details remain TBD. Per the selected option, keep the form disabled until ready; no live email or public submission was activated.

### Contact notice approval and SMTP details — 27 October 2026
User explicitly approved the Indonesian draft notice and authorized enabling the Contact form. This supersedes its earlier unapproved status; it does not approve an English translation or invent company legal identity. Approved recipient/website retention remain admin@galung.id / 30 days. User identified DomaiNesia SMTP Hosting and supplied mx3.mailspace.id, port 465. Local configuration uses TLS and the admin@galung.id mailbox. Passwords remain in ignored local configuration and are never printed in chat or committed. Activation still requires successful authentication, passing form checks, a published ID Contact page and a healthy retention process.

### Mailbox clarification and fresh Phase 05 review — 27 October 2026
The user clarified that the intended email account had not yet been registered with the provider. This is the current external Contact activation blocker, not evidence of a newly successful login. Existing ID notice approval and 30-day website retention remain approved; no EN notice, legal identity or new commercial scope is inferred. PHASE-05-REVIEW.md records a fresh PARTIAL review: normal regression checks pass, formatting fails, and two adversarial code defects are reproduced. Only review tests/dispatch and documentation were added; no production fix, Contact activation, real SMTP retry or later-phase activation is authorized by this review.

## Phase 05 remediation authorized — 27 October 2026
User requested complete remediation and closure of Phase 05 implementation. While work proceeds, the user explicitly selected finishing code/tests first because the mailbox is not yet registered; live Contact activation remains deferred to that external setup. The user approved the proposed EN near-form privacy notice on the same date. ID and EN notices are now approved; this does not approve a full legal policy/company identity or production deployment. No real SMTP login retry or email sending is authorized by this code-first choice.

Remediation uses published document identity for localized CMS navigation, durable per-submission receipts and privacy-revision attribution, independent audit reconciliation, explicit token/delivery error UI and functional CMS image/grid controls. Technical closure must be supported by actual regression/migration/browser evidence. Operational mailbox/SMTP/worker setup remains separately reported; no automatic Phase 06 activation.

### Phase 05 implementation closure evidence — 27 October 2026

PHASE-05-CLOSURE.md supersedes the historical defect review for local implementation: R1–R5 remediated, 20 unit/complete integration/31 browser tests and indexed HTTP SEO checks pass; five-migration rollback/reapply/restore verified and working local migration applied after backup. Both approved policy revisions are attached to private delivery receipts. Audit repair never resends mail; ambiguous SMTP outcomes remain unknown. The user-deferred live-activation blocker remains: mailbox unregistered, Contact disabled/ready=false. No real auth retry/email or production publication was performed. This records technical evidence, not new business approvals or automatic Phase 06 activation.


## Phase 06 remediation authorization and evidence — 28 October 2026

User requested complete remediation of open findings. Implementation preserves owner-scoped sessions on busy/uncertain completion, reconciles uploaded/verified state without another upload and clears native selection. Optional versioned assetsToPublish selection repairs duplicate verified variants; immutable assets and approvedAssets publication snapshots remain protected. Selected candidates must belong to the release and pass both-OS/unique-variant/verification and ID/EN readiness guards.

No upstream fixed deepmerge version was available; a pinned three-entrypoint patch with runtime/Payload regressions and a fail-closed full-registry audit policy provides a disclosed local mitigation. Raw audit still reports one LOW advisory; do not claim an upstream fix or a clean raw audit. PHASE-06-CLOSURE.md records local PASS with actual 30-unit/full-integration/33-browser plus two final download regressions/eight-migration restore/SEO evidence and the backed-up working DB migration. This is engineering remediation, not new product/legal/provider approval. Live provider/build/content gates remain PARTIAL, Contact remains deferred and Phase 07/deployment is not automatically authorized.

## Phase 07 activation — 28 October 2026

User explicitly authorized quality/security hardening, defect repairs and the phase evaluation. See PHASE-07-EVALUATION.md for measured results and remaining controls. The header CTA is corrected to localized Download per doc 03. Pinned dev-only axe-core and retained browser audit/performance evidence extend QA. No new hosting/provider/MFA identity, legal facts, translations, real email sending, Phase 08 or future commercial features are approved by this request.

Phase 07 verification adds pinned Lighthouse 13.6.0 (registry engine checked) alongside axe-core 4.14.0. Mobile lab samples and limitations are retained in PHASE-07-MEASUREMENTS.json. Test runners use the executing Node binary, nested SEO uses the repository cwd, and isolated Payload instances skip background type generation while CI generates explicitly. Production security/quality gates remain open as enumerated in the Phase 07 evaluation.
