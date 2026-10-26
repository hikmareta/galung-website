# Decision Register

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
| Product requirements and minimum supported OS | TBD | Final download content |
| Legal company name/address | TBD; CMS editable | Public legal/company statements |
| Contact destination/email | TBD | Working contact form launch |
| Final privacy/terms policies | TBD | Public launch |
| Production provider and ToS | TBD | Deployment |
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
