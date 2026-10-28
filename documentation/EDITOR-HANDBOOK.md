# Galung editor handbook

28 October 2026. Training instructions for the implemented CMS; deployment and
staff accounts are not yet handed over. The owner must name editor, publisher,
Super Admin and operations contacts before launch. No customer accounts exist.

## Sign in and responsibilities

Use the approved site's /admin address supplied by operations, your own account
and any required MFA gateway. Never share passwords. Editors prepare content;
publishers approve/publicize it; Super Admin manages staff, sensitive identity
fields and software releases. Request account recovery from the named operator:
CMS reset-mail transport is currently disabled, so email reset is not a verified
recovery path. Operations must rehearse recovery before handover.

## Change a page safely

1. Open Pages and select the correct page key (home, about, software, download,
   contact, etc.). Select Indonesian or English before editing localized text,
   links and SEO. Never present an unreviewed sample as an approved translation.
2. Save a draft. Both locales share section composition, visibility and order;
   text and media values may differ. Up/down controls work with keyboard Enter.
   Moving a block affects both languages; review both before publication.
3. Open the authenticated preview for each language. Public visitors still see
   the last publication. Review long text, mobile layout, headings, keyboard focus,
   link destinations and image descriptions. Preview URLs are private.
4. Ask the publisher to review both locale values, media and title/description.
   Mark both locale review flags only after actual review, then publish. Missing
   translations or unapproved media may block publication; correct the problem
   rather than bypassing it. Scheduled dates do not automatically publish.
5. Check the public URL signed out in both languages. Check language switching
   preserves the equivalent article/project, and the new version appears after
   publication. If stale, report page URL/time to operations; do not republish
   repeatedly. Missing/unpublished content may correctly return 404.

For a document lock, coordinate with its current editor before taking over.
Restore a prior content version as a draft, review both locales and republish;
verify the public result. Software release retirement/recovery is a separate
workflow, never a generic page-version rollback.

## Media, navigation and legal content

Upload only owned/licensed JPEG, PNG or WebP images up to 8 MiB. Add attribution
and accurate reviewed alt descriptions in both languages; publisher approval makes
the media publicly readable even before a page uses it. The design-reference
photographs and sample claims are not automatically licensed/approved assets.

Replace an image by uploading a new media item and changing the page reference.
Existing files are immutable. Used images, including references in retained
history, cannot be deleted or unapproved. Do not delete history to bypass this.
Preview image position/grid controls at mobile and desktop widths before publish.

Header/footer links use shared structure with localized labels. Verify each
locale's target; news/portfolio detail slugs can differ between languages.
Only Super Admin should enter approved company/legal facts. Empty/TBD fields
must not become invented legal statements. Near-form privacy notices approved
earlier do not constitute approval of a complete legal policy.

## Publish or retire software

Super Admin saves a draft release, supplies version/channel and reviewed ID/EN
notes, and uploads the actual Windows/macOS builds using the release upload
controls. Architecture and SHA-256 must come from the trusted release owner.
Files upload directly to storage; never attach an installer to Media.

Keep the page open during upload. Retry preserves a busy/uncertain session;
do not create duplicate uploads while completion is unresolved. A browser reload
does not preserve progress. Operations runs independent verification. Uploaded
does not mean verified, signed or safe to publish.

After trusted-build/signing/installation approval, select verified candidates if
needed, review both locales, set active and publish. Both operating systems are
required. A publication snapshots exact approved files; later uploads do not
silently replace them. Check both public locale pages signed out and confirm
OS, architecture, notes and checksum.

Retire a release by publishing lifecycle=retired; saving retirement as a draft
does not remove public access. Records/files remain for audit. Previously issued
signed links can remain valid for 60 seconds. Report urgent revocation or invalid
installer issues to operations and the release owner immediately.

## Contact and support

The Contact form remains disabled until operations verifies the registered
mailbox, approved pages, real delivery and healthy deletion worker. Do not promise
message delivery while disabled. Website copies have approved 30-day retention;
mailbox/backup retention and final policy need operational approval. Do not export
visitor data into shared spreadsheets, screenshots or support messages.

Report incidents with page URL, locale, time, intended action and a redacted
screenshot if useful. Exclude passwords, reset links, signed installer URLs and
visitor messages. Access/security issues go to the named operator; translation,
legal and asset approval go to the owner. Contact names remain TBD.

## Handover exercise — pending

Each named staff member must demonstrate own-account sign-in/recovery, ID/EN draft
and private preview, keyboard reorder, licensed media replacement, both-locale
review/publish and signed-out verification. Publisher additionally restores a
version safely; Super Admin/release owner rehearses verified upload/retirement;
operations demonstrates stale-cache recovery and incident escalation. Record
participant/date/evidence and unresolved issues in the Phase 08 evaluation.
