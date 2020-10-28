module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV === 'development');
  const presets = [
    [
      '@babel/preset-env',
      {

        corejs: 3,
        targets: [
          'android >= 4.4.4',
          'ios >= 8',
        ],
        // 根据代码逻辑中用到的 ES6+语法进行方法的导入，而不是全部导入
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ];
  const plugins = ['react-hot-loader/babel', ['@babel/plugin-proposal-decorators', { legacy: true }]];

  return { presets, plugins };
};
