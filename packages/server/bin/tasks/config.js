const { addConfig } = require('@fiad/cli')

module.exports = async function () {
  await addConfig('start-dev', '"node app.js"', 'scripts', true)
  await addConfig('start', '"NODE_ENV=production node app.js"', 'scripts', true)
}
