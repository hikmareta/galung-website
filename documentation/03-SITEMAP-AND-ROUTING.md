# 03 — Sitemap, Navigation and SEO Routing

## Routes
| Page | ID route | EN route | Source |
|---|---|---|---|
| Home | `/id` | `/en` | Homepage CMS page |
| About | `/id/about` | `/en/about` | About page + company settings |
| Software | `/id/software` | `/en/software` | Single product + blocks |
| Features | `/id/software/features` | `/en/software/features` | Feature blocks |
| Portfolio | `/id/portfolio` | `/en/portfolio` | Published projects |
| Project detail | `/id/portfolio/[slug]` | `/en/portfolio/[slug]` | Published project |
| News | `/id/news` | `/en/news` | Published posts |
| Article detail | `/id/news/[slug]` | `/en/news/[slug]` | Published post |
| Download | `/id/download` | `/en/download` | Active releases |
| Contact | `/id/contact` | `/en/contact` | CMS settings/form |
| Privacy | `/id/privacy` | `/en/privacy` | Approved legal content |
| Terms | `/id/terms` | `/en/terms` | Approved legal content |
| Admin | `/admin` | — | Payload, login required |

## Navigation
Desktop logo left, Products/Features/Portfolio/About/News links and primary `Get Galung` CTA to Download. Mobile accessible menu with language control. No Pricing/Login public navigation in MVP. Final order editable using CMS navigation globals.

## SEO and locale policies
- Both languages have independent title/description/Open Graph copy.
- Canonical URLs and reciprocal `hreflang` for available published translations, and locale-aware sitemap.
- Unknown slug -> 404; unpublished translation -> no public page / deliberate fallback policy, do not silently label Indonesian text as English.
- Admin, draft previews, search endpoints and staging excluded from indexing.
- `galung.id` root redirect is deterministic; preserve locale when switching article URL where translation exists.
- Structured data only when truthful and supported by actual content.
