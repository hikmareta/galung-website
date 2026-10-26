# Phase 02 security boundary and later release gates

26 October 2026. This assessment closes the foundation review's ambiguity about
what is local baseline versus a production obligation. It does not claim complete
security compliance or authorize public deployment.

## Implemented and verified local baseline

- The app's dev/start commands bind to loopback; PostgreSQL is loopback-bound.
- Only active CMS Super Admins exist; anonymous signup/first-register is denied.
- User read/create/update/delete/unlock are server-restricted; HTTP denials tested.
- A shared 16-character password rule covers create/update/reset, including valid
  token rejection for short passwords. Expired/replayed tokens and inactive users
  are tested. Password hashing remains Payload's responsibility.
- One-hour sessions, five-failure/15-minute lockout, HttpOnly/SameSite cookies,
  origin allowlists, cross-origin mutation rejection and inactive-session denial
  are tested at their implemented boundaries. Actual HTTPS cookies remain a
  production/staging check; localhost correctly uses non-Secure cookies.
- No email reset transport is configured. A disabled adapter prevents reset-token
  email logging; no real contact destination or legal identity is invented.
- Privileged routes are configured private/no-store and all routes noindex.
- All test databases are disposable; no real user must be deleted to run tests.
- Dependency audit is part of CI and currently has no known findings. This is
  point-in-time evidence, not a guarantee about undisclosed vulnerabilities.

## MFA / recovery compatibility assessment

The installed Payload auth contract exposes custom AuthStrategy, collection auth
strategies and auth-operation hooks. Integrating stronger authentication must
preserve Payload's server-side user/access/session checks. Adding a form-only OTP
check would leave API login/reset paths uncovered and is not an acceptable design.

Before any public admin exposure, choose and test a maintained MFA/passkey or
identity-provider integration across all auth paths, with recovery/revocation and
existing-session behavior. Provider choice, operator enrollment and production
email identity are TBD; hosting and admin assignments are also undecided. Do not
implement an unreviewed home-grown MFA scheme in the foundation phase. The current
local credential flow is not approved as production MFA protection.

## Ownership and mandatory future gates

| Control | Owner / gate | Required evidence before public exposure |
|---|---|---|
| Granular editorial RBAC, draft isolation and durable user/content audit | Engineering, Phase 04 | API permission/lifecycle tests and durable audit inspection |
| MFA, verified reset-email delivery and operator recovery | Engineering/security, Phase 07 | All auth paths covered, enrollment/recovery/revocation tests |
| Global/distributed rate limiting and monitored abuse controls | Engineering/operations, Phase 07 | Auth/API request limits work across deployed instances; no reliance on per-user lockout alone |
| Production CSP and actual HTTPS-cookie behavior | Engineering/security, Phase 07 | Admin/editor integration remains functional; hostile-origin and transport checks |
| Separate DB runtime/migration roles and private connectivity | Operations, Phase 08 | Least-privilege runtime denies schema/role management; migrations use separate operator credentials |
| Automated production backups, retention, restore objectives and monitoring | Operations, Phase 07/08 | Production-specific restore drill and schedule; local pg_dump fixture rehearsal is only foundation evidence |
| Hosting/TLS/secret management and rollback | Operations, Phase 08 | Approved provider, isolated staging/prod and deployment smoke tests |

R06 from the review is retained here as mandatory future release criteria, not
silently marked implemented or used to expand Phase 02 into production work.
No production deployment is part of this task.
