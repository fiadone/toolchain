const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../../webpack.config.js')

module.exports = function (port) {
  if (!config) {
    return (req, res, next) => next('Missing basic webpack configuration.')
  }

  const compiler = webpack({
    ...config,
    entry: {
      ...config.entry,
      app: [
        'webpack-hot-middleware/client?reload=true&timeout=1000',
        config.entry.app
      ]
    },
    devServer: {
      ...config.devServer,
      port
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false
    }
  })

  return [
    webpackDevMiddleware(compiler),
    webpackHotMiddleware(compiler)
  ]
}
