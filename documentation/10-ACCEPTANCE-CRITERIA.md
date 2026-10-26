# 10 — End-to-end Acceptance Matrix

| ID | Given | When | Then |
|---|---|---|---|
| AT-01 | Anonymous visitor | Visits `/id` and `/en` | Correct language chrome, navigation and published homepage appear |
| AT-02 | Editor with access | Changes hero copy in Indonesian draft | English public page remains unaffected and public Indonesian page unchanged before publish |
| AT-03 | Editor | Moves homepage feature block above showcase and publishes | Public homepage reflects new approved order for both locales |
| AT-04 | Visitor | Opens news/project unpublished slug | No draft content is leaked |
| AT-05 | Anonymous visitor | Downloads current Windows installer | Works without account and bytes come from storage/CDN, not app runtime |
| AT-06 | Anonymous visitor | Downloads macOS installer | Correct OS/architecture approved file and checksum displayed |
| AT-07 | Unauthorized editor | Tries to activate unverified release | Request denied server-side, no public exposure |
| AT-08 | Super Admin | Edits company legal fields | Saved securely with audit trail; empty/unapproved fields not publicly invented |
| AT-09 | Admin | Uploads bad/mismatched checksum installer | File cannot enter active download set |
| AT-10 | Visitor | Submits invalid contact form | Clear accessible error; data rejected; rate limiting enforced |
| AT-11 | Search engine | Crawls public site | Canonical/hreflang/sitemap correct; drafts/admin excluded |
| AT-12 | Mobile keyboard user | Navigates public header and admin section ordering | All actions operable with visible focus and meaningful labels |

## Gate
Each acceptance test should map to automated test and/or documented manual verification, identify test environment, observed result and unresolved defects.
