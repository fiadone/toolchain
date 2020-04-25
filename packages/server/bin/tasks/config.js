const fs = require('fs-extra')
const path = require('path')
const { addConfig } = require('@fiad/cli')

module.exports = async function () {
  const bundlerConfig = path.join(process.cwd(), 'bundler.config.js')

  if (fs.existsSync(bundlerConfig)) {
    await addConfig('dev', '"node server.js --env development"', 'scripts', true)
  }

  await addConfig('start', '"node server.js --env production"', 'scripts', true)
}
