const path = require('path')
const { scaffold } = require('@fiad/cli')

module.exports = function () {
  const files = path.resolve(__dirname, '../../scaffold')
  return scaffold(files, './', 'main')
}
