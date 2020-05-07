const TerserPlugin = require('terser-webpack-plugin')
const base = require('./base')

module.exports = {
  ...base,
  optimization: {
    ...base.optimization,
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
