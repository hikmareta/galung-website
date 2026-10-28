import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateInstaller,
  partLength,
  PART_SIZE,
  validMagic,
} from "../../src/services/downloads/validation.ts";
test("installer metadata rejects unapproved architecture, unsafe names, wrong extension, size and checksum", () => {
  const valid = {
    os: "windows",
    architecture: "fixture",
    filename: "Galung.exe",
    sizeBytes: 20,
    sha256: "a".repeat(64),
  };
  assert.doesNotThrow(() => validateInstaller(valid, ["windows:fixture"]));
  for (const patch of [
    { os: "linux" },
    { architecture: "invented" },
    { filename: "../Galung.exe" },
    { filename: "Galung.dmg" },
    { sizeBytes: 1e9 },
    { sizeBytes: 1.1 },
    { sizeBytes: 0 },
    { sha256: "A".repeat(64) },
  ])
    assert.throws(() =>
      validateInstaller({ ...valid, ...patch }, ["windows:fixture"]),
    );
  assert.throws(() => validateInstaller(valid, []));
});
test("multipart boundaries enforce exact part scope and tail size", () => {
  assert.equal(partLength(PART_SIZE + 17, 1), PART_SIZE);
  assert.equal(partLength(PART_SIZE + 17, 2), 17);
  for (const part of [0, -1, 3, 1.2, NaN])
    assert.throws(() => partLength(PART_SIZE + 17, part));
});
test("installer signatures reject renamed arbitrary files", () => {
  assert.equal(validMagic("a.exe", Buffer.from("MZfixture")), true);
  assert.equal(validMagic("a.exe", Buffer.from("html")), false);
  assert.equal(
    validMagic("a.msi", Buffer.from("d0cf11e0a1b11ae1", "hex")),
    true,
  );
  assert.equal(validMagic("a.pkg", Buffer.from("xar!fixture")), true);
});
