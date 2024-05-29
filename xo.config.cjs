/** @type {import('xo').Options} */
module.exports = {
  space: 2,
  semicolon: true,
  env: ["es2022", "node", "browser"],
  baseConfig: {
    ignorePatterns: ["dist", "node_modules"],
  },
  rules: {
    "unicorn/prevent-abbreviations": "off",
    "comma-dangle": "off",
    "import/extensions": "off",
    quotes: "off",
    "object-curly-spacing": "off",
    "arrow-parens": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-array-for-each": "off",
    "capitalized-comments": "off",
    "no-unused-vars": "off",
    "operator-linebreak": "off",
    // jsx
    "jsx-quotes": ["error", "prefer-double"],
    // ts
    "@typescript-eslint/object-curly-spacing": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "import/no-duplicates": "off",
  },
};
