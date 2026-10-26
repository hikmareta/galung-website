# 08 — Phased Roadmap & Gates

## Operating model
Implement one phase at a time. Before each phase read AGENTS.md and relevant requirements; after each phase use `prompts/90-PHASE-EVALUATION.md`. All gates require a deliverable, verified tests and a written phase report.

| Phase | Objective | Deliverables / gate |
|---|---|---|
| 01 | Requirements & design audit | Confirm sitemap, user flows, asset audit, interface inventory, open questions; no fake legal/company copy |
| 02 | Repo and foundation | Compatible Next/Payload scaffold, pnpm lockfile, Postgres local, env example, admin login, baseline checks green |
| 03 | Design system | Tokens, typography, layout shell, responsive header/footer and component primitives consistent with screenshot |
| 04 | CMS foundation | Collections/globals, block registry, RBAC, media, localization, versioning/draft preview and revalidation |
| 05 | Public website | ID/EN Home, About, Software, Features, Portfolio, News, Contact, Legal pages with CMS content |
| 06 | Download center | Direct storage uploads, release verification/retire, Windows/macOS public download and notes |
| 07 | QA & hardening | E2E RBAC/download/i18n tests, a11y/SEO/performance/security audit, backup restore rehearsal |
| 08 | Deployment & handover | Hosting choice with commercial terms, domain/DNS/TLS, prod secrets, CI/CD, monitoring and admin guide |

## Avoid premature commercial blockers

Phase 02 implementation and its measured gate status are recorded in
`PHASE-02-EVALUATION.md`; setup/migration procedures are in `PHASE-02-FOUNDATION.md`.
The phase report does not authorize automatically beginning Phase 03.
The historical PARTIAL review is superseded by `PHASE-02-CLOSURE.md`, which records
the remediations and current acceptance evidence. Phase 03 is not started automatically.
Continue website MVP work using placeholders for TBD business data; do not implement payment, subscriptions, account portal or license logic. Production public legal copy and hosting terms must be approved before launch, not block unrelated development.

## Decision gates
- End phase 01: content requirements and visual interpretation signed off.
- End phase 02: repeatable local start; migrations/test automation documented.
- End phase 04: real admin can change a homepage text/image and block order in both locales without code edits.
- End phase 06: release upload verified, download anonymous, app server never streams installer bytes.
- End phase 08: deployment smoke tests, rollback, access control and backups checked.
