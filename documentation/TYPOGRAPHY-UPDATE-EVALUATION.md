# Evaluasi perubahan tipografi — 25 Oktober 2026

Scope: permintaan eksplisit pengguna, Poppins untuk title/heading dan Nunito Sans untuk body/paragraf. Tidak ada fitur atau fase baru. Reviewed: AGENTS.md, README, doc 05, register keputusan, template/generator/server saat ini; roadmap/acceptance/evaluation prompt telah dibaca pada rangkaian fase yang sama. Checklist prompts/90-PHASE-EVALUATION.md diterapkan secara terbatas pada perubahan font.

Berkas diubah: references/content-preview/template.html, index.html, serve-preview.cjs; documentation/05-UI-UX-DESIGN-SYSTEM.md dan DECISIONS-AND-OPEN-QUESTIONS.md. Dibuat: assets/fonts/ di dalam preview (enam TTF Poppins/Nunito Sans 400/600/700, fonts.css, source-google-fonts.css, Poppins-OFL.txt, NunitoSans-OFL.txt), preview-fonts-desktop.png, preview-fonts-mobile.png dan laporan ini.

PASS: judul/heading, wordmark sementara, teks dekoratif hero, nomor langkah dan label platform menggunakan Poppins; body/paragraf/UI menggunakan Nunito Sans. Font lokal, font-display swap dan fallback sans-serif. Baris judul disesuaikan tanpa mengganti copy/gambar/warna. Doc 05 dan register mencatat keputusan terbaru pengguna yang menggantikan serif.

Commands/tools: unduhan CSS Google Fonts dan dua OFL resmi berhasil; parser Latin/WOFF2 awal gagal karena respons resmi berupa TTF tanpa penanda subset. Parser diperbaiki berdasarkan CSS aktual; enam TTF dan lisensi berhasil diunduh. Set-Content, build-preview.ps1 dan node --check server berhasil. Server lokal di-restart untuk menambahkan allowlist font/CSS dan MIME yang tepat. GET stylesheet HTTP 200 text/css. Tidak memasang package atau memakai hotlink font dalam halaman.

Browser checks: stylesheet berisi enam font-face, document.fonts.size=6, document.fonts.check untuk Poppins 600 dan Nunito Sans 400 true; computed family heading/body sesuai. Enumerasi awal melalui wrapper browser mengembalikan array kosong; verifikasi memakai font-set size, stylesheet rules, font checks dan screenshot visual. Desktop innerWidth 1440 / scrollWidth 1410; iframe same-origin 390 / 390 dan 320 / 320. Heading pada 320: clientWidth 260 / scrollWidth 260, tanpa pemotongan horizontal. Screenshot desktop/mobile disimpan dan inspeksi visual desktop mengonfirmasi bentuk Poppins/Nunito Sans. Override viewport di-reset setelah pemeriksaan.

NOT TESTED: lint/typecheck/unit/integration/production build/E2E tidak tersedia karena belum ada package.json/aplikasi. Tidak menambah tes yang hanya meniru CSS untuk perubahan visual reversibel ini. RBAC, i18n produksi, lifecycle/download tidak disentuh. Tidak mengklaim WCAG/SEO/security/performance produksi.

Risiko LOW, owner engineering: enam TTF penuh sekitar 777 KB; optimalkan format/subset saat Phase 03 produksi. Saat ini font Latin resmi cocok untuk copy ID/EN awal; glyph coverage konten lain perlu diuji jika ditambahkan. Dokumen legal/kontak dan EN tetap TBD. Tidak ada pengumpulan data atau request font pihak ketiga saat preview dibuka; font self-hosted beserta lisensinya.

Next: review pratinjau font. Ringkasan siap commit: gunakan Poppins/Nunito Sans, simpan font dan lisensi lokal, perbarui token/dokumen dan bukti screenshot. Tidak ada deployment atau perubahan scope MVP.

## Hasil evaluasi ulang — 25 Oktober 2026

Pemeriksaan terbaru dengan font terdaftar menghasilkan heading pada viewport 320px: clientWidth=260, scrollWidth=266, sedangkan lebar halaman tetap 320. Ini memperbarui pengukuran 260/260 di atas: ada spill teks 6px dari kotak heading, tanpa overflow horizontal halaman. Diberi prioritas LOW untuk disesuaikan sebelum acceptance komponen Phase 03. Lihat COMPLETED-PHASE-EVALUATION-2026-10-25.md. Klaim responsif dibatasi pada hasil yang benar-benar diperiksa, bukan seluruh WCAG/reflow.

## Hasil remediasi — 25 Oktober 2026

Judul sempit kini memakai clamp dan overflow-wrap; pengukuran ulang dengan font WOFF2 aktif: viewport 280 heading 220/220, 320 heading 260/260, 390 heading 318/318, 768 heading 340/340 (clientWidth/scrollWidth), tanpa overflow halaman. Catatan temuan 6px sebelumnya ditutup untuk pratinjau ini. Font tetap Poppins/Nunito Sans; kode dan lisensi lokal memakai empat berkas WOFF2 alih-alih enam TTF aktif. TTF asli tetap arsip. Lihat PREVIEW-REMEDIATION-EVALUATION.md.
