const path = require('path')
const config = require('../bundler.config')

module.exports = {
  entry: {
    app: path.resolve(config.srcPath.scripts, 'index.js')
  },
  output: {
    path: config.distPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
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
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]((?!(@fiad)).*)[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
