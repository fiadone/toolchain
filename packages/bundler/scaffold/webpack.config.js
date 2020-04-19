const config = process.env.config || 'build'

module.exports = require(`./webpack/${config}`)
