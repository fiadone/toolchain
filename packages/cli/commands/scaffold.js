const fs = require('fs-extra')
const chalk = require('chalk')
const { suspense } = require('@fiad/cli/utils')

/**
 * Handles scaffold files copying
 * @param {string} src
 * @param {string} dest
 * @param {string} context
 * @returns {Promise}
 */
function scaffold(src, dest = './', context) {
  if (!src || !fs.pathExistsSync(src)) {
    Promise.reject(`Attempt to copy${context ? ` ${context}` : ''} scaffold files failed. Missing or invalid source path.`)
  }

  return new Promise((resolve, reject) => {
    const complete = suspense(`Copying${context ? ` ${chalk.cyan(context)}` : ''} scaffold files`, { color: 'blue' })

    fs.copy(src, dest)
      .then(() => {
        complete(true)
        resolve()
      })
      .catch(err => {
        complete(false)
        reject(err)
      })
  })
}

module.exports = scaffold
