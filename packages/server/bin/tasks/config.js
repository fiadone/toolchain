const { addConfig } = require('@fiad/cli')

module.exports = async function () {
  await addConfig('dev', '"node server.js --env development"', 'scripts', true)
  await addConfig('start', '"node server.js --env production"', 'scripts', true)
}
