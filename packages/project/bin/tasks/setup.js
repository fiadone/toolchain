const chalk = require('chalk')

const init = require('./init')
const config = require('./config')
const scaffold = require('./scaffold')
const ignore = require('./ignore')
const install = require('./install')
const inject = require('./inject')

module.exports = function ({ modules = [] }) {
  process.stdout.write('\n')

  init()
    .then(config)
    .then(scaffold)
    .then(ignore)
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
