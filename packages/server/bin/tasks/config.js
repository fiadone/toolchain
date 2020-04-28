const chalk = require('chalk')
const { config } = require('@fiad/cli')

module.exports = async function () {
  try {
    await config.add('dev', '"NODE_ENV=development nodemon server.js"', 'scripts', true)
    await config.add('start', '"NODE_ENV=production node server.js"', 'scripts', true)
  } catch (err) {
    process.stdout.write(chalk.red(`${err}\n`))
  }
}
