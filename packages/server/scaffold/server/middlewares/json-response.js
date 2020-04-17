module.exports = function (req, res) {
  res.json(res.locals || {})
}