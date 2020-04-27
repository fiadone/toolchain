const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Returns a list of HtmlWebpackPlugin instances aimed to generate static pages from twig templates
 * @param {Array} config The static pages configuration object
 * @returns {Array}
 */
function generateStaticPages(config) {
  if (!config || typeof config !== 'object') return []

  const staticPages = Object.entries(config)

  return staticPages.map(([name, { template, mock }]) => {
    return new HtmlWebpackPlugin({
      template: template,
      templateParameters: compilation => {
        compilation.fileDependencies.add(mock)
        delete require.cache[require.resolve(mock)]
        return require(mock)
      },
      filename: `../${name}.html`,
      inject: false
    })
  })
}

module.exports = {
  generateStaticPages
}
