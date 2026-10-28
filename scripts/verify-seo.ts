import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { spawn } from "node:child_process";
if (existsSync(".env")) loadEnvFile(".env");
const normalEnvironment = { ...process.env };
async function run(args: string[], env: NodeJS.ProcessEnv) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, args, { env, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code, signal) =>
      code === 0 && !signal
        ? resolve()
        : reject(new Error(`SEO check failed: exit ${code}, signal ${signal}`)),
    );
  });
}
const build = ["node_modules/next/dist/bin/next", "build", "--webpack"];
try {
  const indexed = {
    ...normalEnvironment,
    PUBLIC_INDEXING: "true",
    CONTACT_ENABLED: "false",
  };
  await run(build, indexed);
  await run(
    [
      "--import",
      "tsx",
      "scripts/run-tests.ts",
      "e2e",
      "--config=tests/seo/playwright.config.ts",
    ],
    indexed,
  );
} finally {
  // Header policy is built by Next. Always restore the original build, even after a failed test.
  await run(build, normalEnvironment);
}
