const inquirer = require('inquirer');
const Config = require('webpack-chain');
const WebpackCommonChainFn = require('../config/webpack.common');
const webpackDevChainFn = require('../config/webpack.dev');
const webpackProdChainFn = require('../config/webpack.prod');

const webpackChainConfig = new Config();

const {
  log, info,
} = require('../config/utils/logger');

async function inspectConfig() {
  const { mode } = await inquirer.prompt([{
    name: 'mode',
    type: 'list',
    message: '环境: ',
    choices: [
      { name: 'development', value: 'development' },
      { name: 'production', value: 'production' },
    ],
  }]);

  process.env.NODE_ENV = mode;
  WebpackCommonChainFn(webpackChainConfig);
  if (mode === 'development') {
    webpackDevChainFn(webpackChainConfig);
  } else if (mode === 'production') {
    webpackProdChainFn(webpackChainConfig);
  }

  log();
  info('webpack 配置项');
  log(webpackChainConfig.toString());
  log();
}

inspectConfig();
