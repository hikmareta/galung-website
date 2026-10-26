# Phase 03 design-system contract

Current gate and command evidence: [Phase 03 closure](PHASE-03-CLOSURE.md).
Local, noindex, explicitly unreviewed specimens at /id and /en. One Galung product;
no pricing, customer login, payment or edition UI.

## Sources and boundaries
Reviewed AGENTS.md, README, docs 01/02/03/04/05/07/08/10, decision register,
Phase 02 runbook, phase/evaluation prompts, reference JPEG, existing routes,
locale/auth/configuration/styles/tests and conceptual asset provenance.
Phase 03 implements presentational primitives and related existing admin shell.
CMS blocks/settings/editorial lifecycle remain Phase 04; real public pages and
production SEO remain Phase 05. Details and acceptance mapping are in closure.

## Tokens and typography
src/styles/tokens.css is imported by globals.css and admin.css. Primary #073E32,
secondary #0B5C48, gold #D9AC5E, ivory #FAF7F0, charcoal #242820, muted #536158,
border #D9DFD7. Spacing scale: 8/16/24/32/48/64px at the default root size;
component padding, margins and gaps consume these variables. Smaller optical
adjustments are explicit CSS values. Typography sizes are independent of spacing.
Card radius 24px; pill radius 99rem; max container 1216px.
Headings: Poppins 600/700. Body/UI: Nunito Sans 400–700. Three self-hosted WOFF2
files, font-display swap, sans fallbacks and OFL notices. Runtime byte total:
46,892 bytes for fonts; unused Poppins 400 remains archived outside public/.

## Components and responsive behavior
ButtonLink: primary gold/dark text or outlined secondary; shared by header and hero.
Card: optional media inside article height plus padded content. All semantic
headings are supplied in the demonstrated H1/H2/H3 structure. Images are responsive
pre-encoded WebP concepts with fixed intrinsic dimensions and descriptive sample
captions; hero image is decorative and its conceptual nature is visible in text.
No reference photograph is published as an asset.

Header: native disclosure button, aria-expanded/controls, standard nav links,
separate named language nav, current-language indication and skip link. Escape
closes and restores trigger focus. Collapsed links are display:none. No modal trap
or ARIA application-menu pattern. 1200px nav breakpoint; keyboard ID↔EN verified.
Footer contains no invented legal identity. Main copy and metadata use separate
explicit sample dictionaries; shared ordering across locales.

Card columns auto-fit a minimum 18rem width (capped at available width), with one
column below 640px. Token panels and swatches similarly adapt. Public sample
review shows three desktop cards, two tablet cards, one mobile card. Long edited
labels wrap at every width. Stress checks cover 200% root text and text spacing;
this is not a claim of browser-chrome zoom or full screen-reader testing.

Admin: supported Payload logo/icon slots, shared fonts/tokens, light ivory/forest
styling; built-in dark palette and validation/disabled states retained. Actual
login/dashboard/users list/edit screens are visual evidence. Editorial controls
not yet implemented are not simulated.

## Visual evidence
| Surface | Captures |
|---|---|
| ID samples | [375](screenshots/phase-03-id-375.png), [768](screenshots/phase-03-id-768.png), [1440](screenshots/phase-03-id-1440.png) |
| EN samples | [375](screenshots/phase-03-en-375.png), [768](screenshots/phase-03-en-768.png), [1440](screenshots/phase-03-en-1440.png) |
| Disclosure | [Mobile menu](screenshots/phase-03-menu-id-375.png) |
| Admin | [Login](screenshots/phase-03-admin-login.png), [mobile](screenshots/phase-03-admin-375.png), [desktop](screenshots/phase-03-admin-1440.png), [table](screenshots/phase-03-admin-users.png), [edit](screenshots/phase-03-admin-edit.png) |

Asset provenance and hashes remain in content/generated-visuals.json and
references/content-preview/assets/optimized/manifest.json. Copied derivatives
are byte-for-byte originals from that manifest. All images remain AI concepts,
not factual product screenshots or documentary event photographs.

Scope/files, executed commands, historical failures and final acceptance are
recorded in PHASE-03-CLOSURE.md. No production-readiness or WCAG certification claim.
