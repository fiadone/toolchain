const path = require('path')
const webpack = require('webpack')
const base = require('./base')

module.exports = {
  ...base,
  devtool: 'eval',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    contentBase: path.resolve(base.output.path, '..'),
    hot: true,
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    writeToDisk: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...base.plugins
  ]
}
