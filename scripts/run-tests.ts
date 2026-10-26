import { Client } from "pg";
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { loadEnvFile } from "node:process";
import { existsSync } from "node:fs";
import assert from "node:assert/strict";

if (existsSync(".env")) loadEnvFile(".env");
const kind = process.argv[2];
if (!["integration", "e2e", "database"].includes(kind))
  throw new Error("Unknown test group");
const base = new URL(
  process.env.TEST_DATABASE_URL || process.env.DATABASE_URL || "",
);
if (
  !["localhost", "127.0.0.1", "[::1]"].includes(base.hostname) &&
  !process.env.TEST_DATABASE_URL
) {
  throw new Error(
    "Remote tests require an explicit TEST_DATABASE_URL to a disposable test cluster",
  );
}
const name = `galung_test_${kind}_${randomBytes(8).toString("hex")}`;
const adminURL = new URL(base);
adminURL.pathname = "/postgres";
const admin = new Client({ connectionString: adminURL.href });
await admin.connect();
let created = false;
const isolated = new URL(base);
isolated.pathname = `/${name}`;
const env = {
  ...process.env,
  DATABASE_URL: isolated.href,
  GALUNG_TEST_DATABASE: name,
  NEXT_TELEMETRY_DISABLED: "1",
};

async function run(args: string[]): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, args, { env, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code, signal) =>
      code === 0 && !signal
        ? resolve()
        : reject(
            new Error(`Test command failed: exit ${code}, signal ${signal}`),
          ),
    );
  });
}

async function postgresTool(args: string[], input?: string): Promise<string> {
  const prefix = process.env.TEST_POSTGRES_CONTAINER
    ? ["exec", "-i", process.env.TEST_POSTGRES_CONTAINER]
    : ["compose", "exec", "-T", "postgres"];
  return new Promise((resolve, reject) => {
    const child = spawn("docker", [...prefix, ...args], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    let output = "";
    let errors = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => {
      output += chunk;
    });
    child.stderr.setEncoding("utf8").on("data", (chunk) => {
      errors += chunk;
    });
    child.on("error", reject);
    child.on("exit", (code, signal) =>
      code === 0 && !signal
        ? resolve(output)
        : reject(
            new Error(`Postgres tool failed (${code}, ${signal}): ${errors}`),
          ),
    );
    child.stdin.end(input);
  });
}

async function backupRehearsal(): Promise<void> {
  const restoreName = `galung_test_database_${randomBytes(8).toString("hex")}`;
  const restoredURL = new URL(base);
  restoredURL.pathname = `/${restoreName}`;
  const source = new Client({ connectionString: isolated.href });
  await source.connect();
  try {
    await source.query("INSERT INTO payload_kv (key, data) VALUES ($1, $2)", [
      "phase02-backup",
      JSON.stringify({ restored: true }),
    ]);
  } finally {
    await source.end();
  }
  const dump = await postgresTool([
    "pg_dump",
    "-U",
    decodeURIComponent(base.username),
    "-d",
    name,
    "--no-owner",
    "--no-acl",
  ]);
  await admin.query(`CREATE DATABASE "${restoreName}"`);
  try {
    await postgresTool(
      [
        "psql",
        "-v",
        "ON_ERROR_STOP=1",
        "-U",
        decodeURIComponent(base.username),
        "-d",
        restoreName,
      ],
      dump,
    );
    const restored = new Client({ connectionString: restoredURL.href });
    await restored.connect();
    try {
      const result = await restored.query(
        "SELECT data FROM payload_kv WHERE key = $1",
        ["phase02-backup"],
      );
      assert.deepEqual(result.rows, [{ data: { restored: true } }]);
    } finally {
      await restored.end();
    }
    console.log(
      "PASS: pg_dump/psql restore preserves migrated schema and fixture data",
    );
  } finally {
    await admin.query(`DROP DATABASE "${restoreName}" WITH (FORCE)`);
  }
}
try {
  // Only the randomly named database created by this process is ever dropped.
  await admin.query(`CREATE DATABASE "${name}"`);
  created = true;
  console.log(`Created isolated ${kind} database`);
  const payload = ["--import", "tsx", "node_modules/payload/bin.js"];
  await run([...payload, "migrate"]);
  if (kind === "integration") {
    await run(["--import", "tsx", "tests/integration/auth.ts"]);
    await run(["--import", "tsx", "tests/integration/auth-regressions.ts"]);
  }
  if (kind === "e2e") {
    const server = createServer();
    const port = await new Promise<number>((resolve, reject) => {
      server.on("error", reject);
      server.listen(0, "127.0.0.1", () => {
        const address = server.address();
        if (!address || typeof address === "string")
          return reject(new Error("Missing test port"));
        server.close(() => resolve(address.port));
      });
    });
    Object.assign(env, {
      TEST_SERVER_PORT: String(port),
      NEXT_PUBLIC_SITE_URL: `http://127.0.0.1:${port}`,
    });
    await run([
      "node_modules/@playwright/test/cli.js",
      "test",
      ...process.argv.slice(3),
    ]);
  }
  if (kind === "database") {
    await run([...payload, "migrate:down"]);
    // Verify the isolated database, rather than the administrative database.
    const inspect = new Client({ connectionString: isolated.href });
    await inspect.connect();
    try {
      const tables = await inspect.query(
        "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'",
      );
      if (tables.rowCount !== 0)
        throw new Error("Migration rollback left tables behind");
    } finally {
      await inspect.end();
    }
    await run([...payload, "migrate"]);
    await run(["--import", "tsx", "tests/integration/database.ts"]);
    await backupRehearsal();
  }
} finally {
  if (created) await admin.query(`DROP DATABASE "${name}" WITH (FORCE)`);
  await admin.end();
  console.log(`Removed isolated ${kind} database`);
}
