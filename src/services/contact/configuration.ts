export function smtpConfiguration(
  source: Record<string, string | undefined> = process.env,
) {
  const port = Number(source.CONTACT_SMTP_PORT);
  const host = source.CONTACT_SMTP_HOST;
  const user = source.CONTACT_SMTP_USER;
  const pass = source.CONTACT_SMTP_PASSWORD;
  const from = source.CONTACT_SMTP_FROM;
  const security =
    source.CONTACT_SMTP_SECURITY ||
    (port === 465 ? "tls" : port === 587 ? "starttls" : "");
  if (
    source.CONTACT_ENABLED !== "true" ||
    !host ||
    !/^[a-zA-Z0-9.-]+$/.test(host) ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    !["tls", "starttls"].includes(security) ||
    !user ||
    !pass ||
    !from ||
    !/^[^\s<>@\r\n]+@[^\s<>@\r\n]+\.[^\s<>@\r\n]+$/.test(from)
  )
    return null;
  return { host, port, user, pass, from, secure: security === "tls" };
}
