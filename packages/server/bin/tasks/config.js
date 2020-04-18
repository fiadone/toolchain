const { addConfig } = require('@fiad/cli')

module.exports = function () {
  addConfig('start', '"node app.js"', 'scripts', true)
}
