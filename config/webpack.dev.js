const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { styleLoaders } = require('./utils')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
  },
  module: {
    rules: [
      ...styleLoaders({
        usePostCSS: true
      })
    ]
  }
});