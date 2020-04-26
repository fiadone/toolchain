const fs = require('fs-extra')
const path = require('path')
const { addConfig } = require('@fiad/cli')

module.exports = async function () {
  const bundlerConfig = path.join(process.cwd(), 'bundler.config.js')

  if (fs.existsSync(bundlerConfig)) {
    await addConfig('dev', '"NODE_ENV=development node server.js"', 'scripts', true)
  }

  await addConfig('start', '"NODE_ENV=production node server.js"', 'scripts', true)
}
