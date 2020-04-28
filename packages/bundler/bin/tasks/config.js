const chalk = require('chalk')
const { config } = require('@fiad/cli')

module.exports = async function () {
  try {
    await config.add('dev', '"NODE_ENV=development webpack-dev-server --progress --inline --color --open"', 'scripts', true)
    await config.add('build', '"NODE_ENV=production webpack --progress --color"', 'scripts', true)
  } catch (err) {
    process.stdout.write(chalk.red(`${err}\n`))
  }
}
