const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { src, distPath, staticPages } = require('../../bundler.config')
const { generateStaticPages } = require('../helpers')

module.exports = {
  entry: {
    app: path.resolve(src.scriptsPath, 'index.js')
  },
  mode: process.env.NODE_ENV,
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: process.env.config !== 'build' }
          },
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
      '@root': path.resolve(__dirname, '../../')
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
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new CopyPlugin([{
      from: src.staticPath,
      to: distPath,
      ignore: ['.DS_Store', '.gitkeep']
    }]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    ...generateStaticPages(staticPages)
  ]
}
