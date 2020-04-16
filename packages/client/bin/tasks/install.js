const path = require('path')
const { install } = require('@fiad/cli')

module.exports = function() {
  const manifest = path.resolve(__dirname, '../config/dependencies.json')
  return install(manifest, 'client')
}
