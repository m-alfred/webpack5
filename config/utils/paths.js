// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const ROOT_PATH = path.resolve(process.cwd());
const resolveRoot = (relativePath) => path.resolve(ROOT_PATH, relativePath);

module.exports = {
  ROOT_PATH: resolveRoot('.'),
  SRC_PATH: resolveRoot('src'),
  SRC_INDEX_PATH: resolveRoot('src/index'),
  BUILD_PATH: resolveRoot('build'),
  PACKAGE_JSON_PATH: resolveRoot('package.json'),
  TS_CONFIG_PATH: resolveRoot('tsconfig.json'),
};
