import { defineConfig } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { assertIsolatedDatabase } from "../helpers/isolated-database";
assertIsolatedDatabase();
const origin = process.env.NEXT_PUBLIC_SITE_URL!;
export default defineConfig({
  testDir: ".",
  workers: 1,
  use: { baseURL: origin },
  webServer: {
    cwd: fileURLToPath(new URL("../../", import.meta.url)),
    command: `"${process.execPath}" node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ${process.env.TEST_SERVER_PORT}`,
    url: `${origin}/robots.txt`,
    reuseExistingServer: false,
    timeout: 120000,
  },
});
