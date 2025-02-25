import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Add custom rules here
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  ...compat.extends("prettier"),
];

export default eslintConfig;
