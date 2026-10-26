# Phase 04 evaluation — 26 October 2026

**Historical initial evaluation.** Its PASS was superseded by the fresh PARTIAL review. The user-authorized remediation and new evaluation now close R1–R5: **current local Phase 04 verdict PASS** in [PHASE-04-CLOSURE.md](PHASE-04-CLOSURE.md). Counts/claims below remain historical, not the final evidence. Not deployed or production-ready; Phase 05 has not started.

Executed prompts/90-PHASE-EVALUATION.md against AGENTS.md, roadmap 08, acceptance matrix 10 and CMS/admin/security requirements. Reviewed implementation/configuration, generated schema/migration, access rules, hooks, routes, tests and actual output. See PHASE-04-CMS.md for source review, exact scope, changed modules, decisions and editorial runbook. Existing Phase 03 edits were preserved; no commit/push was performed.

## Scope and acceptance matrix
| Scope | Status | Evidence / limits |
|---|---|---|
| Content collections/globals and architecture | PASS, local foundation | Native Payload/PostgreSQL, strict TypeScript, unchanged package pins/lockfile. Pages/posts/projects/product, categories, media/audit and five globals. Release/contact/analytics implementations retain their roadmap gates. |
| Editorial RBAC / draft privacy (CMS-01, AT-02/04) | PASS | Complete integration suite: editor publication/user escalation denied, inactive users denied, public drafts and versions unavailable, published snapshot unchanged by draft edits. Anonymous draft=true returns 404. |
| Shared ID/EN blocks (CMS-02/07, AT-03) | PASS | Integration proves shared order and stable IDs preserve localized values. Browser uses keyboard Move Up, saves draft, checks shared published order and correct ID/EN titles. No translations generated or seeded. |
| Real admin text/image editing and preview | PASS, tested flow | Browser uploads image in native Media editor, edits ID title and EN title/alt description, saves drafts and opens authenticated preview. Local API fixture connects the uploaded ID image to the page; browser image-picker selection itself is not separately asserted. Native localized upload fields were visually inspected in the page editor. |
| Publication and local revalidation | PASS | Browser publishes through authenticated PATCH with the configured Origin, exercising HTTP hooks, then checks both locale homepages. Draft/preview responses are private/dynamic/no-store/noindex. Distributed CDN invalidation NOT TESTED until provider selection. |
| Media (CMS-03) | PASS with limits | Integration validates upload/public approval/access/deletion lock; unit tests reject spoofed MIME, executable/SVG bytes and oversized files. Storage is local development disk; precise usage inventory and production storage remain follow-up. |
| Versioned content / company identity (CMS-04/06, AT-08) | PASS, scoped | Payload retains 30 versions; settings mutations super-admin-only; anonymous globals denied; legal identity draft changes audited. No legal facts invented. Rollback UI is provided by native Payload; a dedicated browser restore-version scenario was not executed. |
| Audit trail | PASS, scoped | Integration rejects direct audit creation/read by unauthorized users. Hooks capture user/content/media/global saves, publish and delete in the same request/transaction, with IDs/actions rather than passwords or content bodies. Not an external tamper-proof service. |
| Accessibility / responsive (AT-12) | PASS for executed checks | Keyboard section ordering; existing responsive ID/EN, focus, reduced-motion, font, text-resize and mobile navigation regressions pass. No screen-reader/WCAG certification. |
| Migration and recovery | PASS | Fresh migration, full batch down, empty-schema assertion, reapply, pool shutdown, pg_dump/psql restore. Working local DB backed up before migration; migration completed. |
| Installer/contact/full public SEO acceptance | NOT TESTED / later phases | Phases 05–08. No download binary proxy, commercial tiers, payments or customer portal introduced. Existing specimens stay noindex. |

## Commands actually executed
Used ignored local Node 24.22.1 / pnpm 10.34.9 per foundation runbook. Initial system pnpm attempt failed ENOTFOUND downloading pnpm; system Node 24.19.0 is too old. Restricted DB connection returned EACCES; approved local execution used disposable randomly named databases, removed in finally.

| Command | Actual final result |
|---|---|
| `payload generate:types` | Exit 0; generated types retained |
| `payload generate:importmap` | Exit 0; no new imports required |
| `payload migrate:create phase04` | Exit 0; final migration/snapshot 20261026_041637_phase04; inspected and corrected as below |
| `pnpm format` / `pnpm format:check` | Final check exit 0; intermediate edited-file formatting warnings corrected |
| `pnpm typecheck` | Exit 0 |
| `pnpm lint` | Exit 0; two next/no-img-element warnings in content/preview rendering |
| `pnpm test` | 11 passed, 0 failed |
| `pnpm test:integration` | Final aggregate exit 0: bootstrap, authentication/reset regressions, editorial RBAC, localization, lifecycle, media, globals, audit controls |
| `pnpm test:integration editorial` | Focused regression exit 0 after locale fix |
| `pnpm test:database` | Exit 0: up/down/reapply, clean pool shutdown, backup restore |
| `pnpm build` | Exit 0; dynamic locale/admin/API/preview routes; no database content prerendered |
| `pnpm test:e2e` | Final aggregate exit 0: **27 passed (54.0s)** |
| Focused `pnpm test:e2e tests/e2e/editorial.spec.ts` | Initial native admin flow passed; adding HTTP publication exposed missing test Origin, corrected before final full passing run |
| Local backup then `payload migrate` | Exit 0; working local DB backup in ignored `.tools/phase04-before-working-db.sql`; migration applied, no content/user fixtures seeded there |
| `git diff --check` | Exit 0; existing CRLF normalization warnings only |

Raw summaries retained in ignored `.tools/phase04-integration-final.log`, `phase04-editorial.log`, `phase04-database.log`, `phase04-build.log`, `phase04-e2e-final.log` and `phase04-local-migration.log`. Backup ignore status explicitly checked. No deployment, production security audit, external CDN test, Lighthouse/field Core Web Vitals, screen-reader audit or dependency vulnerability audit performed.

## Findings reproduced and remediated
- PostgreSQL rejected a new enum value used as the default in the same transaction. Upgrade now converts role through text, recreates the enum, then converts back; existing super-admin role preserved.
- Generated down migration redundantly dropped foreign keys already removed by CASCADE; guarded those statements. Payload rolls down the whole migration batch, so removed an unnecessary second down call.
- Locale readiness validation passed the write request into locale-specific reads. Payload mutates req.locale; this overwrote EN title during publication. Validation now uses a separate request object. Integration and browser title assertions reproduce and close this bug.
- Initial preview route lacked a root layout; added one. Preview explicitly rejects anonymous/unknown collection/invalid locale requests and escapes content.
- New browser fixture destroyed Payload's default cached instance, breaking the following administrator test. Fixture now uses its own cache key; complete suite passes together. Increased the bounded bootstrap and multi-screen admin budgets to 120 seconds for cold larger-schema runs; exact outcome assertions remain enforced.
- Corrected required email-label selector and anonymous draft assertion (secure 404). HTTP test now supplies the configured Origin, preserving the CSRF boundary rather than bypassing it.

## Screens and checks
Automated: /id, /en, /admin/login, native media create/edit, page draft editor in both locales, /preview/pages/[id]?locale=id, authenticated publication endpoint and published homepages; unauthorized preview/API paths; existing admin/users and responsive navigation specimens. Visually inspected phase-04-editor.png (native EN draft fields/order/media picker/version toolbar) and phase-04-draft.png (synthetic pixel fixture and reordered sections). Screenshots under documentation/screenshots/. Synthetic media is a test fixture, not production imagery.

## Open issues / owners
No known blocker for the local Phase 04 gate after executed checks.

- MEDIUM — development/operations: local disk media is development-only; choose portable object storage and test authorization, outages, request rate limits and CDN invalidation before launch. Test image files are retained only in ignored local media storage; test databases are isolated/deleted.
- MEDIUM — development: media deletion lock is deliberately broad; precise per-document/version usage and archival workflow remain follow-up.
- MEDIUM — development: generic initial blocks use escaped plain text/items/images. Finished rich-text/feed/video presentation, full page design, approved global projections/navigation and SEO remain Phase 05. Scheduled publication is absent.
- MEDIUM — operations/development: deleting a user can null the audit actor relationship; prefer deactivation and add durable actor snapshots before production retention sign-off. Authentication-event coverage/monitoring also needs the production hardening review.
- LOW — performance: native image rendering yields two lint warnings; responsive optimization and measured content performance remain Phase 05/07. Larger generated schema increases cold CLI startup; no real-world performance claim made.
- Product/content owners: legal identity, reviewed ID/EN copy, asset rights, role assignments, contact destination, installer architectures/signing and hosting remain TBD.

## Documentation / next steps
PHASE-04-CMS.md, this evaluation, README, roadmap, decision register and changelog updated. Migration/types are commit-ready alongside implementation/tests; keep previous uncommitted Phase 03 work intact when staging. Recommended next scope, only on activation: Phase 05 public CMS-driven pages and specialized block rendering, approved global projections and locale SEO. Release upload/delivery stays Phase 06; deployment stays Phase 08.
