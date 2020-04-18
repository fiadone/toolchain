const { spawn } = require('child_process')
const chalk = require('chalk')

const init = require('./init')
const scaffold = require('./scaffold')

module.exports = function ({ modules = [] }) {
  process.stdout.write('\n')
  modules
    .reduce((pipeline, pkg) => (
      pipeline.then(() => new Promise(resolve => {
        const cmd = spawn(`npx @fiad/${pkg}`, [], { shell: true, stdio: 'inherit' })
        cmd.on('exit', code => resolve(code === 0))
      })
    )), init().then(scaffold))
    .then(() => {
      process.stdout.write(chalk.green(`\n🎉 All ready! Let's code 🤟\n\n`))
      process.exit(0)
    })
}
