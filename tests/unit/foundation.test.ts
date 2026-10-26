import { test } from "node:test";
import assert from "node:assert/strict";
import { isActiveAdmin } from "../../src/access/admin.ts";
import { isLocale } from "../../src/lib/i18n/locales.ts";
import { readEnvironment } from "../../src/lib/env.ts";
test("only active CMS super admins qualify", () => {
  for (const user of [
    null,
    {},
    { collection: "customers", role: "super-admin", active: true },
    { collection: "users", role: "editor", active: true },
    { collection: "users", role: "super-admin", active: false },
  ])
    assert.equal(isActiveAdmin(user), false);
  assert.equal(
    isActiveAdmin({ collection: "users", role: "super-admin", active: true }),
    true,
  );
});
test("locale allowlist rejects unknown and ambiguous locales", () => {
  assert.ok(isLocale("id"));
  assert.ok(isLocale("en"));
  for (const locale of ["ID", "fr", "", "../admin", "en-US"])
    assert.equal(isLocale(locale), false);
});
test("configuration fails closed for missing credentials and unsafe origins", () => {
  assert.throws(() => readEnvironment({}));
  const valid = {
    PAYLOAD_SECRET: "a".repeat(48),
    DATABASE_URL: "postgresql://local:password@localhost/galung",
    NEXT_PUBLIC_SITE_URL: "https://galung.id",
  };
  assert.equal(readEnvironment(valid).secureCookies, true);
  assert.throws(() =>
    readEnvironment({ ...valid, PAYLOAD_SECRET: "CHANGE_ME" }),
  );
  assert.throws(() =>
    readEnvironment({
      ...valid,
      NEXT_PUBLIC_SITE_URL: "https://galung.id/path",
    }),
  );
  assert.throws(() =>
    readEnvironment({
      ...valid,
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "http://galung.id",
    }),
  );
});
