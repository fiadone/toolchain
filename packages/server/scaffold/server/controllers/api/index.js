const { Router } = require('express')
const registerRoutes = require('./routes')
const json = require('../../middlewares/json-response')

const router = Router()

registerRoutes(router)

router.use(json)

module.exports = router
