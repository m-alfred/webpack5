// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { ROOT_PATH } = require('./paths');

const pkg = require(`${ROOT_PATH}/package.json`);

exports.resolve = (dir) => path.resolve(__dirname, '../../', dir);

exports.cssLoaders = (options = {}) => {
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

exports.styleLoaders = (options) => {
  const output = [];
  const loaders = exports.cssLoaders(options);
  Object.keys(loaders).forEach((extension) => {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    });
  });
  return output;
};

exports.supportReactHotReload = () => {
  const dependencyFlag = Object.keys(pkg.dependencies || {}).includes('react-hot-loader');
  const devDependencyFlag = Object.keys(pkg.devDependencies || {}).includes('react-hot-loader');

  return dependencyFlag || devDependencyFlag;
};
