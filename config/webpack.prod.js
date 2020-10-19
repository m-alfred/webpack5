const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: 'body',
      minify: false,
    })
  ],
  optimization: {
    minimizer: [],
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          enforce: true,
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          enforce: true,
        }
      },
    }
  }
});