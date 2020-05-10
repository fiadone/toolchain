const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'index.js')
  },
  mode: 'development',
  output: {
    path: path.join(__dirname, '.dev'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    jsonpFunction: 'jsonpFunction'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: true }
          },
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(@fiad)\/).*/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.css']
  },
  devtool: 'eval',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    host: 'localhost',
    port: 4935,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ]
}
