const { spawn } = require('child_process')

/**
 * Handles dependencies installation
 * @param {object} manifest The dependencies list
 * @param {string} context The process context
 */
function install(manifest, context) {
  return new Promise((resolve, reject) => {
    if (!manifest) {
      reject()
    }

    const args = [`--manifest ${manifest}`]

    if (context) {
      args.push(`--context ${context}`)
    }

    const cmd = spawn('npx @fiad/cli install', args, { shell: true, stdio: 'inherit' })
    cmd.on('exit', code => resolve(code === 0))
  })
}

/**
 * Handles scaffold files copying
 * @param {string} source The source files path
 * @param {string} destination The destination path
 * @param {string} context The process context
 */
function scaffold(source, destination, context) {
  return new Promise((resolve, reject) => {
    if (!source) {
      reject()
    }

    const args = [`--src ${source}`]

    if (destination) {
      args.push(`--dest ${destination}`)
    }

    if (context) {
      args.push(`--context ${context}`)
    }

    const cmd = spawn('npx @fiad/cli clone', args, { shell: true, stdio: 'inherit' })
    cmd.on('exit', code => resolve(code === 0))
  })
}

module.exports = { install, scaffold }