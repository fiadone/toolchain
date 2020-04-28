const { spawn } = require('child_process')
const chalk = require('chalk')
const { suspense } = require('@fiad/cli/utils')

/**
 * Install handler
 * @param {string} baseCmd
 * @param {Array} packages
 */
function install(baseCmd, packages = []) {
  if (!Array.isArray(packages) || !packages.length) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const logs = []
    const child = spawn(`${baseCmd} --no-progress ${packages.join(' ')}`, {
      shell: true,
      stdio: ['ignore', 'ignore', 'pipe']
    })

    child.stderr.on('data', data => logs.push(data.toString()))
    child.on('error', () => reject(logs.join('')))
    child.once('exit', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(logs.join(''))
      }
    })
  })
}

/**
 * Handles dependencies installation
 * @param {object} manifest
 * @param {string} context
 * @param {boolean} yarn
 */
function installAll({ dependencies, devDependencies } = {}, context, yarn) {
  const installCmd = yarn ? 'yarn add' : 'npm i'

  return new Promise(resolve => {
    const complete = suspense(`Installing${context ? ` ${chalk.cyan(context)}` : ''} dependencies`, { color: 'blue' })

    Promise
      .allSettled([
        install(installCmd, dependencies),
        install(`${installCmd} -D`, devDependencies)
      ])
      .then(results => {
        const errors = results.reduce((acc, result) => {
          if (result.status === 'rejected') acc.push(result.reason)
          return acc
        }, [])

        if (errors.length) {
          complete(false)
          process.stdout.write(chalk.grey(errors.join('\n')))
        } else {
          complete(true)
        }

        resolve()
      })
  })
}

module.exports = installAll
