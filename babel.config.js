const { useTypeScript } = require('./config/utils/webpack-utils');

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV === 'development');
  const presets = [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        // 根据代码逻辑中用到的 ES6+语法进行方法的导入，而不是全部导入
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (useTypeScript()) {
    presets.push('@babel/preset-typescript');
  }
  const plugins = [
    // ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ];

  if (process.env.NODE_ENV === 'development') {
    plugins.push(['react-refresh/babel']);
  }

  return { sourceType: 'unambiguous', presets, plugins };
};
