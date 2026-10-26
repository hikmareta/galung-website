import assert from "node:assert/strict";
import type { ProcessResult } from "./run-process.ts";

export function assertProcessResult(
  result: ProcessResult,
  expected: number,
  message?: string,
): void {
  assert.equal(
    result.error,
    undefined,
    "Subprocess must start and finish without timeout",
  );
  assert.equal(
    result.signal,
    null,
    "Subprocess must not be terminated by a signal",
  );
  assert.equal(
    typeof result.status,
    "number",
    "Subprocess must have a numeric exit code",
  );
  assert.equal(result.status, expected, result.stderr);
  if (message)
    assert.ok(
      `${result.stdout}\n${result.stderr}`.includes(message),
      "Expected explicit subprocess outcome",
    );
}
