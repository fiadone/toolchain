const config = process.env.NODE_ENV === 'development' ? 'dev' : 'build'

module.exports = require(`./bundler/config/${config}`)
