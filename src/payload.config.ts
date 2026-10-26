import {
  SoftwareReleases,
  ReleaseAssets,
  ContactSubmissions,
  DownloadEvents,
} from "./collections/OperationalModels";
import {
  lexicalEditor,
  ParagraphFeature,
  BoldFeature,
  ItalicFeature,
  HeadingFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  contentCollections,
  categories,
  AuditEvents,
} from "./collections/Content";
import { Media } from "./collections/Media";
import { editorialGlobals } from "./globals/editorial";
import { Users } from "./collections/Users";
import { readEnvironment } from "./lib/env";

const env = readEnvironment();
const dirname = path.dirname(fileURLToPath(import.meta.url));
export default buildConfig({
  secret: env.secret,
  editor: lexicalEditor({
    features: () => [
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
      UnorderedListFeature(),
      OrderedListFeature(),
    ],
  }),
  upload: {
    abortOnLimit: true,
    requestSizeLimit: 9 * 1024 * 1024,
    limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  },
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
    components: {
      graphics: {
        Logo: "/components/admin/brand#AdminLogo",
        Icon: "/components/admin/brand#AdminIcon",
      },
    },
    meta: { titleSuffix: " | Galung Admin", robots: "noindex, nofollow" },
  },
  collections: [
    Users,
    ...contentCollections,
    ...categories,
    Media,
    AuditEvents,
    SoftwareReleases,
    ReleaseAssets,
    ContactSubmissions,
    DownloadEvents,
  ],
  globals: editorialGlobals,
  localization: { locales: ["id", "en"], defaultLocale: "id", fallback: false },
  graphQL: { disable: true },
  db: postgresAdapter({
    pool: { connectionString: env.database },
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
