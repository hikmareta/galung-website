import { defineConfig } from "@playwright/test";
import { assertIsolatedDatabase } from "./tests/helpers/isolated-database";
assertIsolatedDatabase();
const origin = process.env.NEXT_PUBLIC_SITE_URL!;
export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  use: { baseURL: origin },
  webServer: {
    command: `pnpm start --port ${process.env.TEST_SERVER_PORT}`,
    url: `${origin}/id`,
    reuseExistingServer: false,
    timeout: 120000,
  },
});
