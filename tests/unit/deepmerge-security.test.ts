import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
const require = createRequire(import.meta.url);
const payloadRequire = createRequire(require.resolve("payload"));
const root = path.dirname(payloadRequire.resolve("deepmerge/package.json"));
test("Payload merge wrappers preserve schema arrays and component references with the patch", async () => {
  const wrappers = await import(
    pathToFileURL(
      path.join(
        path.dirname(require.resolve("payload")),
        "utilities/deepMerge.js",
      ),
    ).href
  );
  assert.deepEqual(
    wrappers.deepMergeWithCombinedArrays(
      { fields: [{ a: 1 }] },
      { fields: [{ b: 2 }] },
    ),
    { fields: [{ a: 1, b: 2 }] },
  );
  assert.deepEqual(
    wrappers.deepMergeWithSourceArrays({ fields: [1] }, { fields: [2] }),
    { fields: [2] },
  );
  const Component = () => null;
  assert.equal(
    wrappers.deepMergeWithReactComponents({}, { Component }).Component,
    Component,
  );
  assert.equal(
    Object.hasOwn(
      wrappers.deepMerge({}, JSON.parse('{"__proto__":{"polluted":true}}')),
      "__proto__",
    ),
    false,
  );
});
// Source index.js depends on an upstream build-only module; runtime bundles are self-contained.
for (const entry of ["dist/cjs.js", "dist/umd.js"]) {
  const merge = require(path.join(root, entry));
  test(`deepmerge ${entry}: dangerous keys rejected in source, target, nested and all merges`, () => {
    const poison = JSON.parse(
      '{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}},"prototype":{"polluted":true},"safe":1}',
    );
    for (const target of [
      {},
      Object.create(null),
      null,
      7,
      { nested: null },
      JSON.parse('{"__proto__":{},"constructor":null,"prototype":{}}'),
    ]) {
      for (const result of [
        merge(target, poison),
        merge(poison, {}),
        merge({ nested: target }, { nested: poison }),
        merge.all([{ nested: target }, { nested: poison }]),
      ]) {
        const value = result.nested || result;
        assert.equal(Object.hasOwn(value, "__proto__"), false);
        assert.equal(Object.hasOwn(value, "constructor"), false);
        assert.equal(Object.hasOwn(value, "prototype"), false);
        assert.equal(Object.getPrototypeOf(value), Object.prototype);
        assert.equal(value.polluted, undefined);
      }
    }
    assert.equal(({} as Record<string, unknown>).polluted, undefined);
  });
  test(`deepmerge ${entry}: normal objects, symbols, arrays and custom options preserved`, () => {
    const symbol = Symbol("safe");
    assert.deepEqual(
      merge(
        { a: { x: 1 }, list: [1] },
        { a: { y: 2 }, list: [2], [symbol]: 3 },
      ),
      { a: { x: 1, y: 2 }, list: [1, 2], [symbol]: 3 },
    );
    assert.deepEqual(
      merge(
        { list: [1] },
        { list: [2] },
        { arrayMerge: (_a: unknown, b: unknown) => b },
      ),
      { list: [2] },
    );
    assert.deepEqual(
      merge(
        { count: 1 },
        { count: { value: 2 } },
        {
          customMerge: (key: string) =>
            key === "count" ? () => 42 : undefined,
        },
      ),
      { count: 42 },
    );
    const source = { a: { x: 1 } };
    assert.equal(merge({}, source, { clone: false }).a, source.a);
    assert.deepEqual(merge.all([{ a: 1 }, { b: 2 }]), { a: 1, b: 2 });
  });
}
