import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { runProcess } from "../helpers/run-process";
import { getPayload } from "payload";
import config from "../../src/payload.config";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
import { assertProcessResult } from "../helpers/process-result";

// Uses the configured local/test database. Every fixture is removed in finally.
assertIsolatedDatabase();
const payload = await getPayload({ config });
const ids: (number | string)[] = [];
const password = randomBytes(24).toString("hex");
try {
  await assert.rejects(
    payload.find({ collection: "users", overrideAccess: false }),
  );
  await assert.rejects(
    payload.create({
      collection: "users",
      overrideAccess: false,
      data: {
        email: "anonymous@example.invalid",
        password,
        name: "Denied",
        role: "super-admin",
        active: true,
      },
    }),
  );
  const baseline = await payload.count({ collection: "users" });
  assert.equal(baseline.totalDocs, 0, "Runner must supply a fresh database");
  {
    const email = `bootstrap-${randomBytes(8).toString("hex")}@example.invalid`;
    const operatorEnv = {
      ...process.env,
      BOOTSTRAP_ADMIN_EMAIL: email,
      BOOTSTRAP_ADMIN_PASSWORD: password,
    };
    const run = () =>
      runProcess(
        process.execPath,
        ["--import", "tsx", "--env-file=.env", "scripts/create-admin.ts"],
        { env: operatorEnv, timeout: 120000 },
      );
    const created = await run();
    const fixtures = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
    });
    ids.push(...fixtures.docs.map((doc) => doc.id));
    assertProcessResult(created, 0, "Administrator created.");
    assert.equal(fixtures.totalDocs, 1);
    assertProcessResult(
      await run(),
      1,
      "Bootstrap is only permitted on an empty users collection",
    );
    assert.equal((await payload.count({ collection: "users" })).totalDocs, 1);
    console.log(
      "PASS: operator bootstrap creates first admin and refuses repeat bootstrap",
    );
  }
  await assert.rejects(
    payload.create({
      collection: "users",
      overrideAccess: true,
      data: {
        email: "first-register@example.invalid",
        password,
        name: "Denied even with access override",
        role: "super-admin",
        active: true,
      },
    }),
  );
  const admin = await payload.create({
    collection: "users",
    context: { bootstrapAdmin: true },
    data: {
      email: `test-${randomBytes(8).toString("hex")}@example.invalid`,
      password,
      name: "Test administrator",
      role: "super-admin",
      active: true,
    },
  });
  ids.push(admin.id);
  const actor = { ...admin, collection: "users" as const };
  const found = await payload.find({
    collection: "users",
    user: actor,
    overrideAccess: false,
  });
  assert.ok(found.totalDocs >= 1);
  const login = await payload.login({
    collection: "users",
    data: { email: admin.email, password },
  });
  assert.ok(login.token);
  await payload.update({
    collection: "users",
    id: admin.id,
    data: { active: false },
  });
  await assert.rejects(
    payload.login({
      collection: "users",
      data: { email: admin.email, password },
    }),
  );
  await assert.rejects(
    payload.find({
      collection: "users",
      user: { ...actor, active: false },
      overrideAccess: false,
    }),
  );
  await payload.update({
    collection: "users",
    id: admin.id,
    data: { active: true },
  });
  for (let attempt = 0; attempt < 5; attempt++)
    await assert.rejects(
      payload.login({
        collection: "users",
        data: { email: admin.email, password: "incorrect" },
      }),
    );
  await assert.rejects(
    payload.login({
      collection: "users",
      data: { email: admin.email, password },
    }),
  );
  console.log(
    "PASS: anonymous read/create denied; admin access/login; inactive account denied; five failures lock login",
  );
} finally {
  for (const id of ids) await payload.delete({ collection: "users", id });
  await payload.destroy();
}
