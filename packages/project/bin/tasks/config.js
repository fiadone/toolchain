const chalk = require('chalk')
const { config } = require('@fiad/cli')

module.exports = async function () {
  try {
    await config.add('private', true, null, true)
    await config.add('description', 'Project description', null, true)
    await config.add('repository', { type: 'git', url: 'https://github.com/namespace/project.git' }, null, true)
    await config.add('license', 'UNLICENSED', null, true)
    await config.add('test', 'jest --coverage --passWithNoTests', 'scripts', true)
    await config.add('prettify', 'prettier', 'scripts', true)
    await config.add('browserslist', ['defaults'], null, true)
  } catch (err) {
    process.stdout.write(chalk.red(`${err}\n`))
  }
}
