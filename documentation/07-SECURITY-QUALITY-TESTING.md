# 07 — Security, Quality and Test Strategy

## Required security controls
Auth: strong credentials, hashed password via CMS, MFA strategy/compatibility assessment, lockouts/rate limits, secure cookies/session, least privilege and server-enforced RBAC. Keep public draft APIs closed.

Inputs: validate HTML/rich text, contact form, storage filename/type/size, file upload headers; sanitize output as appropriate. Anti-spam for contact form and retention plan for submitted personal data.

Files: signed direct upload for admins, storage key isolation, checksum verification, no unverified releases, no executable uploads into web server filesystem; user download must be direct CDN/object storage. Avoid trusting frontend MIME and client-calculated hashes alone.

Operations: secrets in env, dependency monitoring, request/event logging without leaking credentials, DB least-privileged accounts, automatic backups and periodic restore drill, HTTPS, DNS hygiene, staging noindex, production rollback plan.

## Performance and accessibility targets
Core Web Vitals evaluation: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at p75 of real-world eligible measurements when data available. WCAG 2.2 AA target; measure via automated audits plus manual keyboard/screen-reader evaluation. Responsive across narrow mobile and desktop.

## Test matrix
| Scope | Test cases |
|---|---|
| Unit | Validation helpers; locale paths; block rendering guards; release selectors |
| Integration | CMS RBAC; drafts/publish; localized fields; file verification; delete constraints |
| E2E | ID/EN navigation, responsive menu, news/project detail, draft preview, editor section reorder, anonymous download, unauthorized edit denied |
| Security | Auth required for admin; role escalation denied; no draft leak; upload abuse & oversized payload guarded |
| Performance | Lighthouse baseline, real asset sizes, image optimization, cache correctness |
| Operational | Fresh deployment + migration, backup restore, storage outages, rollback |

## Definition of done checklist
Acceptance criteria met; changes documented; tests actually run; no known critical vulnerabilities; nonfunctional checks reviewed; manual happy/error paths exercised. If a check cannot run, describe exact blocker and remaining risk instead of marking passed.
