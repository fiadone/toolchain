const path = require('path')
const fs = require('fs-extra')

/**
 * Updates package.json file
 * @param {object} data
 * @param {string} filepath
 * @returns {Promise}
 */
function update(data, filepath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, JSON.stringify(data, null, 2), err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Adds a property to package.json
 * @param {string} property
 * @param {any} value
 * @param {string} context
 * @param {boolean} force
 * @returns {Promise}
 */
function add(property, value, context = null, force = false) {
  if (!property || typeof value === 'undefined') return

  const configPath = path.join(process.cwd(), 'package.json')
  const config = fs.existsSync(configPath) ? require(configPath) : {}

  if (context) {
    if (typeof config[context] === 'undefined') {
      config[context] = {}
    } else if (!force && config[context][property] !== 'undefined') {
      return
    }

    try {
      config[context][property] = JSON.parse(value)
    } catch (err) {
      config[context][property] = value
    }
  } else {
    if (!force && config[property] !== 'undefined') return

    try {
      config[property] = JSON.parse(value)
    } catch (err) {
      config[property] = value
    }
  }

  return update(config, configPath)
}

/**
 * Removes a property from package.json
 * @param {string} property
 * @param {string} context
 * @returns {Promise}
 */
function remove(property, context) {
  if (!property) return

  const configPath = path.join(process.cwd(), 'package.json')

  if (!fs.existsSync(configPath)) return

  const config = require(configPath)

  if (context) {
    delete config[context][property]
  } else {
    delete config[property]
  }

  return update(config, configPath)
}

module.exports = { add, remove }
