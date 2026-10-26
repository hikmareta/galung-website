# Phase 01 — Requirements and reference audit

Date: 25 October 2026. Status: audit deliverables complete; owner sign-off pending. No application implementation or approved baseline changes.

## Scope, inputs and dependencies

Reviewed: AGENTS.md; README.md; documentation/01-PRODUCT-REQUIREMENTS.md through 10-ACCEPTANCE-CRITERIA.md (all ten); documentation/DECISIONS-AND-OPEN-QUESTIONS.md; documentation/RECONNAISSANCE-2026-10-25.md; prompts/00-START-CODEX.md; prompts/01-PHASE-01.md; prompts/90-PHASE-EVALUATION.md; references/UI Galung.jpg (visually inspected, 1600 × 900). Repository inventory contains documentation/prompts/reference only; no existing source, package manifest, lockfile or running app. Git status fails because this folder is not a Git repository.

Deliverables: this requirements/UI/asset/backlog audit, references/PHASE-01-ANNOTATIONS.html, and documentation/PHASE-01-EVALUATION.md. Decision register receives a status entry only. No invented translations, company identity, product specifications, legal statements or production imagery. Dependencies are owner content/visual review now and approved content/assets before publication; toolchain verification belongs to Phase 02.

Acceptance checks for this phase: every PRD ID mapped, all baseline routes represented, visual regions annotated with reuse/exclusion decisions, unsupported claims and missing assets owned, future backlog linked to acceptance, and evaluation prompt applied. Runtime checks remain deferred until an application exists.

## Sitemap and PRD traceability

Paths below are suffixes under BOTH /id and /en; / means the locale homepage. Route names and final navigation labels remain subject to review, as in doc 03. Legal routes describe intended destinations, not approval to publish unreviewed policies.

| PRD | Page / interface | Components / CMS source | Acceptance evidence required in later phase |
| --- | --- | --- | --- |
| PUB-01 | All locale routes | Locale switch, localized shell; pages/globals | AT-01, AT-11; equivalent detail URL switches, missing translations never mislabeled |
| PUB-02 | / | Hero, benefits, featureGrid, mediaShowcase, portfolioFeed, newsFeed, callToAction; pages | AT-02/03; allowed block reorder shared across locales, independent localized copy stays draft |
| PUB-03 | /about | richText, imageText, communityShowcase; companyProfile | AT-08; unapproved legal fields suppressed |
| PUB-04 | /software; /software/features | Single product overview, featureGrid, gallery, FAQ, download CTA; products key galung | One product; no editions/prices; approved capabilities only |
| PUB-05 | /portfolio; /portfolio/[slug] | Project cards, optional populated category filter, gallery/detail; portfolioProjects/categories | Published and locale-ready list/detail only; empty filter omitted; AT-04 |
| PUB-06 | /news; /news/[slug] | Article cards, category list, dates, rich text; posts/categories | Published-only detail and feeds, localized dates; AT-04 |
| PUB-07 | /download | OS/architecture selector, release metadata, notes/checksum, download state; softwareReleases/releaseAssets | AT-05/06/07/09; anonymous verified active assets delivered by storage/CDN |
| PUB-08 | /contact | Labeled form, privacy notice, errors/success; contactSettings/contactSubmissions | AT-10; validated and rate-limited destination; no false success |
| PUB-09 | /privacy; /terms | Approved rich text, revision date; pages/companyProfile | Approved legal content only; no fabricated legal defaults |
| CMS-01 | /admin login/access | Payload auth, role restrictions; users | Anonymous sensitive read/write and role escalation denied server-side |
| CMS-02 | /admin Pages | Block picker, up/down/enable controls, locale fields, preview/publish; pages | AT-02/03/12; keyboard ordering, authenticated preview and cache invalidation |
| CMS-03 | /admin Media | Upload, localized alt/caption/attribution, usage warning; media | Invalid files denied; referenced media deletion guarded |
| CMS-04 | /admin News/Portfolio | Tables, filters, edit, preview, versions; posts/projects | Authorized draft CRUD, rollback where supported; AT-04 |
| CMS-05 | /admin Downloads | Direct upload progress/retry, verification and retire controls | AT-07/09; trusted verification and role check precede publish |
| CMS-06 | /admin Company Identity | Editable draft/approval fields; companyProfile, auditEvents | AT-08; no made-up owner/address/registration values |
| CMS-07 | /admin localized fields/SEO | Locale completion indicators, metadata form | ID/EN readiness explicit; shared layout does not imply translated content is ready |
| NFR-01 | All public/admin surfaces | Accessible primitives, optimized media, SEO and access services | AT-11/12, doc 07 tests; WCAG target and p75 performance require measurement |

Header/footer navigation globals support these destinations. /admin is separate and unlocalized; no customer login link. / redirect policy and language detection remain open. Unknown slugs must return 404; unavailable translations require an explicit approved policy before routing acceptance. No claim that any route currently renders.

## User flows and error paths

1. Visitor: locale home → single software/feature overview → download → explicit OS and actual architecture → verified active asset → storage/CDN. No login, purchase or license step. Missing release: honest unavailable state; wrong/unsupported platform: choose supported file manually. Do not invent OS detection reliability or architecture choices.
2. Reader: home feed → portfolio/news list → optional populated category → published localized detail → equivalent translated detail if available. Unknown/draft slug: no content leakage. Loading, empty, unavailable translation and fetch failure require separate UI states.
3. Contact: open localized contact → read approved privacy notice → submit validated fields → server accepts configured delivery → accessible success. Invalid input retains safe values with field errors; rate limit/delivery outage gets retry guidance without exposing internals.
4. Editor/translator: authenticated admin → authorized record → locale fields → allowed block reorder/toggle → preview → required-field/asset/locale validation → authorized publisher → invalidation. Order is shared; localized text publication must not accidentally publish the other locale. Draft preview stays private.
5. Release manager: authorized release draft → choose real OS/arch → scoped direct upload → trusted size/hash/type checks → verified → authorized publish → anonymous delivery; retirement removes public selection and invalidates caches. Failure/retry never marks a file active.
6. Company approver: edit actual identity/legal values → draft/review → authorize publish with audit event. Empty/unapproved fields are omitted; missing legal policy blocks its publication, not unrelated development.

## Visual interpretation and UI inventory

Annotation companion: ../references/PHASE-01-ANNOTATIONS.html. Coordinates refer to the supplied 1600 × 900 composite, not a responsive design specification. Only desktop composition is supplied; mobile, interaction, keyboard and admin behavior are not evidenced.

| Region | Observed pattern | MVP interpretation |
| --- | --- | --- |
| A: x44–923 y14–60 | Ivory rounded header, logo, small nav, gold pill | Reuse hierarchy; add ID/EN and accessible mobile menu; remove Pricing/Login |
| B: x45–922 y60–405 | Large dark photographic hero, serif heading, gold emphasis, two actions | Reuse composition with owned photo and approved single-product copy; video action only if a real accessible demo exists |
| C: x102–864 y364–435 | Overlapping ivory benefits strip, green circular icons | featureGrid/benefits, stack on mobile; four statements require verification |
| D: x105–884 y452–695 | Two product cards, device imagery, botanical accents | Replace edition comparison with one Galung product showcase; do not relabel two edition cards as different products |
| E: x47–922 y700–796 | Three-step purchase/license journey | Exclude that journey; proposed replacement explains public download/install/start only after actual installation steps confirmed |
| F: x45–922 y797–900 | Dark community photo band, inset story CTA; lower edge clipped | communityShowcase or portfolioFeed using approved project evidence; unseen footer cannot be inferred |
| G: x957–1571 y36–450 | Plan selection, prices, order summary and payment instructions | Entire checkout surface excluded; no MVP route or schema |
| H: x953–1571 y466–889 | Customer subscription, device/license/payment dashboard | Entire customer surface excluded; not a CMS specification. Only restrained table/card styling may inform editor UI later |

Public primitives: container/section, semantic heading/body styles, link/button variants, icon/benefit item, card, media frame, status/error/empty/loading panel, form field, dialog/menu, breadcrumbs on details as useful. Shell: header, locale switch, footer and skip link. Content blocks: all 13 doc 04 types (hero, richText, imageText, featureGrid, mediaShowcase, stats, gallery, videoEmbed, portfolioFeed, newsFeed, faq, callToAction, communityShowcase); stats stays unused without substantiated figures. Media/video needs poster, caption/transcript and accessibility review as applicable.

Admin inventory: collection navigation, authenticated login, search/filter/status table, localized edit fields, block controls, media selector/usage, preview/publish/version actions, release upload/verify/retire panel, company approval and audit view. Prefer Payload facilities; role set/MFA still TBD. Every surface needs focus, keyboard, validation, busy, empty, error and permission-denied states where applicable. No implementation implied by inventory.

Typography/colors follow provisional doc 05 tokens, not extracted brand certification. Use licensed serif headline and sans body candidates after review. Spacious 8px scale and restrained botanical decoration are proposals. Mobile proposal: stack content/cards, contain hero copy on a contrast-safe background, collapse navigation accessibly, avoid benefit-strip overlap and horizontal overflow. Verify at 320, 390, 768 and 1440 CSS px, both locales, 200% zoom and reflow; no responsive fidelity claim from this desktop image.

## Unsupported claims and production asset needs

| Item observed or implied | Evidence gap / required action | Owner / due |
| --- | --- | --- |
| “Music Beyond Sound”; “Different Ways Same Music”; inclusive-world positioning | Reference slogans are unapproved copy; review product positioning, do not publish by default | Product/content, Phase 05 |
| Visual music for Deaf/hard-of-hearing communities; inclusive/accessible learning | Confirm actual capability and user research; avoid claiming disability outcomes or software accessibility from imagery | Product/accessibility reviewer, before claims publication |
| Visual rhythm guidance, collaborative ensembles, practice modes, customization | Confirm real feature list and screenshots; reference edition bullets are not feature evidence | Product, Phase 05 |
| Classroom/concert suitability; international stages; community impact | Need named approved case studies, permissions and verifiable outcomes | Content/partners, before publication |
| Prices, plan discounts, active subscription, license email, devices/account data | Mock commercial/user data, excluded entirely | Engineering/content, all MVP phases |
| Logo/wordmark and botanical graphics | Source vector, brand rules and reuse rights missing; do not extract screenshot assets | Brand owner, Phase 03 production visual sign-off |
| Angklung/community/concert photos and people | Original high-resolution images, usage rights, required consents/credits, crop/focal point and localized alt | Asset/content owner, Phase 05 |
| Product/device images and demo video | Actual current app captures; OS/version context, owned device framing, real video/captions/transcript | Product/media owner, Phase 05 |
| Fonts/icons | Identify permitted web licenses, weights/glyph coverage and SVG sources | Design/engineering, Phase 03 |
| Company identity/contact/legal | Approved owner/address/contact destination, policies and retention; no fictitious values | Company/legal/operations, before public statements/contact launch |
| Installers | Real files, supported OS/arch/minimum requirements, version/size/checksum, signing/notarization information and notes | Release owner, Phase 06 |
| News/projects/SEO/social previews | Reviewed ID/EN content, titles/slugs/descriptions, dates/categories, rights-cleared covers | Content/translation reviewer, Phase 05 |

No supplied production asset rights are established. Keep the composite in references only; never copy its component photographs, text or fake user details into deployed assets. Internal audit labels here are not production copy or reviewed translations.

## Prioritized backlog and acceptance criteria

| ID / priority / phase | Work and dependencies | Done when / test | Owner |
| --- | --- | --- | --- |
| B01 / gate / 01 | Review this sitemap, flow/content requirements and visual interpretation | Owner explicitly signs off; unresolved decisions recorded; no silent approval | Product/design owner |
| B02 / high / 02 | Verify compatible pinned runtime/packages, establish Git, scaffold strict TS/Payload/Postgres | Reproducible install/start/migration and available baseline checks green, lockfile committed | Engineering |
| B03 / high / 03 | Approved assets/fonts, tokens, shell and primitives | Desktop/mobile component screenshots, measured contrast, keyboard/reduced motion and long-ID/EN-string review | Design/engineering |
| B04 / high / 04 | RBAC and private preview/public query boundaries | Anonymous mutation/draft and escalation tests denied, private cache isolation incl. related media/content | Engineering/security |
| B05 / high / 04 | Shared block registry/order, locale readiness, lifecycle and revalidation | AT-02/03/04; authorized edit/image/reorder in both locales; stale draft never public | Engineering/content |
| B06 / medium / 04 | Media usage, company approval, editor validation/audit | Invalid media denied; referenced deletion protected; AT-08; keyboard ordering AT-12 | Engineering/admin owner |
| B07 / high / 05 | CMS-driven public routes and reviewed content | All mapped suffixes handled in ID/EN; published-only lists/details, honest empty/error states | Engineering/content |
| B08 / high / 05 | Equivalent locale links, metadata, canonical/hreflang/sitemap | AT-01/11; unavailable locale policy signed off; no mixed-language chrome or draft indexing | Engineering/translation owner |
| B09 / high / 05 | Secure contact destination/privacy workflow | AT-10; valid/invalid/rate-limit/outage cases and retention/access verified | Engineering/operations |
| B10 / high / 06 | Direct upload, trusted verification, release publish/retire | AT-05/06/07/09; only approved OS/arch files, anonymous CDN delivery, app never streams bytes | Engineering/release owner |
| B11 / high / 07 | Cross-role/locale/a11y/SEO/performance regression and restore | AT-01–12 observed results, manual keyboard/screen-reader checks, restore/rollback evidence | QA/engineering/operations |
| B12 / launch / 08 | Eligible hosting, approved legal/content, deploy and handover | Real deployment smoke tests, TLS/secrets/backups and operator guide; no readiness assertion before evidence | Operations/company owner |

No future commercial feature is scheduled. Optional blocks (stats/video/FAQ) need real content; do not manufacture filler to satisfy visual symmetry.

## Risks, decisions and deferred work

BLOCKER for gate closure: B01 owner sign-off pending; audit completion is not approval. HIGH before publication: unsupported claims, asset rights and company/legal values; owners above. HIGH before CMS/download acceptance: server permissions, locale lifecycle/cache semantics and trusted release verification unimplemented. MEDIUM: locale fallback/root redirect, final navigation, roles/MFA, contact retention and responsive behavior await design/implementation decisions. No runtime vulnerabilities or accessibility compliance established by this audit.

Existing locked decisions retained: one product, no public customer authentication, public Windows/macOS delivery, shared block order, ID/EN, portable hosting. Proposed mobile adaptations and replacing the purchase journey are design recommendations only. No changes to approved sitemap or product scope.

Deferred: package/version checks and scaffold (02), production token/typography/components (03), CMS/security/lifecycle (04), routes/content/contact/SEO (05), downloads (06), full QA/restore (07), deployment (08). Do not auto-advance past the Phase 01 sign-off gate.

## Commands and actual results

- Get-Location and rg --files: successful; workspace confirmed and planning/reference pack inventoried.
- Get-Content on listed documentation/prompts: successful; source requirements read. Initial combined output truncated, so architecture/content/admin/security/evaluation were reread separately.
- git status --short: failed, exit 1, “not a git repository”. No diff/commit available.
- view_image on references/UI Galung.jpg: successful visual inspection of the full composite.
- File writes and final audit validation: see PHASE-01-EVALUATION.md for exact results.
- Format/lint/typecheck/unit/build/E2E commands unavailable: no package.json, scripts or app. None run or passed. No permissions/localization/download runtime tests possible; future tests mapped above.
- Screens/manual checks: reference visually reviewed; annotation coordinates checked against it. No live routes, rendered site, mobile app screenshots or interactive UI tested.

Commit-ready intent: document Phase 01 PRD/UI/asset traceability, annotated reference and phased acceptance backlog. Git initialization remains Phase 02. Next step: owner content/visual sign-off, then separately activate Phase 02.

## Pembaruan persetujuan — 25 Oktober 2026

Setelah laporan ini dibuat, pengguna menyetujui seluruh hasil Phase 01. Status pending sign-off/B01 pada uraian sebelumnya bersifat historis dan kini selesai. Tambahan pekerjaan foto dan konten baru dicatat di CONTENT-AND-PHOTO-PACK.md dan dievaluasi di CONTENT-PREVIEW-EVALUATION.md. Draf baru tetap perlu ditinjau sebelum publikasi; tidak ada Phase 02 otomatis dimulai.
