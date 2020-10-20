const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { styleLoaders } = require('./utils')

module.exports = merge(common, {
  mode: 'production',
  
  devtool: 'source-map',
  module: {
    rules: [
      ...styleLoaders({
        usePostCSS: true,
        extract: true
      })
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        // cache: true,
        parallel: true,
        // sourceMap: true, // 如果在生产环境中使用 source-maps，必须设置为 true
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      })
    ],
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
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
});