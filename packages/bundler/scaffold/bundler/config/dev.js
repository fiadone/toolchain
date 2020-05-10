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
    writeToDisk: true,
    host: 'localhost',
    port: 3000,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...base.plugins
  ]
}
