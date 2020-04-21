const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
        options: { allowInlineIncludes: true }
      },
      {
        test: /\.(s)?css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: process.env.config !== 'build' }
          }
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
  plugins: [
    new CopyPlugin([{
      from: src.staticPath,
      to: distPath
    }]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    ...Object
      .entries(staticPages)
      .map(([filename, { template, mock }]) => (
        new HtmlWebpackPlugin({
          template: template,
          templateParameters: compilation => {
            compilation.fileDependencies.add(mock)
            delete require.cache[require.resolve(mock)]
            return require(mock)
          },
          filename: `../${filename}.html`,
          inject: false
        })
      ))
  ]
}
