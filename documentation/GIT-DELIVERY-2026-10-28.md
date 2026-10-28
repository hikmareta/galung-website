# Git delivery and previous CI diagnosis — 28 October 2026

User explicitly authorized committing and pushing all new phases to the existing
GitHub repository. Scope: existing Phase 05 public pages/Contact, Phase 06 downloads
and remediation, Phase 07 QA/hardening, Phase 08 deployment preparation and their
tests, migrations, lockfile, documentation and synthetic screenshot evidence.
No deployment, provider purchase or live Contact activation is authorized by push.

Reviewed AGENTS.md, README, roadmap, decision register, current Phase 08 evaluation,
prior Phase 02/04/05/06 closure Git/testing evidence, current diff/file inventory,
workflow, environment example, SMTP fixture/helper, Git history and remote.
Target is the existing `master` branch at
https://github.com/hikmareta/galung-website.git. No history rewrite or force push.

## Diagnosis

- Before delivery, local and remote master both pointed to
  `890bf02c60da36b2da82d58ac62a3575a43b1ddb` (Phase 03/04). Newer Phase 05–08 work
  was still uncommitted. No historical failed push was found in available session
  command outputs; this is not proof no failure occurred elsewhere.
- A restricted `git ls-remote` reproduced `getaddrinfo() thread failed to start`.
  The same command with permitted network access succeeded without changing
  credentials. This observed connection failure is an execution restriction,
  not evidence of invalid GitHub credentials or remote branch rejection.
- [GitHub Actions run 40344916595](https://github.com/hikmareta/galung-website/actions/runs/40344916595)
  exists on that exact remote commit: the push reached GitHub, then its CI failed.
  Public run/job metadata reports `pnpm test:e2e` failure; install, format, lint,
  generation, typecheck, unit/database/integration/audit/build steps succeeded.
- Downloading job 121649174792 logs returned HTTP 403, "Must have admin rights to
  Repository." Public annotations only identify exit code 1, a Node 20 action
  runtime deprecation warning and an ubuntu-latest migration notice. Those warnings
  are not established causes of the failed browser test. The exact failed test
  and assertion remain unverified; do not claim a root-cause fix from this data.

## Checks and exclusions

- Current local format, lint, strict types and 30 unit tests: PASS, exit 0.
- Phase 08's preceding same-workspace evidence includes build, full integration,
  eight-migration rollback/reapply/restore, dependency policy and seven focused
  browser cases passing. Full 37-case E2E and indexed SEO were not rerun by this
  Git delivery task. Hosted results for the new commit require a new CI run.
- Candidate inventory before adding this report: 167 changed/new files, 14.06 MiB.
  Targeted token/private-key and size checks found no unexpected candidates;
  this is a bounded scan, not a comprehensive secret-security certification.
- `.env`, `.tools`, dependencies, builds, working media and test-results are
  ignored. Actual credentials and installer binaries are not delivery candidates.
  `.env.example` contains documented placeholders/blank secret fields. The SMTP
  localhost key/certificate are intentionally public synthetic test fixtures used
  only by the non-relaying local test sink; they are not production credentials.
- Final staged inventory/diff and remote SHA are checked during delivery. Commit
  and push success are reported only after Git returns success and remote refs
  match the local commit. Phase 08 remains PARTIAL with its documented launch gates.
- Staging revealed whitespace diagnostics previously unseen by unstaged diff:
  the deepmerge patch preserves upstream context whitespace, and two generated
  Phase 06 migrations contain SQL indentation/blank-line whitespace. Full staged
  `git diff --cached --check` returns 2 for those three files. Preserve the exact
  hashed dependency patch and already-rehearsed migration text; check all other
  staged paths normally and those three with only the two relevant whitespace
  diagnostics disabled for that invocation. No permanent Git policy is changed.

Next investigation if the new hosted browser job fails: an authorized repository
administrator can inspect the precise test failure. The current workflow now
uploads browser test evidence on failure. No speculative dependency/runner change
was made merely to hide the old red status.
