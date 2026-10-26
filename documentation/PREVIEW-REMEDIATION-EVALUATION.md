# Evaluasi remediasi pratinjau — 25 Oktober 2026

## Scope, sumber dan keputusan

Pengguna mengotorisasi “remediasi dan perbaikan secara menyeluruh untuk temuan yang masih bisa ditutup sekarang”. Lingkup adalah temuan pratinjau pada COMPLETED-PHASE-EVALUATION-2026-10-25.md: aset berat, copy tertanam, judul sempit, hierarki heading, ketahanan server/error headers, keterlacakan Git dan dokumentasi. Bukan aktivasi implementasi penuh Next/Payload/CMS atau pengisian fakta perusahaan/installer yang belum tersedia.

Reviewed: AGENTS.md, README.md, documentation/05-UI-UX-DESIGN-SYSTEM.md, DECISIONS-AND-OPEN-QUESTIONS.md, laporan evaluasi gabungan, prompts/90-PHASE-EVALUATION.md, template/CSS/index, generator/server/QA harness, content JSON dan metadata aset/font. PRD/routing/content/security/roadmap/acceptance bernomor yang ditinjau dalam evaluasi sebelumnya tetap baseline; tidak ada requirement produksi diubah. Panduan Sites/local preview tetap dipakai untuk artefak lokal ini. Tidak ada subagent, package aplikasi atau hosting baru.

Dependencies aktual: Node yang telah tersedia untuk server dan native test runner, PowerShell untuk generator, bundled Python dengan Pillow untuk encoding turunan. Pemeriksaan awal menemukan Pillow tersedia, fontTools/brotli Python tidak tersedia; tidak menginstalnya. WOFF2 Latin diambil langsung dari respons resmi Google Fonts dengan user-agent modern; OFL yang sudah ada dipertahankan. Pengoptimalan gambar hanya resize/encoding, tanpa mengubah adegan atau generasi visual baru. Semua PNG/TTF/JPEG asli tetap arsip.

## Acceptance / penutupan temuan

| Temuan / kriteria | Hasil | Bukti dan batas |
| --- | --- | --- |
| M01: aset aktif belum dioptimalkan | CLOSED untuk pratinjau | 12 WebP responsif, srcset/sizes, decoding async, prioritas hero; 4 WOFF2 Latin lokal. Set 3 gambar resolusi terbesar + font 568.414 byte, turun 92,08% dari 7.177.155 byte |
| M02: teks draf masih hardcoded | CLOSED untuk sumber draf | 83 string editorial/label/alt/metadata di JSON. Parser templat menemukan 0 text node editorial literal. Mengubah label JSON saja mengubah output. CMS/field localization sesungguhnya tetap pekerjaan Phase 04–05 |
| L01: heading 320px melewati kotaknya 6px | CLOSED | Clamp responsif + wrapping; font aktif pada 320: client/scroll heading 260/260, lebar halaman 320/320. 280, 390, 768 juga lolos |
| L02: H1 langsung ke H3 | CLOSED | Kelompok benefit mendapat H2 sr-only yang dibaca accessibility tree. Pemeriksaan seluruh heading tidak menemukan skip level |
| Server URL/filesystem/error responses | CLOSED untuk cakupan lokal yang diuji | URL invalid 400, file hilang 404, error baca 500 generik, metode tulis 405; server tetap melayani setelah error. Headers noindex/CSP/nosniff/no-store/referrer diterapkan pada response normal dan error aplikasi |
| Generator/copy safety | PASS | Single substitution pass, HTML encoding, validasi key dan locale, atomic output. Uji escaping, ekspansi template dari copy, missing key dan relabel locale lulus |
| Git lokal tidak ada | CLOSED untuk inisialisasi | git init berhasil, status dapat dibaca, .gitignore melindungi env/dependencies/artefak sementara. Belum ada initial commit/baseline diff atau remote |
| Navigasi/fokus/FAQ | PASS, subset manual | 9 target header/hero dapat dicapai Tab dengan outline solid; CTA Enter ke #unduhan; FAQ Enter membuka/menutup |
| Kesetiaan komposisi/font | PASS untuk mempertahankan desain | Screenshot desktop/mobile diperiksa, Poppins/Nunito Sans aktif; sumber visual AI dan warna/komposisi dipertahankan. Tidak mengklaim identik piksel |
| WCAG lengkap, p75 CWV, produksi SEO/security | NOT TESTED | Tidak ada klaim bahwa source-byte reduction atau pemeriksaan subset membuktikan kepatuhan/kinerja produksi |

## Implementasi dan berkas

**Konten/layout:** content/main-copy.id.json kini menyimpan tambahan ui.* untuk seluruh teks editor-facing pratinjau, termasuk atribut alt/aria, judul dan deskripsi. template.html mempertahankan struktur/URL aset/tautan sumber lisensi; gaya dipisahkan ke styles.css. Generator menggunakan token alfanumerik/underscore bertingkat, meng-escape nilai dan memproses komponen FAQ sekali agar isi yang disisipkan tidak berubah menjadi instruksi template. Missing key tidak menimpa output valid.

**Aset:** build-assets.py membuat 4 lebar untuk setiap hero/laptop/community, menjaga aspect ratio dan menyimpan encoder, quality=82, ukuran, hash serta asal pada assets/optimized/manifest.json. Satu set resolusi terbesar gambar 513.638 byte; font 54.776 byte. Seluruh 12 varian gambar 1.118.868 byte; semua varian + font 1.173.644 byte di disk. Ini berbeda dari transfer browser aktual yang memilih subset, dan bukan angka Lighthouse/CWV. Original source set tetap 7.177.155 byte di arsip. Empat WOFF2 terdiri dari Poppins 400/600/700 dan variable Nunito Sans 400–700. Lisensi dan source response tersimpan lokal; tidak ada runtime hotlink font.

**Server:** hanya loopback 127.0.0.1 dan allowlist file yang eksplisit. PNG/TTF arsip, manifest sumber, .env dan template tidak disajikan. Error tidak mengungkap path. GET/HEAD didukung, metode lainnya mendapat 405 + Allow. Main page tidak memakai inline style/script; QA CSS/JS dipisah agar CSP tidak membutuhkan unsafe-inline. Tidak ada auth, database, kontak, upload, installer atau endpoint mutasi baru. Server ini tetap bukan service produksi.

**Berkas dibuat:** .gitignore; references/content-preview/styles.css, build-assets.py, qa.css, qa.js, README.md; tests/preview-server.test.cjs, tests/build-preview.tests.ps1; 12 assets/optimized/*.webp dan manifest.json; 4 assets/fonts/*latin.woff2 dan source-google-fonts-woff2.css; preview-remediated-desktop.png, preview-remediated-mobile.png; laporan ini. Git metadata lokal dibuat oleh git init.

**Berkas diubah:** content/main-copy.id.json, generated-visuals.json, photo-register.json (asal asli dan status arsip diperjelas); template.html, index.html, build-preview.ps1, serve-preview.cjs, responsive-check.html, assets/fonts/fonts.css; README.md, CHANGELOG.md, doc 05, register keputusan, laporan evaluasi gabungan dan tipografi (addendum historis). Tidak mengubah gambar sumber atau lisensinya. Tidak ada initial commit, remote atau push.

## Commands / hasil aktual

- Get-Content, pemeriksaan repo dan dependency helper: berhasil. Bundled Python mendeteksi PIL=True, fontTools=False, brotli=False.
- Invoke-WebRequest resmi Google Fonts dengan UA modern: berhasil, 4 Latin faces WOFF2. Source CSS dan empat file disimpan. Tidak ada pip/npm installation.
- Bundled Python build-assets.py: berhasil. Respons awal: largestImageSetBytes=513638, allVariantBytes=1118868. Rerun setelah penambahan metadata font menghasilkan byte gambar yang sama.
- PowerShell migrasi teks: berhasil, EDITORIAL_STRINGS_EXTRACTED=83. Parser HTML terpisah: EDITORIAL_LITERAL_NODES=0.
- build-preview.ps1: berhasil; hash sebelum/sesudah regenerasi identik (REPRODUCIBLE=True).
- node --check pada server, QA JS dan test server: exit 0.
- PowerShell tests/build-preview.tests.ps1: **5/5 PASS** (label JSON, escaping HTML, no recursive expansion, missing-key output preservation, locale relabel rejection).
- node --test tests/preview-server.test.cjs: suite awal 8/8 PASS; setelah ditambahkan dua kasus error lanjutan, suite final **10/10 PASS**, 0 FAIL/skip/cancel. Test temporary ports hanya loopback dan ditutup otomatis.
- Static checks output HTML: target anchor/ID/aset ada, token tersisa tidak ada, inline style/script/remote media/UI masa depan tidak ditemukan. Hash **12/12 WebP** dan **4/4 WOFF2** sesuai manifest. Kedua OFL asli tetap ada.
- git init: sukses, memakai default branch lokal yang sudah dikonfigurasi tool; tidak mengubah global config. git status --short: sukses, berkas proyek masih untracked. GIT_REMOTE_COUNT=0. git check-ignore memverifikasi .env/.env.local/node_modules/temporary test files diabaikan, .env.example dikecualikan dari ignore.
- Screenshot desktop/mobile tersimpan dari browser, desktop dan mobile diperiksa visual. Server preview direstart memakai versi yang diuji dan tetap tersedia untuk pratinjau lokal. Ini bukan deployment.
- Format/lint/typecheck/build Next/Payload/integration/E2E aplikasi: belum tersedia tanpa package.json/aplikasi. Tidak dijalankan atau diklaim lulus. Native server/generator checks di atas terpisah dari suite produksi.

Raw ringkasan bukti:

```text
node server regression: tests 10, pass 10, fail 0, skipped 0
PowerShell generator checks: PASS 5/5
REPRODUCIBLE=True
EDITORIAL_LITERAL_NODES=0
OPTIMIZED_IMAGE_HASH_MATCH=12/12
FONT_HASH_MATCH=4/4
GIT_REMOTE_COUNT=0
BASELINE=7177155
LARGEST_IMAGES=513638
FONTS=54776
NEW_TOTAL=568414
REDUCTION_PCT=92.08
```

Kasus server meliputi normal/HEAD, metode tulis, traversal/private-file allowlist, URL invalid, MIME WebP/WOFF2, file hilang, EISDIR/read error 500, malformed raw HTTP dan pemulihan request berikutnya. Test tidak mencoba atau membuktikan RBAC/release storage yang belum ada.

## Browser / accessibility / responsive

Browser memuat main page tanpa console warning/error teramati. Font-face count=4; Poppins/Nunito font checks=true. Heading skips=[]; keempat pemakaian image loaded=true, memakai WebP pilihan browser (pada DPR .5: hero960/laptop480/hero-card640/community960). Image original tidak diambil oleh layout aktif.

Pemeriksaan viewport memakai ukuran CSS aktual, bukan menganggap nilai override sama dengan innerWidth pada browser berzoom 50%. Desktop actual 1440 / scrollWidth 1410. Same-origin QA frame, setelah font readiness:

| Viewport | Scroll halaman | Client heading | Scroll heading |
| --- | --- | --- | --- |
| 280 | 280 | 220 | 220 |
| 320 | 320 | 260 | 260 |
| 390 | 390 | 318 | 318 |
| 768 | 768 | 340 | 340 |

Tab order yang diamati: brand → Software → Fitur → Portofolio → Tentang → Kabar → Unduh Galung → Jelajahi Galung → Lihat visual; outline solid pada tiap target. CTA Enter menuju #unduhan. FAQ Enter open=true lalu closed=true. Urutan heading H1/H2/H3 diperbaiki tanpa mengubah tata letak benefit. Sr-only heading terbaca pada accessibility tree. Reduced-motion CSS tetap ada, tetapi simulasi preferensi OS, screen reader dan seluruh zoom/a11y flow tidak diuji. Tidak ada klaim WCAG penuh.

## Risiko terbuka, pemilik dan scope berikutnya

- **BLOCKER remediasi lokal:** tidak ditemukan pada cakupan yang diuji. Tidak mengklaim tidak ada seluruh defect atau kerentanan.
- **HIGH sebelum publikasi / G01:** fondasi Next/React/Payload/Postgres, CMS/RBAC/draft lifecycle, rute ID/EN, kontak dan pipeline installer belum dibuat. Owner engineering, fase 02–07. Tidak dibuat dummy untuk meluluskan acceptance.
- **HIGH sebelum publikasi / G02:** legal/company/contact data, fitur/screenshots nyata, kebijakan dan berkas rilis membutuhkan pemilik produk/perusahaan/release. AI scenes tetap diberi label konsep dan tidak dijadikan bukti fitur/testimoni.
- **MEDIUM sebelum quality gate:** audit WCAG lengkap (termasuk screen reader, zoom, foto/overlay), metrik performa aktual dan SEO lokal produksi masih perlu diuji pada aplikasi/hosting sesungguhnya. Owner engineering/QA, Phase 03–07.
- **LOW/future content:** Latin WOFF2 cocok untuk draf ID/EN awal; penambahan bahasa/glyph lain membutuhkan review coverage. Struktur JSON ini belum menggantikan koleksi/global/field localization CMS. Owner content/engineering Phase 04–05.
- **LOW/version control:** Git sudah ada tetapi initial commit/baseline history masih belum dibuat. Owner engineering sebelum workflow Phase 02 berikutnya.

AT-01–AT-11 tetap NOT TESTED untuk aplikasi produksi. AT-12 tetap PARTIAL secara keseluruhan meski cakupan keyboard publik diperluas; admin ordering belum ada. Phase 01 tetap approved. Tidak ada perpindahan otomatis ke Phase 02 atau klaim Phase 03 selesai.

## Dokumentasi / changelog / langkah konkret

Doc 05 dan README kini menunjuk aset/font/struktur aktif. Register keputusan mencatat scope remediasi pengguna. Laporan evaluasi gabungan dan tipografi diberi addendum penutupan sehingga hasil historis tidak tertukar dengan bukti baru. README preview berisi cara regenerasi, preview, QA dan testing. CHANGELOG mencatat seluruh perbaikan. Kewajiban lisensi/provenance tetap bersama aset asli dan turunannya.

Ringkasan siap commit: perbaiki reflow/hierarchy, pusatkan teks draf, optimalkan aset/font dengan provenance, keraskan server lokal dan tambahkan regresi, inisialisasi Git/ignore serta perbarui bukti. Next concrete scope tetap Phase 02 fondasi bila diaktifkan; G01/G02 tidak ditutup secara fiktif. Tidak menambahkan Basic/Pro/pricing/payment/customer-account functionality.
