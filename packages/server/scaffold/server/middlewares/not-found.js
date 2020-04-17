const createError = require('http-error')

module.exports = function (req, res, next) {
  next(createError(404))
}