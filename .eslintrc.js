const { SRC_PATH } = require('./config/utils/paths');

module.exports = {
  // 停止在父级目录中寻找规则
  root: true,
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
  // 定义了一组预定义的全局变量
  env: {
    // 浏览器环境中的全局变量。
    browser: true,
    // Node.js 全局变量和 Node.js 作用域。
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': SRC_PATH,
              // '@': path.resolve(__dirname, 'src'),
            },
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  rules: {
    'no-console': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'ts', 'tsx'] }],
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/prefer-stateless-function': 'off',
    'global-require': 'off',
  },
  globals: {

  },
  overrides: [
    {
      // 覆盖上面定义的规则，针对测试用例文件不做eslint校验
      files: ['*.test.js'],
      rules: {

      },
    },
  ],
};
