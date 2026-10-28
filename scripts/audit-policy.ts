import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

type Advisory = {
  module_name: string;
  github_advisory_id: string;
  severity: string;
  findings: { version: string; paths: string[] }[];
};
export function assessAudit(
  report: {
    advisories?: Record<string, Advisory>;
    error?: unknown;
    metadata?: { vulnerabilities?: Record<string, number> };
  },
  exit: number | null,
) {
  assert.ok(
    !report.error && report.advisories && report.metadata?.vulnerabilities,
    "Invalid or unavailable registry audit",
  );
  const advisories = Object.values(report.advisories);
  assert.ok(
    exit === (advisories.length ? 1 : 0),
    "Unexpected audit exit status",
  );
  const count = Object.values(report.metadata.vulnerabilities).reduce(
    (a, b) => a + b,
    0,
  );
  assert.equal(count, advisories.length, "Unrecognized audit counts");
  for (const item of advisories) {
    assert.equal(
      item.github_advisory_id,
      "GHSA-gcqx-w48m-w2h4",
      "Unmitigated advisory",
    );
    assert.equal(item.module_name, "deepmerge");
    assert.equal(item.severity, "low");
    assert.ok(item.findings.length > 0);
    for (const finding of item.findings) {
      assert.equal(finding.version, "4.3.1");
      assert.ok(
        finding.paths.length &&
          finding.paths.every((p) => p.endsWith(">deepmerge")),
      );
    }
  }
  return advisories.length;
}
function fingerprint(file: string) {
  return createHash("sha256")
    .update(readFileSync(file, "utf8").replace(/\r\n/g, "\n"))
    .digest("hex");
}
export function verifyPatch() {
  const require = createRequire(import.meta.url);
  const payloadRequire = createRequire(require.resolve("payload"));
  const root = path.dirname(payloadRequire.resolve("deepmerge/package.json"));
  assert.equal(
    JSON.parse(readFileSync(path.join(root, "package.json"), "utf8")).version,
    "4.3.1",
  );
  const expected: Record<string, string> = {
    "index.js":
      "3cb847d7fba089bcd81d988ff02782a9be8a55218485fc23317797c58f8765a1",
    "dist/cjs.js":
      "a2ee5c2b59b3cd864778d4c5a483a265c0b115a715559f75ce243e4f03e31a79",
    "dist/umd.js":
      "e6bc0824d988fa25b97d41fb1f20e33637e3d730eb65a64abe929aa112636136",
  };
  for (const [file, hash] of Object.entries(expected))
    assert.equal(
      fingerprint(path.join(root, file)),
      hash,
      `Patch missing or drifted: ${file}`,
    );
  assert.equal(
    fingerprint("patches/deepmerge@4.3.1.patch"),
    "ba77954a3f622d003bcb3a70e7254c71b90886c3c380c6d9ce40b0fc03625099",
  );
  assert.equal(
    JSON.parse(readFileSync("package.json", "utf8")).pnpm.patchedDependencies[
      "deepmerge@4.3.1"
    ],
    "patches/deepmerge@4.3.1.patch",
  );
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  verifyPatch();
  const regression = spawnSync(
    process.execPath,
    [
      "--experimental-strip-types",
      "--test",
      "tests/unit/deepmerge-security.test.ts",
    ],
    { stdio: "inherit" },
  );
  assert.equal(regression.status, 0, "Security regression failed");
  const pnpm = process.env.npm_execpath;
  assert.ok(
    pnpm && /pnpm\.(c?js)$/.test(pnpm),
    "Run through pnpm audit:policy",
  );
  const raw = spawnSync(
    process.execPath,
    [pnpm, "audit", "--audit-level", "low", "--json"],
    { encoding: "utf8", timeout: 120000 },
  );
  mkdirSync(".tools", { recursive: true });
  writeFileSync(".tools/dependency-audit.json", raw.stdout || "");
  console.log(
    `Raw registry audit exit: ${raw.status}; report: .tools/dependency-audit.json`,
  );
  assert.ok(!raw.error, "Registry audit failed to execute");
  const mitigated = assessAudit(JSON.parse(raw.stdout), raw.status);
  console.log(
    `PASS: ${mitigated} locally mitigated advisory; 0 unmitigated. Raw registry audit is ${mitigated ? "NOT clean" : "clean"}.`,
  );
}
