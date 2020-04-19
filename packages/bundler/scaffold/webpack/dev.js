const path = require('path')
const webpack = require('webpack')
const base = require('./base')

module.exports = {
  ...base,
  mode: 'development',
  devtool: 'eval',
  watch: true,
  devServer: {
    contentBase: path.resolve(base.output.path, '..'),
    hot: true,
    port: 3000,
    historyApiFallback: true
  },
  module: {
    ...base.module,
    rules: [
      ...base.module.rules,
      {
        test: /\.(s)?css$/,
        loader: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...base.plugins
  ]
}
