const readline = require('readline')
const chalk = require('chalk')

/**
 * Appends animated suspension points at the end of the given string
 * @param {string} string
 * @param {object} options
 * @returns {Number}
 */
function suspense(string, { interval = 250, color, newline = true } = {}) {
  const styled = (color && chalk[color]) ? chalk[color] : chalk.white
  const spinner = ['⌛️', '⏳']
  let frame = 0

  const loop = setInterval(() => {
    readline.clearLine(process.stdout)
    readline.cursorTo(process.stdout, 0)
    process.stdout.write(styled(`${[spinner[frame]]} ${string}... `))
    frame = (frame + 1) % 2
  }, interval)

  return success => {
    clearInterval(loop)
    const result = success ? chalk.green('✔') : chalk.red('✘')
    readline.clearLine(process.stdout)
    readline.cursorTo(process.stdout, 0)
    process.stdout.write(styled(`${result} ${string}${newline ? '\n' : ''}`))
  }
}

module.exports = {
  suspense
}
