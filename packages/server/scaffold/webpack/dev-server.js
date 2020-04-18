const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')
const base = require('./base')

module.exports = {
  ...base,
  mode: 'development',
  devtool: 'eval',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [
    webpackNodeExternals()
  ],
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
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin()
  ]
}
