const { spawn } = require('child_process')

module.exports = function (pkg) {
  return new Promise(resolve => {
    const cmd = spawn(`npx @fiad/${pkg}`, null, { shell: true, stdio: 'inherit' })
    cmd.on('exit', code => resolve(code === 0))
  })
}