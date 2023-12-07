const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

const { SRC_INDEX_PATH, BUILD_PATH, SRC_PATH } = require('./utils/paths');

function WebpackCommonChainFn(config) {
  // 如果默认值为 'auto'，当只有 2 个或更少的错误时，它将显示错误详情。
  // TODO 调试用可删
  config.stats({
    errorDetails: true,
  });
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
    .merge(['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.wasm'])
    .end()
    .alias.set('@', SRC_PATH)
    .set('react-dom', '@hot-loader/react-dom');

  // 创建一个具名规则，以后用来修改规则
  config.module
    .rule('compile')
    .test(/\.(js|jsx|ts|tsx)$/)
    // .resolve.set('fullySpecified', false)
    // .end()
    // .exclude.add(/node_modules/)
    // .end()
    .use('babel')
    .loader('babel-loader');

  // config.module.rule('compile').resolve.set('fullySpecified', false);

  config.module.rule('compile').exclude.add(/node_modules[\\/]core-js/);
  config.module
    .rule('compile')
    .exclude.add(/node_modules[\\/]webpack[\\/]buildin/);

  // https://github.com/webpack/webpack/issues/14532#issuecomment-947525539
  config.output.set('hashFunction', 'xxhash64');
  // https://github.com/webpack/webpack/issues/11467#issuecomment-691873586
  config.module
    .rule('esm')
    .test(/\.m?jsx?$/)
    .resolve.set('fullySpecified', false);

  config.module
    .rule('asset')
    .test(/\.(svg|png|jpe?g|gif|mp3|mp4|woff2?|eot|ttf|otf)$/)
    // .use('asset-loader')
    .set('type', 'asset')
    .set('parser', {
      dataUrlCondition: {
        maxSize: 8 * 1024, // 8kb
      },
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
