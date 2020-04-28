const path = require('path')
const { spawn } = require('child_process')

module.exports = function () {
  return new Promise(resolve => {
    const child = spawn(`npx @fiad/cli wizard`, [`--config ${path.resolve(__dirname, '../config/wizard.js')}`], { shell: true, stdio: 'inherit' })
    child.once('exit', resolve)
  })
}
