# Paket konten awal dan foto — 25 Oktober 2026

## Lingkup dan status

Pengguna menyetujui hasil Phase 01 dan meminta pencarian foto berlisensi gratis serta pembuatan konten utama agar arah website terlihat. Ini adalah tambahan pekerjaan konten dan pratinjau lokal, bukan implementasi penuh Phase 02–06 atau izin deployment. Mengikuti AGENTS.md, README, dokumen 01/03/04/05/08/10, register keputusan dan audit Phase 01 yang telah dibaca. Panduan Sites dipakai hanya untuk pratinjau lokal.

Sumber konten terstruktur: `../content/main-copy.id.json`. Semua teks berstatus **draf untuk ditinjau**, bukan klaim fitur yang sudah teruji. Bahasa Indonesia dibuat lebih dahulu. Inggris tetap belum diisi sampai terjemahan ditinjau; tidak ada tombol EN yang mengarah ke teks Indonesia. Tidak ada data perusahaan, alamat, kontak, statistik, testimoni, kemitraan, berita, proyek, atau spesifikasi fiktif.

## Arah editorial

Pesan utama: **Merawat tradisi. Membuka cara baru bermusik.**

Pendukung: Galung mempertemukan angklung dan pendekatan musik visual dalam satu gagasan: pengalaman bermusik yang lebih terbuka.

Nada: hangat, tenang, membumi; mengangkat tradisi dan arah eksplorasi. Kalimat tentang musik visual/pembelajaran/kebersamaan adalah posisi dan aspirasi merek sesuai PRD, bukan jaminan hasil belajar, fitur aksesibilitas, atau kemampuan produk tertentu. Owner produk masih perlu meninjau draf sebelum publikasi.

Urutan beranda: hero → gagasan/nilai → satu produk Galung → cerita budaya → portofolio dan kabar dalam keadaan kosong yang jujur → informasi unduhan → FAQ → kontak. Salinan halaman Tentang, Software, Fitur, Portofolio, Kabar, Unduhan dan Kontak serta metadata SEO awal tersedia dalam JSON. Detail artikel/proyek hanya dibuat jika konten nyata tersedia. Kebijakan privasi dan ketentuan tetap belum diterbitkan.

## Foto terpilih dan kredit

Lisensi diperiksa pada halaman berkas asal dan halaman Creative Commons pada 25 Oktober 2026. Gratis tidak berarti tanpa syarat. CC BY-SA 4.0 dan CC BY 3.0 mengizinkan penggunaan komersial dengan persyaratan masing-masing. Simpan kredit, tautan sumber/lisensi dan catatan perubahan bersama media di CMS kelak. Foto yang diadaptasi dari CC BY-SA dibagikan dengan lisensi yang sama/kompatibel; ini bukan pernyataan bahwa seluruh kode website otomatis berlisensi tersebut.

| ID / berkas lokal | Sumber / pencipta | Lisensi | Penggunaan dan alt Indonesia |
| --- | --- | --- | --- |
| A01 / references/content-preview/assets/angklung.jpg | [Angklung Alat Musik.jpg](https://commons.wikimedia.org/wiki/File:Angklung_Alat_Musik.jpg), Marcellinohanarko | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Budaya/pendamping produk; alt: pemain angklung dilihat dari belakang di ruang terbuka dekat jalan. Bukan screenshot aplikasi. |
| A02 / references/content-preview/assets/pengrajin.jpg | [Angklung Alat Musik Tradisional Warisan Budaya Indonesia.jpg](https://commons.wikimedia.org/wiki/File:Angklung_Alat_Musik_Tradisional_Warisan_Budaya_Indonesia.jpg), Galeri ega | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Hero/cerita budaya; alt: pengrajin mengolah bambu di antara rangkaian angklung dan pepohonan. Bukan anggota tim Galung. |
| A03 / references/content-preview/assets/orkestra.jpg | [Saung Angklung Udjo.JPG](https://commons.wikimedia.org/wiki/File:Saung_Angklung_Udjo.JPG), Midori | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) dipilih dari lisensi ganda pada sumber | Konteks budaya pertunjukan orkestra angklung di Saung Angklung Udjo; bukan kegiatan, pengguna, mitra atau dukungan terhadap Galung. |

Penyajian awal: berkas JPEG sumber tanpa retouch; tampilan hero dapat terpotong melalui CSS dan memakai lapisan warna terpisah. Kredit pada pratinjau menjelaskan penyesuaian tampilan tersebut. Tidak mengambil foto dari screenshot referensi. Simpan turunan foto yang dioptimalkan dengan lisensi dan riwayat perubahan yang sama bila dibuat di fase berikutnya. Izin hak cipta tidak membuktikan adanya izin seluruh hak pribadi/merek; hindari narasi dukungan dan penggunaan sensitif mengenai orang dalam foto. Tinjau konteks sebelum publikasi, terutama foto pertunjukan.

Alternatif yang diperiksa: [foto angklung Nasirun Khan di Pexels](https://www.pexels.com/photo/photo-of-a-brunette-holding-a-traditional-indonesian-instrument-17121036/) memakai [Pexels License](https://www.pexels.com/license/), gratis dengan larangan termasuk kesan endorsement. Tidak dipakai karena prioritas foto instrumen/konteks budaya, bukan potret promosi.

## Batas pratinjau

Pratinjau berada di `../references/content-preview/index.html`, di luar calon source aplikasi produksi. Tidak ada login, CMS, pengiriman formulir, download installer, deteksi OS, rute ID/EN, atau deployment. Tautan navigasi hanya menelusuri draf bagian konten. Bagian fitur tidak mengarang tangkapan layar/kemampuan. Unduhan dan kontak menyatakan belum tersedia. Identitas Galung berupa teks sementara, bukan logo final. Font sistem/Georgia dipakai agar tidak menyalin font referensi yang lisensinya tidak diketahui. Pratinjau diberi noindex, tetapi noindex bukan kontrol akses.

## Kriteria penerimaan dan pekerjaan tertunda

- Foto memiliki pencipta, sumber, lisensi dan konteks penggunaan tercatat; kredit tampil dalam pratinjau.
- Konten utama tersimpan dalam JSON valid dan terbaca di pratinjau beranda serta ringkasan halaman.
- Tidak ada berita/proyek/testimoni/fitur/data legal rekaan; unduhan tidak berpura-pura aktif.
- Persetujuan Phase 01 dicatat; persetujuan ini tidak otomatis menyetujui teks baru yang belum ada sebelumnya.
- Verifikasi aktual, batas pemeriksaan, daftar berkas dan evaluasi dicatat pada CONTENT-PREVIEW-EVALUATION.md.
- Berikutnya: tinjau teks/komposisi; lengkapi screenshot aplikasi dan rincian fitur nyata, terjemahan EN, logo, legal/kontak serta installer; lanjutkan fondasi teknis Phase 02 secara terpisah.

Register mesin: content/photo-register.json memuat lisensi, sumber, alt ID, ukuran dan SHA-256. Pratinjau dapat dibuka langsung sebagai berkas lokal. Untuk regenerasi setelah perubahan konten: jalankan references/content-preview/build-preview.ps1 dengan PowerShell. Original foto total 24.545.396 byte; belum dioptimalkan untuk produksi.



## Digantikan untuk tampilan aktif oleh revisi visual 02

Atas permintaan pengguna pada 25 Oktober 2026, foto Commons tidak lagi ditampilkan dalam pratinjau aktif. Hero, laptop dan panggung kini menggunakan tiga ilustrasi AI orisinal. Foto Commons dan kreditnya tetap diarsipkan; sumber draf konten ID masih main-copy.id.json dengan hero diperbarui menjadi “Musik melampaui bunyi.”. Lihat VISUAL-REVISION-02-EVALUATION.md, content/generated-visuals.json dan references/content-preview/GENERATED-VISUAL-PROMPTS.md untuk status terkini. Tidak mengubah persyaratan produk atau persetujuan legal.
