module.exports = function (req, res) {
  res.render('templates/homepage.twig', {
    body_class: 'homepage',
    title: 'Homepage'
  })
}
