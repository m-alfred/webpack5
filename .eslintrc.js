const { SRC_PATH } = require('./config/utils/paths');
const { useTypeScript } = require('./config/utils/webpack-utils');

const pushConfig = (source, item) => {
  if (source && source instanceof Array) {
    source.push(item);
    return;
  }
  // eslint-disable-next-line no-param-reassign
  source = [item];
};

const config = {
  // 停止在父级目录中寻找规则
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    // 设置es6
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
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
      // 支持webpack别名和扩展
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': SRC_PATH,
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
      files: [
        '*.test.js',
        '.eslintrc.js',
        'babel.config.js',
        'config/**/*',
        'scripts/**/*',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};

if (useTypeScript) {
  // TS
  config.parser = '@typescript-eslint/parser'; // 定义ESLint的解析器
  // config.parserOptions.project =  './tsconfig.json',
  pushConfig(config.extends, 'plugin:@typescript-eslint/recommended'); // 定义文件继承的子规范
  pushConfig(config.plugins, '@typescript-eslint'); // 定义了该eslint文件所依赖的插件
}

module.exports = config;
