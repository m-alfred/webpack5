const { setStyleLoaders } = require('./utils/webpack-utils');
const { useReactHotReload } = require('./utils/webpack-utils');

function webpackDevChainFn(config) {
  if (process.env.NODE_ENV === 'development') {
    config.mode('development').devtool('eval-source-map');

    if (useReactHotReload) {
      config.entry('index').prepend('react-hot-loader/patch');
    }
    setStyleLoaders(config, false, 'css', [['css-loader']]);

    setStyleLoaders(config, false, 'less', [
      [
        'less-loader',
        {
          lessOptions: {
            javascriptEnabled: true,
          },
          // This is especially useful when some of your Less variables depend on the environment
          additionalData: `@env: ${process.env.NODE_ENV}; @primary-color: rgb(0, 173, 0);`,
        },
      ],
    ]);
  }
}

module.exports = webpackDevChainFn;
