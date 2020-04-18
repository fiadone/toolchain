const path = require('path')

module.exports = {
  paths: {
    srcFolder: path.join(__dirname, 'client/scripts'),
    staticFolder: path.join(__dirname, 'client/static'),
    distFolder: path.join(__dirname, 'public/assets'),
    public: '/public/'
  }
}
