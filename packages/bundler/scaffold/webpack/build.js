const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const base = require('./base')

module.exports = {
  ...base,
  mode: 'production',
  optimization: {
    ...base.optimization,
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...base.plugins
  ]
}
