module.exports = function (req, res) {
  const { template = '404', data = {} } = res.locals
  res.render(template, data)
}