const path = require('path')

module.exports = {
  publicPath: '/public/',
  srcPath: {
    scripts: path.join(__dirname, 'client/scripts'),
    styles: path.join(__dirname, 'client/styles'),
    static: path.join(__dirname, 'client/static')
  },
  distPath: path.join(__dirname, 'public/assets')
}
