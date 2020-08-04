module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "complexity": "warn",
    "eqeqeq": ["error", "always"],
    "default-case": "warn",
    "newline-before-return": "error",
    // For Override
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"]
  },
  "overrides": [
    {
      // Only for typescripts
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/no-var-requires": ["error"],
        "@typescript-eslint/explicit-module-boundary-types": ["error"]
      }
    }
  ],
  "settings": {}
}
