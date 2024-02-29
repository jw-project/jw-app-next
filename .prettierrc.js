/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    '^react$',
    '^next',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^~/(.*)$',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
};
