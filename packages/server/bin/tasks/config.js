const fs = require('fs-extra')
const path = require('path')
const { addConfig } = require('@fiad/cli')

module.exports = async function () {
  await addConfig('dev', '"NODE_ENV=development nodemon server.js"', 'scripts', true)
  await addConfig('start', '"NODE_ENV=production node server.js"', 'scripts', true)
}
