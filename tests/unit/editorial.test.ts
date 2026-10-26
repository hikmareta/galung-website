import assert from "node:assert/strict";
import test from "node:test";
import { editorialUser, canPublish } from "../../src/access/editorial.ts";
import { safeLink, blocks } from "../../src/blocks/registry.ts";
test("editorial roles preserve publication boundary and reject inactive/foreign identities", () => {
  for (const role of ["editor", "publisher", "super-admin"]) {
    const user = { collection: "users", active: true, role };
    assert.equal(editorialUser(user), true);
    assert.equal(canPublish(user), role !== "editor");
    assert.equal(editorialUser({ ...user, active: false }), false);
    assert.equal(canPublish({ ...user, collection: "customers" }), false);
  }
  assert.equal(editorialUser(null), false);
  assert.equal(
    editorialUser({ collection: "users", active: true, role: "author" }),
    false,
  );
});
test("blocks expose no localized layout or arbitrary HTML and links reject active schemes", () => {
  assert.equal(blocks.length, 13);
  for (const value of [
    "javascript:alert(1)",
    "//evil.invalid",
    "/\\evil.invalid",
    "data:text/html,x",
  ])
    assert.notEqual(safeLink(value), true);
  for (const value of ["/id", "https://galung.id/id", ""])
    assert.equal(safeLink(value), true);
});
