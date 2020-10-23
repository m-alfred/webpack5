const webpack = require('webpack');
const webpackConfig = require('../config/webpack.prod');
const {
  log, success, error,
} = require('../config/utils/logger');

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
