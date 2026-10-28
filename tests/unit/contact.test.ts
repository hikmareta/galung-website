import { test } from "node:test";
import assert from "node:assert/strict";
import {
  contactPolicy,
  contactNotices,
  validateContact,
} from "../../src/services/contact/policy.ts";
import { smtpConfiguration } from "../../src/services/contact/configuration.ts";
import {
  boundedJSON,
  issueToken,
  validToken,
} from "../../src/services/contact/security.ts";
const input = {
  submissionId: "3b241101-e2bb-4255-8caf-4136c566a962",
  name: "Uji",
  email: "test@example.invalid",
  message: "Pesan uji",
  locale: "id",
  consent: true,
  privacyRevision: contactPolicy.revision,
  token: "test",
  website: "",
};
test("contact validation rejects unapproved locale/policy, header injection and oversized or empty fields", () => {
  assert.equal(validateContact(input)?.name, "Uji");
  assert.equal(
    validateContact({
      ...input,
      locale: "en",
      privacyRevision: contactNotices.en.revision,
    })?.locale,
    "en",
  );
  for (const change of [
    { name: "" },
    { name: "x".repeat(121) },
    { email: "one@example.invalid\r\nBcc:other@example.invalid" },
    { email: "not-mail" },
    { message: "" },
    { message: "x".repeat(5001) },
    { message: "bad\0content" },
    { locale: "en" },
    { consent: false },
    { privacyRevision: "old" },
    { token: {} },
    { submissionId: "not-a-uuid" },
  ])
    assert.equal(validateContact({ ...input, ...change }), null);
  assert.equal(validateContact(null), null);
  assert.equal(validateContact([]), null);
});
test("contact tokens enforce signature, minimum fill time and expiry", () => {
  const now = 1793059200000;
  const secret = "a".repeat(48);
  const token = issueToken(secret, now);
  assert.equal(validToken(token, secret, now + 2999), false);
  assert.equal(validToken(token, secret, now + 3000), true);
  assert.equal(validToken(token, "b".repeat(48), now + 5000), false);
  assert.equal(validToken(`${token}0`, secret, now + 5000), false);
  assert.equal(validToken(token, secret, now - 1), false);
  assert.equal(validToken(token, secret, now + 1800001), false);
});
test("SMTP readiness requires enabled, authenticated TLS transport; has no plaintext bypass", () => {
  const values = {
    CONTACT_ENABLED: "true",
    CONTACT_SMTP_HOST: "mx3.mailspace.id",
    CONTACT_SMTP_PORT: "465",
    CONTACT_SMTP_USER: "sender@example.invalid",
    CONTACT_SMTP_PASSWORD: "fixture",
    CONTACT_SMTP_FROM: "sender@example.invalid",
  };
  assert.equal(smtpConfiguration(values)?.secure, true);
  assert.equal(
    smtpConfiguration({ ...values, CONTACT_SMTP_PORT: "587" })?.secure,
    false,
  );
  for (const changed of [
    { CONTACT_ENABLED: "false" },
    { CONTACT_SMTP_PASSWORD: "" },
    { CONTACT_SMTP_HOST: "host/evil" },
    { CONTACT_SMTP_PORT: "25" },
    { CONTACT_SMTP_PORT: "-1" },
    { CONTACT_SMTP_SECURITY: "none" },
    { CONTACT_SMTP_FROM: "one@example.invalid\r\nBcc:evil@example.invalid" },
  ])
    assert.equal(smtpConfiguration({ ...values, ...changed }), null);
});
test("JSON request limits enforce streamed size, content type and malformed bodies", async () => {
  assert.deepEqual(
    await boundedJSON(
      new Request("https://example.invalid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"ok":true}',
      }),
    ),
    { ok: true },
  );
  await assert.rejects(
    boundedJSON(
      new Request("https://example.invalid", { method: "POST", body: "test" }),
    ),
    /media/,
  );
  await assert.rejects(
    boundedJSON(
      new Request("https://example.invalid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "x".repeat(32769),
      }),
    ),
    /size/,
  );
  await assert.rejects(
    boundedJSON(
      new Request("https://example.invalid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": "99999",
        },
        body: "{}",
      }),
    ),
    /size/,
  );
});
