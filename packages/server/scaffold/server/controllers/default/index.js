const { Router } = require('express')
const registerRoutes = require('./routes')

const router = Router()

registerRoutes(router)

module.exports = function () {
  return router
}
