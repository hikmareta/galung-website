import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import ts from "typescript-eslint";
import next from "@next/eslint-plugin-next";
import hooks from "eslint-plugin-react-hooks";
import react from "@eslint-react/eslint-plugin";
export default defineConfig([
  {
    files: ["**/*.{ts,tsx,mjs}"],
    extends: [js.configs.recommended, ...ts.configs.recommended],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      next.configs["core-web-vitals"],
      hooks.configs.flat.recommended,
      react.configs["recommended-typescript"],
    ],
  },
  globalIgnores([
    ".next/**",
    "src/payload-types.ts",
    "src/migrations/**",
    "src/app/(payload)/admin/importMap.js",
  ]),
]);
