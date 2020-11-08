const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const {
  SRC_INDEX_PATH, BUILD_PATH, SRC_PATH, moduleFileExtensions,
} = require('./utils/paths');
const {
  useReactHotReload, useTypeScript,
} = require('./utils/webpack-utils');

module.exports = {
  entry: {
    index: (useReactHotReload ? ['react-hot-loader/patch'] : []).concat([SRC_INDEX_PATH]),
  },
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].js',
    path: BUILD_PATH,
    // webpack-dev-server 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。
    publicPath: '/',
  },
  resolve: {
    extensions: moduleFileExtensions
      .map((ext) => `.${ext}`)
      .filter((ext) => useTypeScript || !ext.includes('ts')),
    alias: {
      '@': SRC_PATH,
      // 'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|png|jpe?g|gif|mp3|mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: 'body',
      minify: false,
    }),
  ],
};
