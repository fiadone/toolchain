const fs = require('fs-extra')
const { spawn } = require('child_process')
const { suspense } = require('@fiad/cli/utils')

module.exports = function () {
  return new Promise(resolve => {
    const message = 'Initializing project'
    const complete = suspense(message, { color: 'blue' })

    if (fs.existsSync(`${process.cwd()}/package.json`)) {
      complete(true)
      resolve()
      return
    }

    const child = spawn('npm init', ['-y'], { shell: true })
    child.once('exit', () => {
      complete(true)
      resolve()
    })
  })
}
