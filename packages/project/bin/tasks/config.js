const chalk = require('chalk')
const { config } = require('@fiad/cli')

module.exports = async function () {
  try {
    await config.add('private', true, null, true)
    await config.add('description', 'Project description', null, true)
    await config.add('repository', { type: 'git', url: 'https://github.com/namespace/project.git' }, null, true)
    await config.add('license', 'UNLICENSED', null, true)
    await config.add('test', 'jest --coverage --passWithNoTests', 'scripts', true)
    await config.add('prettify', 'prettier . --write', 'scripts', true)
    await config.add('lint', 'eslint client server --quiet', 'scripts', true)
    await config.add('browserslist', ['defaults'], null, true)
    await config.add('husky', { hooks: { 'pre-commit': 'npm run lint --silent && npm run prettify' } }, null, true)
  } catch (err) {
    process.stdout.write(chalk.red(`${err}\n`))
  }
}
