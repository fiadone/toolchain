const { spawn } = require('child_process')
const chalk = require('chalk')

const init = require('./init')
const scaffold = require('./scaffold')
const install = require('./install')
const config = require('./config')

module.exports = function ({ modules = [] }) {
  process.stdout.write('\n')

  init()
    .then(scaffold)
    .then(install)
    .then(config)
    .then(() => {
      // modules installation pipeline
      return modules.reduce((pipeline, pkg) => {
        return pipeline.then(() => new Promise(resolve => {
          const cmd = spawn(`npx @fiad/${pkg}`, [], { shell: true, stdio: 'inherit' })
          cmd.on('exit', code => resolve(code === 0))
        }))
      }, Promise.resolve())
    })
    .then(() => {
      process.stdout.write(chalk.green(`\n🎉 All ready! Let's code 🤟\n\n`))
      process.exit(0)
    })    
}
