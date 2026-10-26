import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Users } from "./collections/Users";
import { readEnvironment } from "./lib/env";

const env = readEnvironment();
const dirname = path.dirname(fileURLToPath(import.meta.url));
export default buildConfig({
  secret: env.secret,
  serverURL: env.origin,
  cors: [env.origin],
  csrf: [env.origin],
  // Disable Payload's console email fallback so reset tokens never enter logs.
  email: () => ({
    name: "disabled-until-provider-configured",
    defaultFromAddress: "unconfigured@example.invalid",
    defaultFromName: "Galung local development",
    sendEmail: async () => {
      throw new Error("Email delivery is not configured");
    },
  }),
  admin: {
    user: "users",
    importMap: { baseDir: dirname },
    meta: { titleSuffix: " | Galung Admin", robots: "noindex, nofollow" },
  },
  collections: [Users],
  localization: { locales: ["id", "en"], defaultLocale: "id", fallback: false },
  graphQL: { disable: true },
  db: postgresAdapter({
    pool: { connectionString: env.database },
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
