# Phase 02 foundation and local runbook

Current remediation and acceptance evidence are in `PHASE-02-CLOSURE.md`.
The historical PARTIAL findings in `PHASE-02-REVIEW.md` are superseded by that
report. Password policy now covers reset/create/update; test commands provision
their own disposable databases and never require an empty development database.

Scope: Next App Router + Payload/PostgreSQL, strict TypeScript, Tailwind plumbing,
restricted admin authentication, ID/EN route samples, repeatable commands and CI.
No content collections, production design, installer delivery or commercial features.

## Sources reviewed before changes

`AGENTS.md`, `README.md`, all numbered documentation 01–10,
`DECISIONS-AND-OPEN-QUESTIONS.md`, `prompts/02-PHASE-02.md`,
`prompts/90-PHASE-EVALUATION.md`, `.gitignore`, file inventory and Git state.
Existing implementation is an isolated HTML preview, retained unchanged.
The repository initially has no commits and all supplied files are untracked.

## Compatibility decision — 26 October 2026

Official npm registry queries returned Payload 3.92.0 and Next 16.4.3.
`@payloadcms/next@3.92.0` requires matching Payload 3.92.0, GraphQL ^16.8.1,
Next >=16.3.3 <17 (or specified patched 15.x ranges), Node ^22.23.4 || >=24.22.1.
`@payloadcms/ui@3.92.0` supports React/React DOM ^19.2.1.
Selected exact versions: Payload packages 3.92.0, Next 16.4.3,
React/React DOM 19.2.6, GraphQL 16.8.1, Node 24.22.1, pnpm 10.34.9.
React 19.3.1 was the registry latest but is outside the verified peer range.
TypeScript 5.7.3 and React types follow the official stable blank template;
Tailwind/PostCSS 4.3.3 and the remaining exact pins were verified in registry metadata.

Sources:
- https://payloadcms.com/docs/getting-started/installation
- https://github.com/payloadcms/payload/blob/v3.92.0/packages/next/package.json
- https://github.com/payloadcms/payload/blob/v3.92.0/packages/ui/package.json
- https://github.com/payloadcms/payload/blob/v3.90.2/templates/blank/package.json
- https://github.com/payloadcms/payload/blob/v3.92.0/packages/payload/src/auth/operations/registerFirstUser.ts
- https://registry.npmjs.org/@payloadcms%2fnext/3.92.0
- https://registry.npmjs.org/next/16.4.3

The system Node 24.19.0 is too old. A compatible runtime is downloaded into ignored
`.tools/` for this session without modifying the system install. Normal contributors
should install the Node version in `.node-version` and pnpm from `packageManager`.
The remediation uses ESLint 10.13.0, @eslint/js 10.0.1, typescript-eslint 8.72.0,
@next/eslint-plugin-next 16.4.3, eslint-plugin-react-hooks 7.1.1 and
@eslint-react/eslint-plugin 5.28.8. Their registry peers permit the selected ESLint,
TypeScript and Node versions. The legacy Next lint-config bundle was replaced
because its old React/import/accessibility plugin peers exclude ESLint 10. Official
Next rules, TypeScript rules, React rules and hook rules remain enabled; narrow
keyboard behavior is also browser-tested. This is not a complete accessibility audit.
DOMPurify is overridden to verified patched 3.4.17 after the initial audit found
high/critical advisories through Monaco. The scoped override
`@esbuild-kit/core-utils>esbuild: 0.25.12` closes the remaining migration-tool
advisory. Fresh/rollback/reapply migrations test compatibility. The final audit
reports no known vulnerabilities. The upstream deprecated esbuild-kit packages
remain indirect adapter dependencies; no vulnerability suppression was added.

`patches/@payloadcms__db-postgres@3.92.0.patch` returns the initial adapter
health-check client to the pool and closes the pool on destroy. pnpm records the
patch hash in its lockfile. The database suite verifies release and shutdown; no
forced-success process exit is used. Reassess/remove this patch on any adapter upgrade.

## Local start (PowerShell)

1. Install Node 24.22.1 and pnpm 10.34.9; start Docker Desktop.
2. `Copy-Item .env.example .env`; replace both CHANGE_ME values. Use a unique DB
   password and random PAYLOAD_SECRET of at least 32 characters. Never commit `.env`.
3. `pnpm install --frozen-lockfile`
4. `docker compose up -d --wait`
5. `pnpm db:migrate`
6. Temporarily set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD (16+ characters)
   in the operator environment or ignored `.env`, then `pnpm admin:create`.
   Remove those variables afterward. Bootstrap refuses a nonempty users collection.
7. `pnpm dev`; open http://localhost:3000/admin/login, /id and /en.

For this session's ignored local tools only, prefix the shell PATH with
`$env:PATH = "$PWD/.tools/node_modules/node/bin;$PWD/.tools/node_modules/.bin;$env:PATH"`.
The portable pnpm entrypoint is `node .tools/node_modules/pnpm/bin/pnpm.cjs`.

`docker compose stop` retains data. Do not remove the database volume unless its
contents are explicitly disposable. Port 5432 is bound only to loopback. The local
Postgres owner account is for development; provision a least-privilege runtime DB
role and separate migration role before production.

## Schema and migrations

Payload's own Postgres adapter manages schema; no extra ORM. `push: false` prevents
implicit development schema changes. Apply committed migrations with `pnpm db:migrate`.
After intentional schema edits: `pnpm db:migrate:create`, inspect SQL and rollback,
run migrate against a disposable DB, then `pnpm generate:types` and
`pnpm generate:importmap`. Commit migration, generated types and lockfile together.
Back up real data before migrations; use `pnpm db:status` to inspect state.

## Authentication boundary

Only active super admins exist in this phase; granular editorial roles are Phase 04.
Anonymous users cannot list/create/update/delete/unlock users. No customer auth.
The first-register operation overrides access internally, so a beforeChange hook
also rejects creation unless an active admin or trusted Local API bootstrap context
is present. Never pass request-supplied context to privileged Local API calls.
Local API defaults bypass access: application code must explicitly use
`overrideAccess: false` and an authenticated actor for user-initiated operations.

Passwords use Payload's hashing. Create/update/reset require at least 16 characters.
One validation helper is called by ordinary write hooks and the reset beforeOperation
hook, because Payload's reset operation bypasses beforeChange. Sessions
expire after one hour; five failed attempts lock for 15 minutes. Inactive users are
denied login and all collection/admin access. SameSite Lax, same-origin CSRF/CORS
allowlist, and secure cookies for HTTPS apply. No API keys or GraphQL surface.
Email reset delivery is not configured: local operator recovery only until a
verified email provider and recovery process are implemented. MFA, durable audit
events, edge/global rate limiting and a production CSP are later hardening work.
An explicit disabled email adapter prevents the default console transport from
logging reset-token emails. The empty-database admin screen explains operator
setup instead of offering a public signup form; the API hook is the security boundary.

## Verification contract

`pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`,
`pnpm test:database`, `pnpm test:integration`, `pnpm build`, `pnpm test:e2e`,
`pnpm audit --audit-level low`.

Every database/integration/browser command uses `scripts/run-tests.ts`. The runner
connects to local DATABASE_URL (or explicit TEST_DATABASE_URL for a dedicated test
cluster), creates a cryptographically random `galung_test_<group>_<hex>` database,
applies migrations, passes its exact name to child tests and drops only that newly
created database in finally. The test role needs CREATEDB. Direct test execution
against an ordinary development/production name is rejected. Development accounts
do not cause tests to skip or fail; bootstrap tests always run in their fresh DB.
Do not interrupt the runner forcibly; inspect leftover galung_test databases after
an external process kill rather than dropping databases blindly.

E2E uses a fresh server on a temporary loopback port, never an existing server.
Run `pnpm build` first, then `pnpm test:e2e`. Chromium is installed once with
`pnpm exec playwright install chromium`. HTTP tests include short-password reset,
access/CSRF/session checks and desktop/320px keyboard locale navigation. Subprocess
tests require exact numeric exit codes and reasons, and reject timeouts/signals.

The database suite tests migration UP/DOWN/reapply, clean adapter shutdown and a
real pg_dump/psql restore with fixture data. Local tooling runs inside the Compose
Postgres service. Set TEST_POSTGRES_CONTAINER to the matching Docker container ID
for a dedicated test cluster; CI supplies its own service container ID. Backup data
exists only in memory and disposable databases. This is a local rehearsal, not a
production backup schedule or recovery-time guarantee. CI does not deploy.

Draft/publish/download permission tests are deferred because those modules do not
exist yet. AT-01–12 are product acceptance targets, not claims about this scaffold.

## UI, locale and indexing boundary

Root redirects deterministically to /id. Only /id and /en route samples exist;
unknown locale returns 404. Copy is explicitly unreviewed sample copy, with no
fallback translation. CMS localization uses shared record structure, default id,
and fallback disabled. No approved public content or assets are published.
The simple shell uses system fonts until Phase 03 integrates approved Poppins and
Nunito Sans. No visual parity or WCAG certification is claimed. All responses are
noindex in this foundation; the unused SITE_INDEXABLE example setting was removed.
Canonical/hreflang/sitemap and selective production indexing belong to Phase 05.

Results, gate status, remaining risks and complete changed-file inventory are in
`PHASE-02-CLOSURE.md`; earlier reports are historical.

## Phase 03 test-runner update — 26 October 2026
Bootstrap regression subprocesses now use tests/helpers/run-process.ts with asynchronous spawn and the same 30-second deadline. The parent event loop stays available; timeout, signals, missing status and launch errors remain hard failures, and cleanup waits for child close. Phase 03 integration and timeout-helper unit checks passed; see PHASE-03-CLOSURE.md. Public/admin fonts and styling now come from the Phase 03 design system, superseding the earlier system-font sample description.
