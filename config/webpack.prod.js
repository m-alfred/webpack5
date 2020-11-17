const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { setStyleLoaders } = require('./utils/webpack-utils');
const { envConfig } = require('./utils/env-config');

console.log('envConfig:', envConfig);

const { analyze } = envConfig;

function webpackProdChainFn(config) {
  if (process.env.NODE_ENV === 'production') {
    config
      .mode('production')
      .devtool('source-map');

    setStyleLoaders(
      config,
      true,
      'css',
      [
        [
          'css-loader',
        ],
      ],
    );

    setStyleLoaders(
      config,
      true,
      'less',
      [
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
      ],
    );

    config.optimization
      .minimizer('TerserPlugin')
      .use(TerserPlugin, [{
      // cache: true,
        parallel: true,
        // sourceMap: true, // 如果在生产环境中使用 source-maps，必须设置为 true
        terserOptions: {
        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }])
      .end()
      .minimizer('OptimizeCSSAssetsPlugin')
    // css压缩
      .use(OptimizeCSSAssetsPlugin)
      .end()
      .splitChunks({
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
            // 第三方库优先级高于styles，将第三方库的js和css统一打包到vendor
            priority: 10,
            enforce: true,
          },
          styles: {
          /*
            https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunksname
            Providing a string or a function allows you to use a custom name. Specifying
            either a string or a function that always returns the same string will merge all
            common modules and vendors into a single chunk. This might lead to bigger initial
            downloads and slow down page loads.
            If you choose to specify a function, you may find the chunk.name and chunk.hash
            properties(where chunk is an element of the chunks array) particularly useful in
            choosing a name for your chunk.
          */
            test: /\.(css|less)$/,
            name(module, chunks, cacheGroupKey) {
            // console.log('module', module.context, chunks, cacheGroupKey);
              return cacheGroupKey;
            },
            chunks: 'all',
            enforce: true,
          },
        },
      });

    config
      .plugin('MiniCssExtractPlugin')
      .use(MiniCssExtractPlugin, [{
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].css',
      }])
      .end()
      .plugin('CleanWebpackPlugin')
      .use(CleanWebpackPlugin);

    if (analyze) {
      config
        .plugin('BundleAnalyzerPlugin')
        .use(BundleAnalyzerPlugin);
    }
  }
}

module.exports = webpackProdChainFn;
