const { resolve } = require('./config/utils');

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true,
  },
  extends: [
    // including ECMAScript 6+ and React.
    require.resolve('eslint-config-airbnb'),
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': resolve('src'),
            },
          },
          extensions: ['.js', '.jsx'],
        },
      },
    },
  },
  rules: {
    'no-console': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'global-require': 'off',
  },
  globals: {
    window: true,
    document: true,
    XMLHttpRequest: true,
    fetch: true,
  },
};
