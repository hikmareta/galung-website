export function readEnvironment(
  source: Record<string, string | undefined> = process.env,
) {
  const secret = source.PAYLOAD_SECRET;
  if (!secret || secret.length < 32 || /CHANGE_ME/i.test(secret))
    throw new Error(
      "PAYLOAD_SECRET must be a unique secret of at least 32 characters",
    );
  const database = source.DATABASE_URL;
  if (
    !database ||
    !/^postgres(ql)?:\/\//.test(database) ||
    /CHANGE_ME/.test(database)
  )
    throw new Error(
      "DATABASE_URL must be a configured PostgreSQL connection string",
    );
  const site = new URL(source.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  if (
    !["http:", "https:"].includes(site.protocol) ||
    site.username ||
    site.password ||
    site.pathname !== "/" ||
    site.search ||
    site.hash
  )
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin");
  if (
    source.NODE_ENV === "production" &&
    site.protocol !== "https:" &&
    !["localhost", "127.0.0.1"].includes(site.hostname)
  )
    throw new Error("Production requires HTTPS");
  return {
    secret,
    database,
    origin: site.origin,
    secureCookies: site.protocol === "https:",
  };
}
