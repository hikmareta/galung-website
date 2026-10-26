# 06 — Admin CMS Functional Specification

## Modules
Overview, Pages, Product, News, Portfolio, Media, Downloads, Translations, Navigation, Company Identity, SEO/Site Settings, Users & Roles, Audit.

## Page Manager workflow
Select page -> select locale -> update localized fields/media -> reorder **allowed structured blocks** -> toggle visibility -> preview draft -> validation for required fields and localized publish readiness -> publish -> observe frontend revalidation. Changes stay draft until explicitly published.

## Content listing workflow
Search/filter by type, status, locale and updated date; create/duplicate/edit; media selection; author/review; scheduled publish only if supported and tested. Prevent unintended publication across locales.

## Media library
Upload images/video poster/docs; specify alt text, caption, licensing/attribution; crop via defined rendering options; searchable and reusable; warn/block deletion if referenced. Large installer assets have a **separate** release upload flow.

## Download Manager
Release draft -> choose OS and arch -> request upload-scoped signed URL -> direct upload -> verify `sizeBytes` and SHA-256 -> mark asset verified -> publish release -> public download button resolves latest approved asset. Retire and replace should not destroy audit history. Support progress/retry/error display.

## Company identity
Editable company display name, legal name, address, contacts, registration identifiers where relevant. Draft/approval on legal fields, empty field displays nothing; no defaults representing unverified legal facts.

## Permissions
Super Admin full; Editor content; Publisher publication; Author own content as scoped; least privilege verified in API tests. Separate CMS auth from public anonymous download. Sensitive company fields and installer activation require authorized role and audit event.

## Experience
Friendly inline validation, destructive action confirmations, unsaved-changes warning, loading/empty/error states, accessible section ordering with up/down controls even if drag handles exist.
