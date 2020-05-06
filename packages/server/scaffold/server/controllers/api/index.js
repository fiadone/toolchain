const { Router } = require('express')
const cors = require('cors')
const registerRoutes = require('./routes')

const router = Router()

router.use(cors())
registerRoutes(router)

module.exports = function () {
  return router
}
