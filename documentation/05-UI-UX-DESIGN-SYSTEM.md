# 05 — Galung UI/UX & Design System

## Primary source
`references/UI Galung.jpg` (provided by owner). Main screenshot includes a photographic music/Angklung hero, cream surfaces, deep green panels, gold CTA, serif editorial headlines, bamboo motifs, product cards, a payment view, and a customer dashboard. **Pricing/payment/customer dashboard visual content is future-only; for MVP only reuse relevant visual language.**

## Brand direction
"Modern Indonesian Heritage" / premium, light, minimal and professional. Balance expressive cultural photography with restrained information architecture. Avoid template-like SaaS visuals and gratuitous gradients.

## Provisional tokens (sampled by eye; refine against source)
| Token | Initial value | Use |
|---|---|---|
| `--color-primary` | `#073E32` | Forest green sections / anchors |
| `--color-secondary` | `#0B5C48` | Deep emerald |
| `--color-accent` | `#D9AC5E` | Warm gold CTA/highlights |
| `--color-bg` | `#FAF7F0` | Ivory page surface |
| `--color-text` | `#242820` | Charcoal text |
| `--color-white` | `#FFFFFF` | Card backgrounds |

These are **approximations**, not certified extracted brand color values. Check contrast and adjust to WCAG target; gold should not be used for small low-contrast text on white.

## Typography
Approved by user on 25 October 2026: **Poppins** for titles, headings and heading-like labels; **Nunito Sans** for body paragraphs and interface text. This explicit decision supersedes the earlier serif direction. Preview self-hosts four official Latin WOFF2 files (Poppins 400/600/700; variable Nunito Sans 400–700) with SIL OFL 1.1 notices included. Font-display swap and sans-serif fallbacks apply. Original TTFs remain archived; broader glyph coverage and production performance still require review.

## Components
Header with logo/nav/language/menu CTA; hero with legible dark overlay, dual CTAs; pill buttons; icon-value bar; product showcase; modular editorial cards; content gallery; article card; project card; footer. Admin: sidebar/nav, content table, preview/publish bar, media selector, section order controls, localized field panels, verification badges.

## Layout rules
Desktop max-width container, generous section spacing, mobile-first grid, consistent 8px-based spacing tokens, responsive images with object-position controls. Hero full-bleed within rounded framing only where consistent with reference. Botanical motifs subtle and decorative with empty alt; do not overlay essential text.

## Image assets & content accuracy
Prefer original Galung product screenshots and owned/licensed Angklung/community photos. Uploaded screenshot is a reference, **not a production hero asset**, and its demo text, plans and individual photographs are not approved as factual product claims. Do not generate or invent testimonials/certifications.

## Motion & accessibility
Subtle fade/translate, purposeful hover/focus, `prefers-reduced-motion` support. Keyboard-operable menus and admin ordering buttons (dragging optional), contrast, focus indicators, alt text, 44px touch-target goal, form error associations.

## Design acceptance
- Homepage desktop/mobile shows hierarchy and premium light visual identity aligned with reference.
- Actual MVP navigation excludes Pricing/Login and Basic/Pro comparisons.
- UI does not break with English copy or long localized strings.
- Component story/screenshots and a review against source image are attached to phase report.
- Admin feels related to public brand but optimized for editing speed and clarity.

## Arahan visual pengguna — 25 Oktober 2026

Untuk pratinjau lokal, pengguna meminta hero buatan AI dan kecocokan komposisi referensi lebih dekat, termasuk gradasi hijau di balik teks, CTA emas, ikon bundar dan ornamen bambu. Gradasi ini berfungsi menjaga keterbacaan dan mengikuti arahan eksplisit pengguna.

Token CTA pratinjau: linear-gradient(110deg, #F0D28B 0%, #E2BA6B 48%, #CCA052 100%), border #CFAA61, teks #172C23. Hero memakai overlay linear-gradient(90deg, rgba(3,38,29,.97) 0%, rgba(3,38,29,.90) 22%, rgba(3,38,29,.60) 37%, rgba(3,38,29,.14) 54%, rgba(3,38,29,0) 74%). Ini interpretasi visual yang diperiksa manual, bukan hasil sertifikasi merek atau pembuktian kesamaan piksel.

Assets hero/laptop/community di references/content-preview/assets/*-generated-v2.png adalah ilustrasi AI konseptual. Ikon dan bambu SVG dibuat orisinal. Tetap tanpa klaim kemampuan/aksesibilitas software dari gambar, tanpa edisi/pricing/payment/customer account. Salinan sumber foto bebas lisensi versi awal dipertahankan sebagai arsip, tidak ditampilkan di revisi baru.


## Remediasi pratinjau — 25 Oktober 2026

CSS aktif berada di references/content-preview/styles.css. Heading hero pada layar sempit memakai clamp(2rem,12vw,2.9375rem) dan overflow-wrap:anywhere; kelompok benefit mempunyai H2 sr-only sebelum H3. UI/alt/metadata draf disimpan di content/main-copy.id.json (83 key UI hasil ekstraksi; tidak menciptakan terjemahan EN). Gambar aktif adalah 12 varian WebP responsif, dengan srcset/sizes; PNG asli tetap arsip. Ukuran set resolusi terbesar tiga gambar + empat WOFF2 adalah 568.414 byte, dibanding 7.177.155 byte sebelumnya. Ini pengurangan berkas sumber, bukan hasil Core Web Vitals. Lihat PREVIEW-REMEDIATION-EVALUATION.md untuk bukti dan batas pengujian.
