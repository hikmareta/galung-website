# Phase 04 schema contract and editorial runbook

Source: `04-CMS-CONTENT-MODEL.md`. This map supplements the historical initial implementation report; it does not change the locked product requirements.

## Collections and globals

| Contract | Implemented fields / module | Phase boundary |
|---|---|---|
| users | name/email/role/active; `collections/Users.ts` | Active CMS authentication; editor, publisher, super-admin. No customer authentication. |
| pages | key, localized title/slug/excerpt/heroMedia/SEO, shared layout, reviewedLocales, draft status/versioning; `collections/Content.ts` | Published homepage projection and authenticated preview. |
| posts | content above plus localized safe Lexical content, categories, publishAt | Date metadata; no automatic scheduler. Detail/feed routes remain Phase 05. |
| portfolioProjects | description, safe localized caseStudy, localized gallery images, categories, featured | Detail/feed presentation remains Phase 05. |
| products | unique key restricted to galung, overview, features, heroMedia | One product; no editions or commercial fields. |
| postCategories / portfolioCategories | unique stable key, localized label | Editorial-only lookup collections. |
| media | Payload filename/object identifier, MIME, size, dimensions, URL, localized alt/caption, attribution, approved, computed usage; `collections/Media.ts` | Private development disk storage. Production object storage remains provider-dependent. |
| auditEvents | actor relation, immutable actorIdSnapshot/actorRoleSnapshot, action/resource/resourceId, timestamps | Restricted read; API create/update/delete denied. Historical unknown attribution explicitly labelled. |
| softwareReleases | product/version/channel/publishedAt/localized changelog/drafts; `collections/OperationalModels.ts` | Private metadata foundation. Publication rejected until verified installer workflow in Phase 06. |
| releaseAssets | release/OS/architecture/storageKey/filename/sizeBytes/sha256/uploadStatus/visibility | Private/pending only. No binary endpoint. Architecture remains TBD pending actual builds. |
| contactSubmissions | name/email/message bounds/locale/status/timestamps | Admin-only records; API submission disabled until public contact validation, rate limiting, delivery and retention workflow. |
| downloadEvents | release/asset/OS/timestamps | Private foundation; no recording endpoint or personal identifiers. |
| siteSettings | displayName/description/email/logo/publicURL/socialLinks/localized SEO defaults/openGraphImage; `globals/editorial.ts` | Private versioned settings; approved public projection remains Phase 05. |
| companyProfile | displayName/description/legalName/address/registrationIdentifiers/email/phone/logo/publicURL | Legal facts remain empty/TBD until supplied; audited super-admin writes. |
| headerNavigation / footerNavigation | shared links with localized label and safe href | Private versioned configuration. |
| contactSettings | displayName/description/email/phone/localized address/logo/publicURL | Private configuration; no invented contact identity. |

## Blocks

All 13 predefined blocks retain shared stable row IDs, enabled/style flags, canonical array order, localized headline/body/media/link/label and shared item composition. Specialized fields in `blocks/registry.ts`:

| Block | Additional structured fields |
|---|---|
| hero / callToAction | Secondary safe localized link and label |
| richText | Localized restricted Lexical content |
| imageText | Image position left/right |
| featureGrid | Two/three-column setting |
| stats | Shared statistics with localized value/label |
| gallery / mediaShowcase / communityShowcase | Shared gallery with localized image/caption |
| videoEmbed | Localized HTTPS YouTube/Vimeo URL and poster |
| faq | Shared questions with localized question/answer |
| portfolioFeed | Category, bounded limit, featuredOnly |
| newsFeed | Category and bounded limit |

Feed population and final public video presentation remain Phase 05. The current shared preview/home renderer renders safe structured content and a video link/poster without third-party script execution. Rich text supports paragraphs, bold/italic, h3/h4, ordered/unordered lists; arbitrary HTML, scripts, custom nodes and uncontrolled CSS are rejected, including draft writes.

## Current editorial procedure

1. Sign in as an active CMS editor. Upload a new licensed JPEG/PNG/WebP (maximum 8 MiB); enter attribution and both reviewed ID/EN alt descriptions. No translation is generated.
2. Files are immutable for every role. For a replacement upload a new Media record, then select that record on the relevant page. Metadata on approved media requires publisher/admin. Crop/remove-file operations are disabled and server-side replacement is rejected before file side effects.
3. Edit a Pages document with key `home`. Save ID and EN title/slug and localized blocks. Use the labelled up/down buttons with Enter to change the shared order; save the draft. Both locales share composition/order but keep their own text/media values.
4. Preview each locale using an active CMS session. Preview is private, no-store and noindex. Anonymous visitors continue seeing the previous publication.
5. A publisher approves the Media record after both alt descriptions exist. Approval makes that asset publicly readable; this is an explicit publication action even before a page references it.
6. Publisher reviews both page locales, selects both reviewedLocales flags and publishes. Pending/unavailable images or incomplete required structured values block publication. Review flags attest human review; they do not certify translation quality.
7. Check `/id` and `/en` as an anonymous visitor. HTTP publication invalidates both the shared published-content cache tag and locale layouts. CLI/maintenance Local API writes require an explicit cache refresh/restart because they have no Next request context.
8. Media usage lists counts in current content and retained versions. Used media cannot be deleted or have approval withdrawn, including when referenced only by version history. Replace references deliberately; do not delete retained history simply to bypass the safeguard.

Production storage/CDN invalidation, approved translations/assets/legal identity, retention policy, actual installer variants and deployment operations remain explicit later gates; schema availability does not activate these services.
