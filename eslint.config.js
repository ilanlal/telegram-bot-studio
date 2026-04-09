const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest,
        GoogleAppsScript: "readonly",
        Logger: "readonly",
        SpreadsheetApp: "readonly",
        ContentService: "readonly",
        HtmlService: "readonly"
      },
    },
  },
];