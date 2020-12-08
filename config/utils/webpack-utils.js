const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
  PACKAGE_JSON_PATH,
  TS_CONFIG_PATH,
  PRETTIER_CONFIG_PATH,
} = require('./paths');

const pkgJson = require(PACKAGE_JSON_PATH);

function setStyleLoaders(
  webpackConfig,
  needExtract = false,
  styleName,
  loaders,
) {
  const styleTestReg = new RegExp(`\\.${styleName}$`);
  const rule = webpackConfig.module.rule(styleName);

  if (!needExtract) {
    rule.use('style-loader').loader('style-loader');
  } else {
    // Extract CSS when that option is specified
    // (which is the case during production build)
    rule.use('MiniCssExtractPlugin').loader(MiniCssExtractPlugin.loader).end();
  }

  rule
    .test(styleTestReg)
    .use('css-loader')
    .loader('css-loader')
    .end()
    .use('postcss-loader')
    .loader('postcss-loader');

  if (loaders && loaders.length) {
    loaders.forEach(loader => {
      // eslint-disable-next-line no-shadow
      const [loaderName, loaderOptions = {}] = loader;

      rule.use(loaderName).loader(loaderName).options(loaderOptions);
    });
  }
}

const useReactHotReload = () => {
  const dependencyFlag = Object.keys(pkgJson.dependencies || {}).includes(
    'react-hot-loader',
  );
  const devDependencyFlag = Object.keys(pkgJson.devDependencies || {}).includes(
    'react-hot-loader',
  );

  return dependencyFlag || devDependencyFlag;
};

const useTypeScript = () => fs.existsSync(TS_CONFIG_PATH);
const usePrettier = () => fs.existsSync(PRETTIER_CONFIG_PATH);

module.exports = {
  useReactHotReload: useReactHotReload(),
  useTypeScript,
  usePrettier,
  setStyleLoaders,
};
