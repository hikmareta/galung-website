# Phase 03 fresh review — 26 October 2026

**Superseded by [Phase 03 closure](PHASE-03-CLOSURE.md): all six Phase 03 findings were remediated and reverified. Historical results below remain unchanged.**

**Verdict: PARTIAL.** Core public design-system specimens exist. The phase is not
closed: integration verification failed in the implementation run, keyboard
locale coverage was weakened, and some doc 05 acceptance remains incomplete.
This review supersedes broader PASS claims in PHASE-03-EVALUATION.md; that file
retains the implementation command history. No Phase 04 activation is implied.

## Review scope and evidence
Read AGENTS.md, README, roadmap 08, acceptance matrix 10, docs 03/05/07, decision
register, Phase 03 implementation/evaluation, and the Phase 02 foundation context.
Inspected actual tracked diff plus new untracked components, locale dictionary,
font assets/licenses, screenshots and browser tests. Inspected package scripts,
strict tsconfig, Playwright configuration, Next headers, CMS access configuration,
integration auth test and operator bootstrap script. No application changes made
by this review. Reviewed mobile ID, tablet EN and desktop ID captures. Fresh
browser rerun regenerated all ten captures; screenshots are visual evidence,
not a manual screen-reader or complete interaction audit.

## Scope / acceptance matrix
| Requirement | Result | Evidence and limits |
|---|---|---|
| Phase 03 color, font, radius, container tokens | PASS | globals.css :root; Poppins/Nunito Sans local WOFF2 and OFL notices |
| Spacing tokens govern components | PARTIAL | six --space-* variables defined but never consumed; padding/gaps remain literals |
| Reusable buttons/cards and public shell | PASS | components/ui/primitives.tsx, website/header.tsx, locale layout/page |
| Mobile disclosure semantics | PASS | native button, aria-expanded/controls, hidden collapsed links, Escape focus return; browser cases |
| Keyboard locale switching | NOT TESTED | foundation.spec.ts:158–159 now uses clicks; design-system cases never activate a locale link by keyboard |
| ID/EN sample chrome | PASS | explicit sample dictionary, html lang, labeled unreviewed copy, existing route switch test |
| Approved production translations | NOT TESTED | no approved translations; samples intentionally identified |
| Current examples at 375/768/1440 | PASS | six browser cases and captures; current sample text fits |
| Long localized strings, zoom, text spacing | NOT TESTED | tests inject no long strings and exercise no zoom/text-spacing settings |
| Reference visual vocabulary | PASS | forest/ivory/gold, pill CTA, rounded cards, decorative bamboo, approved sans headings |
| Reference photographic composition / complete doc 05 homepage presentation | PARTIAL | decorative hero specimen replaces photo showcase; no representative image-based cards/gallery/value bar |
| Related admin visual identity (doc 05) | PARTIAL | existing title suffix only; no new admin design-system integration or visual evidence |
| No future commercial/customer features | PASS | actual changed code has no pricing/customer login/payment/edition paths or data |
| No sensitive module expansion | PASS | no CMS schema, access, storage, installer, secret or dependency changes |
| Format/lint/types/unit checks | PASS | fresh commands below |
| Integration regression suite | FAIL | two actual implementation-run ETIMEDOUT failures, auth.ts:44; not rerun in this review |
| AT-01 | PARTIAL | sample locale chrome works; published homepage is not implemented |
| AT-02/03/04 | NOT TESTED | draft/localization/order/publication modules await Phase 04/05 |
| AT-05/06/07/09 | NOT TESTED | release/storage/download modules await Phase 06 |
| AT-08 | NOT TESTED | editable legal fields/audit not implemented; no legal facts invented |
| AT-10 | NOT TESTED | no contact form |
| AT-11 | PARTIAL | global/header metadata noindex present; production canonical/hreflang/sitemap absent |
| AT-12 | PARTIAL | public skip/menu keyboard checks exist; locale activation and admin ordering not covered |

## Changed files and architecture
Phase changes relative to HEAD (including untracked additions):
- src/app/(website)/[locale]/{layout,page}.tsx — shared branded shell and specimens.
- src/styles/globals.css — fonts, tokens, component styling, responsive/motion rules.
- src/components/ui/primitives.tsx — ButtonLink/Card; website/header.tsx — client disclosure.
- src/lib/i18n/design-copy.ts — explicit ID/EN sample copy.
- public/fonts/ — four WOFF2 and two OFL notices; Poppins 400 is copied but unused.
- tests/e2e/design-system.spec.ts; tests/e2e/foundation.spec.ts — viewport/menu cases and changed locale test.
- documentation/screenshots/phase-03-*.png — six pages and four open-menu captures.
- README, CHANGELOG, documentation/05, decision register, Phase 03 reports.

App Router/React boundaries are sensible: page/layout render on the server; only
disclosure state requires a client component. Tailwind remains installed/imported;
plain CSS supplies the design system. Payload/Postgres and strict TypeScript are
preserved. Dependencies and lockfile are unchanged. CMS block registry is not yet
implemented; these are presentational specimens, not CMS-driven public pages.
Header CTA duplicates button markup rather than using ButtonLink (minor reuse debt).

## Commands and actual results
Fresh review environment: Windows PowerShell, repository D:\Projects\galung-website,
pinned ignored Node 24.22.1/pnpm runtime via documented PATH prefix.

| Command | Actual result |
|---|---|
| Get-Content, rg, git status --short, git diff --stat/--name-only/--numstat, targeted git diff | Completed; read tracked and untracked sources |
| pnpm format:check | exit 0; all matched files formatted |
| pnpm lint | exit 0; no diagnostics |
| pnpm typecheck | exit 0 |
| pnpm test | exit 0; 6 tests, 6 pass, 0 fail/skip |
| git diff --check | exit 0; CRLF-to-LF notices only |
| pnpm test:e2e | exit 0; 10 passed (25.1s), isolated DB migrated and removed |

Retained implementation-run evidence, **not rerun during this review**:
- Build: initial EPERM generated-directory failure; permitted retry exited 0.
- Database: initial EACCES; permitted retry exited 0 for migration down/reapply,
  pool shutdown and pg_dump/psql fixture restore; isolated DB removed.
- Integration: initial EACCES; two permitted attempts failed the same 30-second
  administrator subprocess timeout; isolated DBs removed. No passing inference.
- Browser: initial 6 pass/4 fail from stale menu-name locator; corrected run 10/10.
- Color math: main text pairs 6.13:1–14.03:1; not an automated accessibility audit.
No fresh build, database, integration, audit, Lighthouse, screen-reader, forced-color
or production measurements are claimed. No package scripts are missing.

## Ranked issues with reproduction and owners
No confirmed BLOCKER/HIGH security defect was found in this public UI change.
The unresolved verification failures still prevent a full phase PASS.

1. **MEDIUM P03-R1 — Integration gate fails (engineering).** Run
   pnpm test:integration with the documented runtime and local DB. Implementation
   runs failed in tests/integration/auth.ts:41–52: spawnSync timeout:30000 for
   scripts/create-admin.ts. The helper correctly rejects ETIMEDOUT. Root cause
   remains unproven; do not call this a UI or auth vulnerability without evidence.
   Diagnose process startup/DB lifecycle and restore a real passing run without
   suppressing the timeout assertion. No application-source change in Phase 03
   touches bootstrap/auth; causality is not established.
2. **MEDIUM P03-R2 — Keyboard locale regression coverage removed (engineering/QA).**
   git diff tests/e2e/foundation.spec.ts shows previous Tab/focus/Enter assertions
   replaced by .click at lines 158–159, while test title still says keyboard.
   design-system.spec.ts tests skip and disclosure, not keyboard locale activation.
   Restore an end-to-end keyboard path through mobile menu to English and back,
   asserting focus, URL and html lang; retain mouse coverage separately.
3. **MEDIUM P03-R3 — Full design acceptance overstated (design/engineering).**
   Compare doc 05 Design acceptance with page.tsx and Payload layout/config.
   Public specimens match palette/type but do not demonstrate the photographic
   composition or admin brand alignment. Record explicit Phase 03 versus Phase 05
   boundaries and complete required representative visual/admin evidence; do not
   silently move stated acceptance to a later phase. This is an acceptance gap,
   not a claim that reference photographs may be reused.
4. **MEDIUM P03-R4 — Long-copy resilience unverified (QA).** Browser fixtures only
   use fixed dictionary content at three widths. Add longer localized nav/CTA,
   card and heading specimens plus zoom/text-spacing checks, including near
   639/640 and 1199/1200 breakpoints. overflow-wrap:anywhere exists only <=639px;
   do not infer wider long-word behavior from current samples. No overflow bug
   is asserted without reproduction.
5. **LOW P03-R5 — Spacing tokens are disconnected (engineering).**
   rg -n -- '--space-' src/styles/globals.css returns declarations only.
   Changing --space-4 does not change components' repeated 2rem spacing.
   Use the declared scale in component rules or document a narrower token contract.
6. **LOW P03-R6 — Sample-only locale/SEO and asset debt (content/engineering).**
   Color swatch labels and layout title are English on /id; sample copy is labeled,
   but complete locale chrome/metadata is not demonstrated. Translate reviewed
   production labels in Phase 05; do not publish these as approved translations.
   Remove unused Poppins 400 asset when the final font contract is settled.

## Security, accessibility, performance and SEO limits
- RBAC: existing active-admin server access unchanged. Browser denial/session tests
  provide scoped evidence only. Editorial roles, drafts and upload protections are
  later work; no blanket security-compliance claim.
- Accessibility: semantic regions/headings, skip link, native disclosure, focus
  rules and reduced-motion CSS are present. Test coverage is narrower than full
  keyboard navigation. No screen-reader or WCAG certification. Brand link does not
  explicitly enforce the documented 44px goal; this alone does not prove AA failure.
- Responsive: reviewed captures have readable wrapping and no clipping with current
  samples. Tablet three-column cards are narrow but legible; content stress untested.
- Performance: self-hosted fonts use swap; four shipped font files total 54,776 bytes,
  of which three are declared. No hero photo/network service introduced. Font request
  success, fallback layout shifts, CWV, Lighthouse and real-user targets unmeasured.
- SEO: noindex is appropriate for samples, not launch acceptance. Same English title
  across locales and absent canonical/hreflang/sitemap remain production gaps.
- Assets: decorative CSS uses no reference photos. Production logo, imagery rights,
  factual claims, legal identity and translations still need owner review before launch.

## Required remediation and next scope
Before closing Phase 03: resolve R1, restore R2 keyboard coverage, make R3 scope
and evidence explicit, and verify R4 long-copy behavior. Address R5 while preparing
components for reuse. Content/legal/hosting TBDs are production gates, not reasons
to invent business facts or block independent local development.
After re-evaluation and user continuation, recommended Phase 04 scope is Payload
collections/globals, navigation settings, controlled block registry, least-privilege
editorial access, media, drafts, localization and revalidation. No Phase 04 work
performed by this evaluation.

## Documentation and delivery status
Updated README gate summary, roadmap current-status note, changelog and evaluation
pointer to this fresh report. No locked business decision changed. Earlier commands
remain historical evidence, not fresh passes. The working tree includes untracked
Phase 03 components/assets/tests/reports; any eventual commit must include them,
not just git diff's tracked-file list. No commit, push or deployment performed.
