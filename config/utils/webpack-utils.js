const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { PACKAGE_JSON_PATH, TS_CONFIG_PATH } = require('./paths');

const pkgJson = require(PACKAGE_JSON_PATH);

const cssLoaders = (options = {}) => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // module: true  // 指定启用css modules
    },
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
    },
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader];

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: { ...loaderOptions },
      });
    }
    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return [{ loader: MiniCssExtractPlugin.loader }].concat(loaders);
    }
    // style-loader,insert style into html
    return [{ loader: 'style-loader' }].concat(loaders);
  }

  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', {
      lessOptions: {
        javascriptEnabled: true,
      },
      // This is especially useful when some of your Less variables depend on the environment
      additionalData: `@env: ${process.env.NODE_ENV}; @primary-color: rgb(0, 173, 0);`,
    }),
  };
};

const styleLoaders = (options) => {
  const output = [];
  const loaders = cssLoaders(options);
  Object.keys(loaders).forEach((extension) => {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    });
  });
  return output;
};

const useReactHotReload = () => {
  const dependencyFlag = Object.keys(pkgJson.dependencies || {}).includes('react-hot-loader');
  const devDependencyFlag = Object.keys(pkgJson.devDependencies || {}).includes('react-hot-loader');

  return dependencyFlag || devDependencyFlag;
};

const useTypeScript = () => fs.existsSync(TS_CONFIG_PATH);

module.exports = {
  cssLoaders,
  styleLoaders,
  useReactHotReload: useReactHotReload(),
  useTypeScript,
};
