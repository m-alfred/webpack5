const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.resolve = (dir) => {
  return path.resolve(__dirname, '../../', dir)
}

exports.cssLoaders = function (options) {
  options = options || {};
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // module: true  // 指定启用css modules
    }
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions)
      });
    }

    if (loader === 'less') {
      // 全局注入less 、 sass的变量和混合
      loaders.push({
        loader: 'less-loader',
        options: {
          
        }
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return [{ loader: MiniCssExtractPlugin.loader }].concat(loaders);
    } else {
      // style-loader,insert style into html
      return [{ loader: 'style-loader' }].concat(loaders);
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', { javascriptEnabled: true })
  };
};

exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }
  return output;
};
