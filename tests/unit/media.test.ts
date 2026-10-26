import assert from "node:assert/strict";
import test from "node:test";
import { validateImage } from "../../src/services/content/media-validation.ts";
test("media rejects spoofed types, executable data and oversized images", () => {
  const data = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.doesNotThrow(() =>
    validateImage({ data, mimetype: "image/png", size: 8 }),
  );
  for (const file of [
    { data, mimetype: "image/jpeg", size: 8 },
    {
      data: Buffer.from("<svg onload='alert(1)'>"),
      mimetype: "image/svg+xml",
      size: 22,
    },
    { data, mimetype: "image/png", size: 8 * 1024 * 1024 + 1 },
    { data: Buffer.from("MZ"), mimetype: "image/png", size: 2 },
  ])
    assert.throws(() => validateImage(file));
});
