const fs = require('fs-extra')

const ignore = [
  '.DS_Store',
  '.env',
  'node_modules',
  'coverage'
]

module.exports = function () {
  return new Promise(resolve => {
    fs.writeFile('.gitignore', ignore.join('\r\n'), resolve)
  })
}
