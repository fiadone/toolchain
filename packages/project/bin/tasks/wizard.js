const path = require('path')
const { spawn } = require('child_process')

const args = [
  '--heading @fiad',
  '--headingColor yellow',
  '--info "Welcome to @fiad/project setup wizard and thanks for using it! 🍻\nCheck out the package page at https://git.io/Jftn0 to learn more about available modules."',
  '--infoColor blue',
  `--questions ${path.resolve(__dirname, '../config/questions.js')}`,
  `--handler ${path.resolve(__dirname, 'setup.js')}`
]

module.exports = function () {
  return new Promise(resolve => {
    const cmd = spawn(`npx @fiad/cli wizard`, args, { shell: true, stdio: 'inherit' })
    cmd.on('exit', code => resolve(code === 0))
  })
}
