# 04 — Payload Collections, Globals and Content Model

## Collections
| Collection | Key fields | Editorial behavior |
|---|---|---|
| `users` | name, email, role, active | Auth; strict RBAC |
| `pages` | key, localized title/slug/SEO, layout[], status | Draft, preview, publish, versioning |
| `posts` | localized title, slug, excerpt, content, categories, heroMedia, publishAt | Editorial lifecycle |
| `postCategories` | localized label, stable key | Referenced by posts |
| `portfolioProjects` | localized title, description, case study, gallery, categories, featured | Draft/publish |
| `portfolioCategories` | localized label, stable key | Lookup |
| `products` | stable key `galung`, localized overview/features/media | One active product for MVP |
| `softwareReleases` | product, semantic version, channel, publishedAt, localized changelog, draft/published status, lifecycle, reviewedLocales, assetsToPublish candidate selection, approvedAssets snapshot | Admin-only; active publication requires verified Windows/macOS and reviewed ID/EN notes; retired records retained |
| `releaseAssets` | release, OS, architecture, storageKey, filename, sizeBytes, sha256, uploadStatus, visibility, uploadId/owner/expiry, objectVersion, verifiedAt, failure | Immutable private metadata; workflow-only writes, direct multipart upload, independent verification, version-pinned public redirects. See PHASE-06-DOWNLOADS.md |
| `media` | object key, MIME, dimensions, alt (localized), caption, attribution | Usage tracking as feasible |
| `contactSubmissions` | name, email, message, locale, timestamp, handling status; unique submissionKey, requestFingerprint, privacyRevision, deliveryStatus, acceptedAt, auditPending | Restricted personal data; 30-day website retention; server-controlled delivery receipts and policy attribution. SMTP acceptance is not inbox delivery. See PHASE-05-PUBLIC-PAGES.md. |
| `downloadEvents` | release/asset, date/time, coarse analytics metadata | Privacy-conscious aggregate metrics |
| `auditEvents` | actor, action, resource, timestamp | Privileged event trail |

## Globals
`siteSettings` (logo, public URL, social links, SEO defaults), `companyProfile` (brand company owner **TBD**, legal details editable), `headerNavigation`, `footerNavigation`, `contactSettings`. Localize appropriate presentation fields; do not localize technical identifiers.

## Page blocks (initial registry)
`hero`, `richText`, `imageText`, `featureGrid`, `mediaShowcase`, `stats`, `gallery`, `videoEmbed`, `portfolioFeed`, `newsFeed`, `faq`, `callToAction`, `communityShowcase`.

### Block schema pattern
Each block has stable `id`, `blockType`, `enabled`, `order` (array order can be canonical), optional safe style variant, locale-specific headline/body/media/call-to-action. **MVP layout composition/order is shared for ID/EN**; locale-specific content varies. Avoid arbitrary HTML, custom JavaScript or uncontrolled CSS inputs.

## Access matrix (baseline)
| Role | Read public | Edit drafts | Publish | Manage releases | Manage users/settings |
|---|---|---|---|---|---|
| Anonymous | Published only | No | No | No | No |
| Author | Published + own authorized drafts | Own scoped content | No | No | No |
| Editor | Published + permitted drafts | Yes | Optional by approval | No | No |
| Publisher | Published + drafts | Yes | Yes | Release metadata only if authorized | No |
| Super Admin | All | All | All | All | All |

Choose a practical minimal role set during implementation, preserving least privilege. Translators may be a scoped editor permission, not necessarily a separate role.

## Validation
Unique key/slug per route and locale, rich text sanitization, image MIME/size, contact data limits, release semver, platform allowlist (Windows/macOS), architecture allowlist determined from actual builds, SHA-256 formatting and verification, only verified active release assets exposed. Enforce at API/database layer, not just UI.

## Lifecycle and referential integrity
Publishing must revalidate relevant routes. Archived releases remain in CMS but disappear from latest download CTA. Deleting used media warns or blocks. Record audit events for publish, delete, user changes, installer upload/activation and company identity edits.

## Extensibility, not scope expansion
Future editions may be a separate collection related to products later. Do not create fictitious Basic/Pro entries or price data in MVP.
