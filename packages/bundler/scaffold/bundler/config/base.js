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
  devtool: 'source-map',
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
        loader: 'twig-loader'
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg|jpg|png)$/,
        loader: 'file-loader',
        include: [path.join(src.staticPath, 'fonts'), path.join(src.staticPath, 'images')],
        options: {
          name: filename => filename.replace(`${src.staticPath}/`, ''),
          esModule: false
        }
      },
      {
        test: /\.(s)?css$/,
        loader: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: process.env.config !== 'build' }
          },
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          'sass-loader'
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
      '@root': path.resolve(__dirname, '../../'),
      '@styles': src.stylesPath,
      '@scripts': src.scriptsPath,
      '@static': src.staticPath
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]((?!(@fiad)).*)[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: src.staticPath,
          to: distPath,
          globOptions: {
            ignore: ['.DS_Store', '.gitkeep']
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    ...generateStaticPages(staticPages)
  ]
}
