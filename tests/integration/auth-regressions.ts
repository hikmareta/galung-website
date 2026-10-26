import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { getPayload } from "payload";
import config from "../../src/payload.config";
import { assertIsolatedDatabase } from "../helpers/isolated-database";

assertIsolatedDatabase();
const payload = await getPayload({ config });
const resetPassword = (options: {
  collection: "users";
  data: { token: string; password: string };
}) => payload.resetPassword({ ...options, overrideAccess: false });
const email = `regression-${randomBytes(8).toString("hex")}@example.invalid`;
const password = randomBytes(24).toString("hex");
let id: number | undefined;
const validationError = (error: unknown) =>
  typeof error === "object" &&
  error !== null &&
  "status" in error &&
  error.status === 400;
try {
  await assert.rejects(
    payload.create({
      collection: "users",
      context: { bootstrapAdmin: true },
      data: {
        email,
        password: "weakpass",
        name: "Rejected",
        role: "super-admin",
        active: true,
      },
    }),
    validationError,
  );
  const user = await payload.create({
    collection: "users",
    context: { bootstrapAdmin: true },
    data: {
      email,
      password,
      name: "Policy regression",
      role: "super-admin",
      active: true,
    },
  });
  id = user.id;
  await assert.rejects(
    payload.update({ collection: "users", id, data: { password: "weakpass" } }),
    validationError,
  );
  async function resetToken(active = true, expired = false) {
    const token = randomBytes(32).toString("hex");
    await payload.update({
      collection: "users",
      id: id!,
      data: {
        active,
        resetPasswordToken: token,
        resetPasswordExpiration: new Date(
          Date.now() + (expired ? -60000 : 60000),
        ).toISOString(),
      },
    });
    return token;
  }
  const token = await resetToken();
  await assert.rejects(
    resetPassword({
      collection: "users",
      data: { token, password: "weakpass" },
    }),
    validationError,
  );
  // A rejected reset must not consume the valid token or change the current password.
  assert.ok(
    (await payload.login({ collection: "users", data: { email, password } }))
      .token,
  );
  const replacement = randomBytes(8).toString("hex"); // Exact 16-character boundary.
  assert.ok(
    (
      await resetPassword({
        collection: "users",
        data: { token, password: replacement },
      })
    ).token,
  );
  await assert.rejects(
    resetPassword({
      collection: "users",
      data: { token, password: replacement },
    }),
  );
  await assert.rejects(
    payload.login({ collection: "users", data: { email, password } }),
  );
  assert.ok(
    (
      await payload.login({
        collection: "users",
        data: { email, password: replacement },
      })
    ).token,
  );
  const expired = await resetToken(true, true);
  await assert.rejects(
    resetPassword({
      collection: "users",
      data: { token: expired, password: replacement },
    }),
  );
  const inactive = await resetToken(false);
  await assert.rejects(
    resetPassword({
      collection: "users",
      data: { token: inactive, password: replacement },
    }),
  );
  await assert.rejects(
    payload.login({
      collection: "users",
      data: { email, password: replacement },
    }),
  );
  console.log(
    "PASS: short create/update/reset denied; valid reset, replay, expired-token and inactive-account regressions",
  );
} finally {
  if (id !== undefined) await payload.delete({ collection: "users", id });
  await payload.destroy();
}
