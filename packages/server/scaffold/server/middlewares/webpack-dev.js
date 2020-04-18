const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('../../webpack/dev-server')

module.exports = webpackDevMiddleware(webpack(config))
