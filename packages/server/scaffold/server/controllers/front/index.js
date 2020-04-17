const path = require('path')
const { Router } = require('express')
const registerRoutes = require('./routes')
const rendering = require('../../middlewares/view-rendering')

const router = Router()

router.set('view engine', 'twig')
router.set('views', path.join(__dirname, '../../../templates'))

registerRoutes(router)

router.use(rendering)

module.exports = router
