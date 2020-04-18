const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const base = require('./base')

module.exports = {
  ...base,
  mode: 'production',
  module: {
    ...base.module,
    rules: [
      ...base.module.rules,
      {
        test: /\.(s)?css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  optimization: {
    ...base.optimization,
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    ...base.plugins,
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ]
}
