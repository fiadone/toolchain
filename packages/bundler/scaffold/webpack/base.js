const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const config = require('../bundler.config')

module.exports = {
  entry: path.resolve(config.paths.srcFolder, 'index.js'),
  output: {
    path: config.paths.distFolder,
    filename: 'bundle.js',
    jsonpFunction: 'jsonpFunction'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules\/(?!(@fiad)\/).*/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss']
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]((?!(@fiad)).*)[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: config.paths.staticFolder,
        to: config.paths.distFolder
      }
    ])
  ]
}
