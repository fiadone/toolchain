const path = require('path')
const { spawn } = require('child_process')

const args = [
  '--heading @fiad',
  '--color yellow',
  `--questions ${path.resolve(__dirname, '../config/questions.js')}`,
  `--handler ${path.resolve(__dirname, 'setup.js')}`
]

module.exports = function configure() {
  return new Promise(resolve => {
    const cmd = spawn(`npx @fiad/cli wizard`, args, { shell: true, stdio: 'inherit' })
    cmd.on('exit', code => resolve(code === 0))
  })
}
