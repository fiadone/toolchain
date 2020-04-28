const { install } = require('@fiad/cli')

module.exports = function () {
  const manifest = require('../config/dependencies.json')
  return install(manifest, 'server')
}
