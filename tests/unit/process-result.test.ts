import { test } from "node:test";
import assert from "node:assert/strict";
import type { SpawnSyncReturns } from "node:child_process";
import { assertProcessResult } from "../helpers/process-result.ts";

function result(
  overrides: Partial<SpawnSyncReturns<string>> = {},
): SpawnSyncReturns<string> {
  return {
    pid: 1,
    output: ["", "", ""],
    stdout: "",
    stderr: "expected refusal",
    status: 1,
    signal: null,
    ...overrides,
  };
}
test("expected rejection requires its exit code and reason", () => {
  assertProcessResult(result(), 1, "expected refusal");
  assert.throws(() => assertProcessResult(result({ status: 0 }), 1));
  assert.throws(() => assertProcessResult(result(), 1, "different error"));
});
test("timeout, signal, launch failure and missing status cannot pass rejection checks", () => {
  for (const value of [
    result({
      status: null,
      error: Object.assign(new Error("timeout"), { code: "ETIMEDOUT" }),
    }),
    result({ signal: "SIGTERM", status: null }),
    result({ status: null }),
    result({ error: new Error("launch failed") }),
  ]) {
    assert.throws(() => assertProcessResult(value, 1));
  }
});
