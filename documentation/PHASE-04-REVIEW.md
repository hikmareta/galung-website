# Phase 04 fresh review — 26 October 2026

**Historical review verdict: PARTIAL.** The two HIGH and three MEDIUM findings below were reproduced at review time. User-authorized remediation subsequently closed R1–R5; [PHASE-04-CLOSURE.md](PHASE-04-CLOSURE.md) records the new evaluation and **current local Phase 04 PASS**. Reproductions/results below remain historical evidence. The review itself made no runtime fixes or deployment.

## 1. Reviewed scope and acceptance
Reviewed AGENTS.md, README.md, numbered requirements 01–10, DECISIONS-AND-OPEN-QUESTIONS.md, roadmap gate, acceptance matrix, Phase 04 implementation/evaluation, current working diff/status, Payload config/access/collections/globals/blocks/hooks, public read/render paths, preview, generated migration/types, test runner, unit/integration/browser tests and relevant installed Payload upload operation source. The checkout contains uncommitted Phase 03 and Phase 04 work; Git diff alone excludes many untracked modules and cannot isolate a committed Phase 04 boundary.

| Requirement / acceptance | Result | Evidence and limit |
|---|---|---|
| Architecture, native Payload/Postgres, strict TS, pinned dependencies | PASS | Existing stack and lockfile unchanged; no extra ORM/customer auth or commercial product modules. Access, schema, hooks and read/render modules separated. |
| Collections/globals / block registry | PARTIAL | Required content collection/global names and 13 block names exist; shared blocks have identical generic fields. Missing modeled fields include site social links/SEO defaults, portfolio featured, and post publishAt. Rendering may belong to Phase 05; schema requirements in doc 04 still need reconciliation (R5). Release/delivery/contact functionality stays at its own roadmap scope. |
| CMS-01 / anonymous draft and role controls | PASS for tested metadata paths | Baseline tests exercise no public drafts/versions, inactive users, editor publication denial and user escalation. Approved media file mutation authorization FAILS despite a 403 result (R1). |
| CMS-02 / AT-02 / AT-03 text and shared ordering | PASS for tested text/order | Existing integration preserves localized values when shared order changes; browser edits ID/EN titles and keyboard-reorders blocks. Explicit two-locale review flags/title/slug checks exist. Image publication is not safe/complete (R2). |
| End Phase 04 text/image/order in both locales without code | FAIL as a complete gate | Browser connects media using Local API fixture code, uses super-admin, does not approve its uploaded image, and asserts only headings/order after publish. It never asserts visible public images. New probe proves published selected pending media remains an ID and is omitted by renderer (R2). Full editor image picker/approval/publish/visible-image flow remains unverified. |
| CMS-03 media permissions and reference protection | FAIL | Denied editor replacement deletes the approved original (R1). Broad delete lock protects references only on delete operations; it does not protect replacement. No per-reference usage display. |
| CMS-07 localized publication readiness / accessibility | PARTIAL | Fallback disabled and localized fields configured. Public approved media can have null EN alt (R3); reviewedLocales is an attestation, not validation of all localized block/media fields. |
| CMS-04 draft/version/preview | PARTIAL | Draft access and authenticated dynamic/noindex preview implemented/tested; 30 versions retained. Restore-version and news/project slug routes not browser-verified; latter routes remain Phase 05. |
| CMS-06 / AT-08 company identity | PASS for private draft/access design; PARTIAL full acceptance | Legal fields editable without invented defaults; super-admin mutations and audit hooks, anonymous globals denied. Public approved projection and precise legal-edit audit assertions remain incomplete. |
| Audit immutability/attribution | PARTIAL | Direct API create/update/delete denied; events recorded. User deletion nulls actor on historical publication events (R4). |
| Revalidation | PARTIAL | HTTP hooks call revalidatePath for both locales; dynamic homepage updates verified by earlier browser flow. No warmed cached-page/CDN invalidation assertion; dynamic rendering alone cannot prove invalidation. |
| AT-12 keyboard/responsive | PARTIAL | Prior browser evidence covers public mobile navigation, desktop ordering, admin samples. Complete mobile editorial media/order flow, screen-reader audit and full WCAG AA conformance NOT TESTED. |
| AT-04 exact news/project unpublished slug route | NOT TESTED | Collection draft filtering tested; actual detail route behavior belongs to Phase 05 and is not established by those API tests. |
| AT-05/06/07/09/10 downloads/contact | NOT TESTED, later scope | No release binaries/contact workflow introduced. |
| AT-11 full public SEO / field CWV / production operations | NOT TESTED, later scope | Admin/preview/staging noindex guards exist. Full canonical/hreflang/sitemap/public metadata and real performance/production delivery remain Phase 05/07/08. |

## 2. Findings, reproduction and remediation

### P04-R1 — HIGH — rejected editor upload destroys approved media
Owner: development. References: src/collections/Media.ts:14 and :29–36; installed Payload collections/operations/utilities/update.js:90–166.

1. Publisher creates an approved PNG; verify its original file exists.
2. Editor calls access-enforced media update with a valid replacement PNG.
3. The operation rejects with status 403, but the original file is gone. DB transaction rollback does not restore filesystem bytes.

Reproduced output: `{"probe":"approved-media-denied-editor-replacement","status":403,"originalFileStillExists":false}`.

Cause: collection update access admits all editors. Payload deletes old associated files and writes replacement files before the application beforeChange authorization runs. This permits an editor to damage a live approved asset despite rejection; the failed operation also has no successful-change audit event.

Required: enforce approved-record update authorization in collection access or another hook proven to run before file side effects. Preserve original bytes/URL on denial. Add REST/admin and Local API regression assertions for original file hash/existence, response denial and absence of unauthorized new files. A metadata-only 403 assertion is insufficient.

### P04-R2 — HIGH — publication accepts pending images, then public image disappears
Owner: development. References: src/hooks/editorial.ts:20–55, src/components/website/content-blocks.tsx:16–24, tests/e2e/editorial.spec.ts:82–90 and :156–172.

1. Editor uploads media (approved=false).
2. Publisher references it in localized ID/EN hero blocks, saves both title/slug drafts, sets both review flags and publishes.
3. Publication succeeds. Anonymous depth-1 read returns a numeric media ID, not an accessible media object; ContentBlocks renders images only from objects with a URL.

Reproduced output: `{"probe":"publish-pending-media","status":"published","publicImage":2,"rendersImage":false}`.

The current browser test follows this shape and still passes because it asserts text/order but no public image. Its Local API fixture attaches ID media; it does not complete an editor's image-picker/approval workflow through the UI.

Required: validate every supplied image reference in heroMedia, blocks and nested items across relevant locales before publication; reject pending/unavailable media with field-specific errors. Preserve drafts until ready. Add a true native editor image selection, publisher approval/publication and anonymous visible-image test in both locales, including a negative pending-media case.

### P04-R3 — MEDIUM — public media approval skips localized alt readiness
Owner: development/content. References: src/collections/Media.ts:29–38 and :66–79; src/components/website/content-blocks.tsx:19–21.

Create/approve media in ID without saving EN alt. Anonymous EN read with fallbackLocale:false succeeds and returns alt:null, even though alt is declared localized/required. Reproduced output: `{"probe":"approved-media-en-alt","alt":null}`. Renderer passes that value to img and cannot provide a meaningful text alternative.

Required: enforce the supported-locale alt policy when approving public media; document decorative-image semantics if intentionally allowed. Test missing EN alt rejection and complete bilingual approval. Do not create translations automatically.

### P04-R4 — MEDIUM — staff deletion erases historical audit attribution
Owner: development/operations. References: src/collections/Content.ts:111, src/hooks/editorial.ts:69 and migration 20261026_041637_phase04.ts:5125 (actor FK ON DELETE set null).

Publish as a staff account, record the audit event, delete that user as super-admin, read the old event. Reproduced: `{"probe":"audit-actor-after-user-delete","actor":null}`. API immutability alone does not preserve who performed the action. This was acknowledged previously as deferred, and is now independently reproduced.

Required: retain an immutable minimal actor ID/role snapshot, or prohibit deleting referenced staff accounts and use deactivation under an explicit retention policy. Test deletion/deactivation and original event attribution.

### P04-R5 — MEDIUM — schema completeness and documentation disagree
Owner: development/product. References: documentation/04-CMS-CONTENT-MODEL.md, src/globals/editorial.ts:48–69, src/collections/Content.ts:33–86, src/blocks/registry.ts:18–42.

siteSettings has generic displayName/description/email/logo/publicURL, with no social-links or SEO-default fields; projects have no featured field; posts have no publishAt. richText/videoEmbed/faq/feed block names all receive the same text/items/media/link schema. Plain text is safe but is not a completed rich-text authoring field. No arbitrary HTML is introduced, which is positive.

Required: map every Phase 04 field requirement to an implemented field or an explicitly approved deferral; implement required schema fields before the next public page layer depends on them. Do not treat an agent-authored runbook deferral as approval to change a locked requirement. Full feed/video page rendering can remain Phase 05; scheduled execution need not be enabled merely to model publication dates.

### LOW — rendering and verification limits
Owner: development/QA. Native img elements produce two lint warnings and lack intrinsic height in content rendering. Optional headlines can yield empty headings or unnamed CTA anchors; no full content-driven a11y audit was run. Preview/public renderers are duplicated and differ (e.g. CTA links), creating drift risk. These are code-inspection risks, not newly executed screen-reader/performance findings.

No critical/BLOCKER-severity exploit was established. R1/R2 are HIGH and block phase advancement.

## 3. Commands and raw results

Fresh review execution uses ignored local Node 24.22.1 / pnpm 10.34.9. Only synthetic files and a randomly named disposable PostgreSQL database were used for adversarial probes; working DB/content was not modified. Test database cleanup completed after the failed assertions. Unique synthetic upload files remain in ignored development media storage; none is a production asset.

| Command | Fresh review actual result |
|---|---|
| Repository/doc/code reads, git diff --stat/status, installed Payload operation inspection | Completed; identified mixed uncommitted Phase 03/04 state |
| `pnpm format:check` | Exit 0 |
| `pnpm typecheck` | Exit 0 |
| `pnpm lint` | Exit 0, 0 errors, 2 next/no-img-element warnings |
| `pnpm test` | Exit 0, 11 passed / 0 failed |
| `pnpm test:integration phase04-review` | **Exit 1**: four reproduced defects; migration up succeeded and disposable DB removed |
| `pnpm test:integration` | Exit 0; fresh bootstrap/auth/reset and existing editorial baseline all pass |
| `pnpm build` then `pnpm test:e2e` | Both exit 0; fresh browser baseline **27 passed (1.6m)** |
| `git diff --check` | Exit 0 after normalizing edited document trailing newlines; existing CRLF normalization warnings only |
| Migration down/reapply/backup restore | NOT rerun in this review; previous phase log inspected and reports pass |

New raw probe output:

```text
approved-media-denied-editor-replacement: status=403, originalFileStillExists=false
approved-media-en-alt: alt=null
publish-pending-media: status=published, publicImage=2, rendersImage=false
audit-actor-after-user-delete: actor=null
AssertionError: Phase 04 adversarial review found unresolved acceptance defects
ELIFECYCLE Command failed with exit code 1.
Removed isolated integration database
```

Log: ignored .tools/phase04-fresh-review.log. Baseline current logs: .tools/phase04-review-baseline-integration.log, phase04-review-build.log, phase04-review-baseline-e2e.log. Earlier phase reports of 27 browser passes, integration/build/restore passes remain historical evidence, not a fresh security conclusion. A green baseline does not cover the new failing probes.

## 4. Changed modules / architectural alignment

Phase implementation inspected: access/editorial; collections/Users, Content, Media; globals/editorial; blocks/registry; hooks/editorial; services/content/read and media-validation; content-blocks/public homepage/preview; Payload config/types and Phase 04 migration; noindex/private-cache headers; integration/browser/unit tests and isolated runner. Architecture remains native Payload + Postgres with server checks and published-only public reads; no pricing, payment, customer accounts or new ORM. Production storage/CDN remain undecided.

This review changes only:
- tests/integration/phase04-review.ts (durable failing reproduction, four probes).
- scripts/run-tests.ts (explicit phase04-review isolated selection; default baseline unchanged).
- documentation/PHASE-04-REVIEW.md (this report), README, roadmap, decision register, changelog, and supersession notices in Phase 04 implementation/evaluation docs.

No runtime collection/hook/access/storage fixes were applied. The adversarial suite is explicitly selectable; existing default green test commands do not include it yet. It is an observational reproduction harness using currently permitted setup, not the final expected-safe contract suite. Remediation must preserve its cases as independent expected-safe tests in normal coverage; enforcing approval rejection may require adjusting setup.

## 5. Required next work and gate

1. Close R1 before any further use of approved media replacement by editors; verify rejection causes no file side effects.
2. Close R2/R3 and test the complete editor/publisher bilingual image workflow, including visible anonymous images and negative readiness cases.
3. Resolve R4 with durable attribution or enforced retention/deactivation. Reconcile R5 against the approved schema contract before Phase 05 depends on missing fields.
4. Rerun adversarial probes, baseline integration, native editor workflow, responsive/a11y checks and build. Update verdict only from observed results.
5. After Phase 04 closure and explicit activation, recommended Phase 05 scope remains CMS-driven public pages, specialized block rendering, approved global projections and locale SEO. Do not start automatically. Installer delivery stays Phase 06; hosting/production launch stays Phase 08.

## 6. Documentation drift

README/roadmap/earlier Phase 04 evaluation overstate a complete local PASS because the image gate is not asserted and media rejection is not atomic. Their PASS statements are superseded by this PARTIAL review, while historical successful commands are preserved. The CMS runbook's statement that approved images are protected must be read with R1's warning. No business/legal/translation/hosting decision changes are approved by this review.
