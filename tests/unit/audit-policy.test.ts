import { test } from "node:test";
import assert from "node:assert/strict";
import { assessAudit, verifyPatch } from "../../scripts/audit-policy.ts";
test("audit policy accepts only the exact patched advisory and fails closed", () => {
  verifyPatch();
  const item = {
    module_name: "deepmerge",
    github_advisory_id: "GHSA-gcqx-w48m-w2h4",
    severity: "low",
    findings: [{ version: "4.3.1", paths: [".>payload>deepmerge"] }],
  };
  const report = {
    advisories: { fixture: item },
    metadata: { vulnerabilities: { low: 1 } },
  };
  assert.equal(assessAudit(report, 1), 1);
  for (const patch of [
    { github_advisory_id: "unknown" },
    { severity: "high" },
    { module_name: "other" },
    { findings: [{ version: "4.3.0", paths: [".>payload>deepmerge"] }] },
  ])
    assert.throws(() =>
      assessAudit(
        { ...report, advisories: { fixture: { ...item, ...patch } } },
        1,
      ),
    );
  assert.throws(() =>
    assessAudit({ ...report, error: "registry unavailable" }, 1),
  );
  assert.throws(() => assessAudit(report, null));
  assert.throws(() =>
    assessAudit({ ...report, metadata: { vulnerabilities: { high: 2 } } }, 1),
  );
});
