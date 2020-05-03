const { spawn } = require('child_process')

module.exports = function (pkg) {
  return new Promise(resolve => {
    const child = spawn(`npx --ignore-existing @fiad/${pkg}`, null, { shell: true, stdio: ['inherit', 'inherit', 'pipe'] })
    child.once('exit', resolve)
  })
}
