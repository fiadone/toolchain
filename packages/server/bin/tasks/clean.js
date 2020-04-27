const fs = require('fs-extra')
const path = require('path')

module.exports = function () {
  return new Promise(resolve => {
    const indexPath = path.join(process.cwd(), 'public/index.html')

    if (fs.existsSync(indexPath)) {
      fs.unlinkSync(indexPath)
    }

    resolve()
  })
}
