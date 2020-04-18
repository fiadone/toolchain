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

    const cmd = spawn('npx @fiad/cli scaffold', args, { shell: true, stdio: 'inherit' })
    cmd.on('exit', code => resolve(code === 0))
  })
}

/**
 * Adds/overrides a package.json configuration property
 * @param {string} key The key of the package.json property to be added/overwritten
 * @param {string} value The value of the package.json property to be added
 * @param {string} context The parent property group key
 * @param {boolean} force Override flag
 */
function addConfig(key, value, context, force) {
  return new Promise((resolve, reject) => {
    if (!key || typeof value === 'undefined') {
      reject()
    }

    const args = [`--add ${key}`, `--value ${value}`]

    if (context) {
      args.push(`--context ${context}`)
    }

    if (force) {
      args.push('--force')
    }

    const cmd = spawn('npx @fiad/cli config', args, { shell: true, stdio: 'inherit' })
    cmd.on('exit', code => resolve(code === 0))
  })
}

/**
 * Removes a package.json configuration property
 * @param {string} key The key of the package.json property to be removed
 * @param {string} context The parent property group key
 */
function removeConfig(key, context) {
  return new Promise((resolve, reject) => {
    if (!key) {
      reject()
    }

    const args = [`--remove ${key}`]

    if (context) {
      args.push(`--context ${context}`)
    }

    const cmd = spawn('npx @fiad/cli config', args, { shell: true, stdio: 'inherit' })
    cmd.on('exit', code => resolve(code === 0))
  })
}

module.exports = { install, scaffold, addConfig, removeConfig }