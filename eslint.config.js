import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    settings: {
      react: {
        version: "18.3.1",
      },
    },

    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-unused-vars": "warn",
    },
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      pluginReact.configs.flat.recommended,
      pluginReact.rules["jsx-uses-react"],
    ],
  }
);

