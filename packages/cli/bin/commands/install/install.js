const { spawn } = require('child_process')

module.exports = function install(packages, flags = '', yarn) {
  const baseCmd = yarn ? 'yarn add' : 'npm i'

  return new Promise(resolve => {
    const cmd = spawn(`${baseCmd} ${flags} ${packages}`, { shell: true })
    cmd.on('exit', code => resolve(code === 0))
  })
}
