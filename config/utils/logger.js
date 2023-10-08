const chalk = require('chalk');
const padStart = require('string.prototype.padstart');

const format = (label, msg) =>
  msg
    .split('\n')
    .map((line, i) =>
      i === 0 ? `${label} ${line}` : padStart(line, chalk.reset(label).length)
    )
    .join('\n');

const log = (msg = '') => {
  // eslint-disable-next-line no-console
  console.log(msg);
};

const info = (msg) => {
  // eslint-disable-next-line no-console
  console.log(format(chalk.bgBlue.black(' INFO '), msg));
};

const done = (msg) => {
  // eslint-disable-next-line no-console
  console.log(format(chalk.bgGreen.black(' DONE '), msg));
};

const success = (msg) => {
  // eslint-disable-next-line no-console
  console.log(format(chalk.bgGreen.black(' SUCCESS '), msg));
};

const warn = (msg) => {
  // eslint-disable-next-line no-console
  console.warn(format(chalk.bgYellow.black(' WARN '), chalk.yellow(msg)));
};

const error = (msg) => {
  // eslint-disable-next-line no-console
  console.error(format(chalk.bgRed(' ERROR '), chalk.red(msg)));
  if (msg instanceof Error) {
    // eslint-disable-next-line no-console
    console.error(msg.stack);
  }
};

module.exports = {
  log,
  info,
  success,
  warn,
  error,
  done,
};
