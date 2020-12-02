module.exports = {
  extends: [
    'eslint:recommended',
    // 'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/@typescript-eslint',
  ],
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        'variables': false
      }
    ],
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
        allowedNames: ['self'],
      },
    ]
  }
}
