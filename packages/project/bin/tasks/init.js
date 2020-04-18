const fs = require('fs-extra')
const { spawn } = require('child_process')
const chalk = require('chalk')

module.exports = function () {
  return new Promise(resolve => {
    process.stdout.write(chalk.blue('Initializing project... '))

    if (fs.existsSync(`${process.cwd()}/package.json`)) {
      process.stdout.write(chalk.green('✔\n'))
      resolve()
      return
    }

    const cmd = spawn('npm init', ['-y'], { shell: true })
    cmd.on('exit', () => {
      process.stdout.write(chalk.green('✔\n'))
      resolve()
    })
  })
}
