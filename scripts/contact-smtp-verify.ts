import { contactTransport } from "../src/services/contact/mail";
import { smtpConfiguration } from "../src/services/contact/configuration";
let transport: ReturnType<typeof contactTransport>["transport"] | undefined;
try {
  if (!smtpConfiguration({ ...process.env, CONTACT_ENABLED: "true" })) {
    const required = [
      "CONTACT_SMTP_HOST",
      "CONTACT_SMTP_PORT",
      "CONTACT_SMTP_USER",
      "CONTACT_SMTP_FROM",
      "CONTACT_SMTP_PASSWORD",
    ];
    const missing = required.filter((name) => !process.env[name]);
    console.error(
      missing.length
        ? `SMTP verification blocked: missing ${missing.join(", ")}. Values are not printed.`
        : "SMTP verification blocked: invalid host, port, TLS mode or sender configuration.",
    );
    process.exitCode = 1;
  } else {
    transport = contactTransport(true).transport;
    await transport.verify();
    console.log(
      "PASS: SMTP TLS connection and authentication verified. No email was sent.",
    );
  }
} catch (error) {
  const failure = error as { code?: unknown; responseCode?: unknown };
  const allowedCodes = [
    "EAUTH",
    "ECONNECTION",
    "ESOCKET",
    "ETIMEDOUT",
    "EDNS",
    "ETLS",
    "ECONNREFUSED",
    "ENOTFOUND",
    "CERT_HAS_EXPIRED",
    "ERR_TLS_CERT_ALTNAME_INVALID",
    "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
    "DEPTH_ZERO_SELF_SIGNED_CERT",
  ];
  const code =
    typeof failure?.code === "string" && allowedCodes.includes(failure.code)
      ? failure.code
      : "UNKNOWN";
  const responseCode =
    typeof failure?.responseCode === "number" &&
    Number.isInteger(failure.responseCode) &&
    failure.responseCode >= 100 &&
    failure.responseCode <= 599
      ? failure.responseCode
      : undefined;
  console.error(JSON.stringify({ smtpFailure: code, responseCode }));
  console.error(
    "FAIL: SMTP configuration, certificate, connection or authentication could not be verified. No credentials or provider error details are printed.",
  );
  process.exitCode = 1;
} finally {
  transport?.close();
}
