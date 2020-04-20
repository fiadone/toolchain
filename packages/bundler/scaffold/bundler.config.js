const path = require('path')

module.exports = {
  publicPath: '/public/',
  src: {
    scriptsPath: path.join(__dirname, 'client/scripts'),
    stylesPath: path.join(__dirname, 'client/styles'),
    staticPath: path.join(__dirname, 'client/static')
  },
  distPath: path.join(__dirname, 'public/assets'),
  /*=====================================================================*/
  /* Uncomment the following code to enable static html pages generation */
  /*=====================================================================*/
  // staticPages: {
  //   index: {
  //     template: path.join(__dirname, 'views/templates/homepage.twig'),
  //     data: () => require(path.join(__dirname, 'mock/homepage'))
  //   }
  // }
}
