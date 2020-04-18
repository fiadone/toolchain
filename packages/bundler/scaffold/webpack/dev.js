const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./base')

module.exports = {
  ...base,
  mode: 'development',
  devtool: 'eval',
  watch: true,
  devServer: {
    contentBase: base.output.publicPath,
    hot: true,
    port: 4000,
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
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(base.output.publicPath, 'index.html')
    })
  ]
}
