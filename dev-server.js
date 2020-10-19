const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./config/webpack.dev');

const compiler = Webpack(webpackConfig);
const port = 8080;
const host = '127.0.0.1'
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  index: 'index.html',
  open: true,
  stats: {
    colors: true,
  },
  historyApiFallback: true,
  hot: true,
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(port, host, () => {
  console.log(`Starting server on http://${host}:${port}`);
});