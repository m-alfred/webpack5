const webpack = require('webpack');

const Config = require('webpack-chain');

const WebpackCommonChainFn = require('../config/webpack.common');
const webpackProdChainFn = require('../config/webpack.prod');

const webpackChainConfig = new Config();
WebpackCommonChainFn(webpackChainConfig);
webpackProdChainFn(webpackChainConfig);

const {
  log, success, error,
} = require('../config/utils/logger');

const webpackConfig = webpackChainConfig.toConfig();
webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    if (err) {
      error('Build faild.');
      log(err);
      process.exit(1);
    }

    if (stats.hasErrors()) {
      error('Build faild.');
      log(stats.toString({
        chunks: false,
        colors: true,
        modules: false,
      }));
      process.exit(1);
    }
  }

  log(stats.toString({
    chunks: false,
    colors: true,
    modules: false,
  }));

  success('webpack build done');
});
