const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

const {
  SRC_INDEX_PATH,
  BUILD_PATH,
  SRC_PATH,
  moduleFileExtensions,
} = require('./utils/paths');
const { useTypeScript } = require('./utils/webpack-utils');

function WebpackCommonChainFn(config) {
  config
    // 修改 entry 配置
    .entry('index')
    .add(SRC_INDEX_PATH)
    .end()
    // 修改 output 配置
    .output.path(BUILD_PATH)
    .filename('[name].[contenthash:8].js')
    .chunkFilename('[name].[contenthash:8].js')
    // webpack-dev-server 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。
    .publicPath('/');

  config.resolve.extensions
    .merge(
      moduleFileExtensions
        .map((ext) => `.${ext}`)
        .filter((ext) => useTypeScript || !ext.includes('ts'))
    )
    .end()
    .alias.set('@', SRC_PATH);
  // .set('react-dom', '@hot-loader/react-dom');

  // 创建一个具名规则，以后用来修改规则
  config.module
    .rule('compile')
    .test(/\.(js|jsx|ts|tsx)$/)
    .exclude.add(/node_modules/)
    .end()
    .use('babel')
    .loader('babel-loader');

  config.module
    .rule('asset')
    .test(/\.(svg|png|jpe?g|gif|mp3|mp4)$/)
    .use('asset-loader')
    .loader('url-loader')
    .options({
      limit: 8192,
    });
  config.module
    .rule('font')
    .test(/\.(woff2?|eot|ttf|otf)$/i)
    .use('font-loader')
    .loader('file-loader')
    .options({
      limit: 8192,
    });

  config
    .plugin('DefinePlugin')
    .use(DefinePlugin, [
      {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    ])
    .end()
    .plugin('HtmlWebpackPlugin')
    .use(HtmlWebpackPlugin, [
      {
        filename: 'index.html',
        template: 'public/index.html',
        inject: 'body',
        minify: false,
      },
    ]);
}

module.exports = WebpackCommonChainFn;
