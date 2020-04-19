// const wordpress = require('../../middlewares/wordpress-proxy')

module.exports = function (router) {
  router.get('/', require('./homepage'))
  // You can also use wordpress middleware to proxy wordpress routing:
  // router.use(wordpress)
  // router.get('*', (req, res) => {
  //   const { page, globals } = res.locals
  //
  //   res.render(`templates/${page.template}.twig`, { globals, page: page.data })
  // })
}
