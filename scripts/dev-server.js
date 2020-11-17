const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const Config = require('webpack-chain');

const WebpackCommonChainFn = require('../config/webpack.common');
const webpackDevChainFn = require('../config/webpack.dev');

const webpackChainConfig = new Config();
WebpackCommonChainFn(webpackChainConfig);
webpackDevChainFn(webpackChainConfig);

const webpackConfig = webpackChainConfig.toConfig();
const compiler = Webpack(webpackConfig);
const port = 8080;
const host = '127.0.0.1';
const devServerOptions = {
  ...webpackConfig.devServer,
  index: 'index.html',
  open: true,
  stats: {
    colors: true,
  },
  historyApiFallback: true,
  hot: true,
};
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(port, host, () => {
  console.log(`Starting server on http://${host}:${port}`);
});
