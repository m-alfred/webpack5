const { resolve } = require('./utils')
console.log('resolve:', resolve);

module.exports = {
  entry: {
    index: resolve('src/index.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  }
}