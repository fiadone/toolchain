const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { src, distPath, staticPages = {} } = require('../bundler.config')

module.exports = {
  entry: {
    app: path.resolve(src.scriptsPath, 'index.js')
  },
  output: {
    path: distPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    jsonpFunction: 'jsonpFunction'
  },
  module: {
    rules: [
      {
        test: /\.twig$/,
        loader: 'twig-loader',
        options: {
          allowInlineIncludes: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(@fiad)\/).*/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss'],
    alias: {
      '@root': path.resolve(__dirname, '..')
    }
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
  },
  plugins: (
    Object
      .entries(staticPages)
      .map(([filename, { template, data }]) => (
        new HtmlWebpackPlugin({
          filename: `../${filename}.html`,
          minify: false,
          template: template,
          templateParameters: data
        })
      ))
  )
}
