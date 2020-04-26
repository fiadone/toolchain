const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

function getConfig(port) {
  let config

  try {
    config = require('../../bundler/config/dev')
  } catch (err) {
    return null
  }

  return {
    ...config,
    entry: {
      ...config.entry,
      app: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client?reload=true&timeout=1000',
        config.entry.app
      ]
    },
    output: {
      ...config.output,
      publicPath: '/'
    },
    target: 'web',
    devServer: {
      ...config.devServer,
      port
    }
  }
}

module.exports = function (port) {
  const config = getConfig(port)

  if (!config) {
    return (req, res, next) => next('Missing basic webpack configuration.')
  }

  const compiler = webpack(config)

  return [
    webpackDevMiddleware(compiler, {
      publicPath: '/assets/',
      stats: { colors: true }
    }),
    webpackHotMiddleware(compiler, { log: console.log })
  ]
}
