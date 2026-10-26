# 01 — Product Requirements Document (PRD)

## Purpose and users
Galung is a music software brand with a visual music/Angklung and inclusive education positioning based on provided visual reference; final product claims require product-owner confirmation. Website stakeholders: anonymous visitors, prospective users, press/partners, content editors, translators and super admins.

## Goals
- Clearly explain Galung and display product capabilities, projects and updates.
- Allow discovery and public download of approved Windows/macOS installers.
- Provide a professional, responsive, bilingual brand presence.
- Permit authorized staff to update content, media, section order and legal company info without code changes.

## MVP features — IDs and acceptance criteria
| ID | Requirement | Acceptance criteria |
|---|---|---|
| PUB-01 | Bilingual website | Main pages render at `/id/...` and `/en/...`; switch preserves equivalent route if available; no accidental mixed-language chrome. |
| PUB-02 | Homepage | Hero, brand benefits, features, media showcase, portfolio, news, download CTA; editor can reorder allowed blocks. |
| PUB-03 | About/brand | Story and company identity from CMS; unapproved legal fields not exposed. |
| PUB-04 | Single product detail | Galung product detail and feature sections, not Basic/Pro cards/prices. |
| PUB-05 | Portfolio | Listing, featured items, category filter (if populated), detail pages and media. |
| PUB-06 | News | Listing, categories, detail, publish date, published-only public view. |
| PUB-07 | Download | Windows/macOS release entries from CMS, no visitor auth, verified active files only. |
| PUB-08 | Contact | Validated contact form, anti-spam, configured email/secure destination, privacy notice. |
| PUB-09 | Legal | Editable privacy and terms content; public only once approved. |
| CMS-01 | Admin login/access | Unauthenticated users cannot read drafts or mutate CMS data. |
| CMS-02 | Pages | Editor can edit localized fields, add permitted blocks, reorder/enable blocks, preview and publish. |
| CMS-03 | Media | Admin uploads media, edits alt text, sees usage and cannot accidentally break references. |
| CMS-04 | Editorial | News and portfolio CRUD, draft/preview/published states and rollback/version history where supported. |
| CMS-05 | Software releases | Authorized upload and publish/retire release records with OS, architecture, size, checksum and changelog. |
| CMS-06 | Company identity | Editable owner/company name, legal name, address, contacts; no made-up defaults. |
| CMS-07 | Localization | Clear ID/EN completion state and localized SEO copy. |
| NFR-01 | Quality | Responsive, accessible, safe, fast, testable and observable per doc 07. |

## Out of MVP scope
Pricing, Basic/Pro edition choices, checkout, manual transfers, subscriptions, license emails, account portals, customer dashboards, customer login, per-device entitlements, payment tracking, user forum, visual pixel-level freeform page builder, auto-translation and native software updater.

## Editorial workflow
Author/editor drafts -> previews -> validates localized copy and assets -> publisher authorizes -> content revalidation -> website updates. Do not show stale drafts or incomplete localizations as translated published pages.

## Success measures (targets to define with stakeholder)
Page traffic, product page CTA interaction, successful installer delivery, publishing lead-time and editing without code changes. Do not invent conversion targets.

## Decisions TBD
Approved company legal identity; production copy/photography/logo licenses; final navigation; contact delivery; exact product specs; installer architecture list; publication policies; hosting provider.
