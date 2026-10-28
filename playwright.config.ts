import { defineConfig } from "@playwright/test";
import { assertIsolatedDatabase } from "./tests/helpers/isolated-database";
assertIsolatedDatabase();
const origin = process.env.NEXT_PUBLIC_SITE_URL!;
export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  use: { baseURL: origin },
  webServer: {
    command: `"${process.execPath}" node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ${process.env.TEST_SERVER_PORT}`,
    // A fresh test database intentionally has no published homepage (404).
    url: `${origin}/robots.txt`,
    reuseExistingServer: false,
    timeout: 120000,
  },
});
