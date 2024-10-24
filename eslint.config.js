import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "prettier";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "plugin:jsx-a11y/recommended",
      "plugin:@typescript-eslint/recommended",
      "eslint-config-prettier",
      "prettier",
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettier,
    },
    settings: {
      react: {
        // Nói eslint-plugin-react tự động biết version của React.
        version: "detect",
      },
      "import/resolver": {
        node: {
          paths: [path.resolve(__dirname, "")],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    env: {
      node: true,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Tắt rule yêu cầu import React trong file jsx
      "react/react-in-jsx-scope": "off",
      // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
      "react/jsx-no-target-blank": "warn",
    },
    // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        semi: false,
        trailingComma: "none",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true,
      },
    ],
  }
);
