module.exports = {
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    globals: {
      window: 'readonly',
      document: 'readonly',
      global: 'readonly',
      require: 'readonly',
      module: 'readonly'
    }
  },
  rules: {
    'no-console': 'off',
    'no-var': ['error']
  }
};