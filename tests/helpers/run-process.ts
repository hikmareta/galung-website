import { spawn } from "node:child_process";
import type { SpawnOptions } from "node:child_process";

export type ProcessResult = {
  status: number | null;
  signal: NodeJS.Signals | null;
  stdout: string;
  stderr: string;
  error?: Error;
};

// Keep the parent event loop available to loaders, DB clients and cleanup hooks.
// Resolve only after close so no timed-out child can outlive database cleanup.
export function runProcess(
  command: string,
  args: string[],
  options: SpawnOptions & { timeout: number },
): Promise<ProcessResult> {
  return new Promise((resolve) => {
    const { timeout, ...spawnOptions } = options;
    const child = spawn(command, args, {
      ...spawnOptions,
      stdio: ["ignore", "pipe", "pipe"],
    });
    const result: ProcessResult = {
      status: null,
      signal: null,
      stdout: "",
      stderr: "",
    };
    child.stdout?.setEncoding("utf8").on("data", (chunk: string) => {
      result.stdout += chunk;
    });
    child.stderr?.setEncoding("utf8").on("data", (chunk: string) => {
      result.stderr += chunk;
    });
    child.on("error", (error) => {
      result.error = error;
    });
    const timer = setTimeout(() => {
      result.error = Object.assign(new Error("Subprocess timed out"), {
        code: "ETIMEDOUT",
      });
      child.kill("SIGKILL");
    }, timeout);
    child.on("close", (status, signal) => {
      clearTimeout(timer);
      result.status = status;
      result.signal = signal;
      resolve(result);
    });
  });
}
