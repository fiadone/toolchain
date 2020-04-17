const asyncRequest = require('../helpers/async')

const { CMS_URL, CMS_REST_PATH } = process.env

async function globals (req, res, next) {
  const { data } = await asyncRequest({
    method: 'GET',
    url: `${CMS_URL + CMS_REST_PATH}/globals`
  })

  res.locals.globals = data

  next()
}

async function page (req, res, next) {
  const { data: { template, data } } = await asyncRequest({
    method: 'GET',
    url: CMS_URL + req.originalUrl
  })

  res.locals.template = template
  res.locals.data = data

  next()
}

module.exports = [globals, page]