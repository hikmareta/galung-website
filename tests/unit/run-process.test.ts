import { test } from "node:test";
import assert from "node:assert/strict";
import { runProcess } from "../helpers/run-process.ts";
import { assertProcessResult } from "../helpers/process-result.ts";

test("async subprocess preserves parent progress, output and exact exit status", async () => {
  let parentProgress = false;
  const timer = setTimeout(() => {
    parentProgress = true;
  }, 10);
  const result = await runProcess(
    process.execPath,
    [
      "-e",
      "setTimeout(()=>{console.error('explicit refusal');process.exitCode=1},100)",
    ],
    { timeout: 5000 },
  );
  clearTimeout(timer);
  assert.equal(parentProgress, true);
  assertProcessResult(result, 1, "explicit refusal");
});

test("async subprocess timeout and launch failure never count as expected refusal", async () => {
  const timedOut = await runProcess(
    process.execPath,
    ["-e", "setInterval(()=>{},1000)"],
    { timeout: 100 },
  );
  assert.equal((timedOut.error as NodeJS.ErrnoException).code, "ETIMEDOUT");
  assert.throws(() => assertProcessResult(timedOut, 1));
  const missing = await runProcess("galung-nonexistent-process-test", [], {
    timeout: 5000,
  });
  assert.ok(missing.error);
  assert.throws(() => assertProcessResult(missing, 1));
});
