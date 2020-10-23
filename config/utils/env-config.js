const minimist = require('minimist');

const rawArgv = process.argv.slice(2);
const args = minimist(rawArgv, {
  // 转成bool值
  boolean: [
    'analyze',
  ],
});

exports.envConfig = args;
