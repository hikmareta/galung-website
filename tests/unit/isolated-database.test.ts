import { test } from "node:test";
import assert from "node:assert/strict";
import { assertIsolatedDatabase } from "../helpers/isolated-database.ts";

test("direct tests reject development databases and mismatched isolation markers", () => {
  const name = "galung_test_integration_0123456789abcdef";
  assert.doesNotThrow(() =>
    assertIsolatedDatabase({
      DATABASE_URL: `postgresql://localhost/${name}`,
      GALUNG_TEST_DATABASE: name,
    }),
  );
  for (const env of [
    {},
    {
      DATABASE_URL: "postgresql://localhost/galung",
      GALUNG_TEST_DATABASE: "galung",
    },
    {
      DATABASE_URL: `postgresql://localhost/${name}`,
      GALUNG_TEST_DATABASE: "different",
    },
  ]) {
    assert.throws(() => assertIsolatedDatabase(env));
  }
});
