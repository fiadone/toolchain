const chalk = require('chalk')

const init = require('./init')
const scaffold = require('./scaffold')
const install = require('./install')
const config = require('./config')
const inject = require('./inject')

module.exports = function ({ modules = [] }) {
  process.stdout.write('\n')

  init()
    .then(config)
    .then(scaffold)
    .then(install)
    .then(() => {
      // modules installation pipeline
      return modules.reduce((pipeline, pkg) => {
        return pipeline.then(() => inject(pkg))
      }, Promise.resolve())
    })
    .then(() => {
      process.stdout.write(chalk.green(`\n🎉 All ready! Let's code 🤟\n\n`))
      process.exit(0)
    })
    .catch(null)
}
