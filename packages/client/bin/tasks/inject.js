const { spawn } = require('child_process')

module.exports = function (pkg) {
  return new Promise(resolve => {
    const child = spawn(`npx @fiad/${pkg}`, null, { shell: true, stdio: 'inherit' })
    child.once('exit', resolve)
  })
}
