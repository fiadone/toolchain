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
        const data = Array.isArray(mock) ? mock : [mock]
        return data.reduce((acc, entry) => {
          compilation.fileDependencies.add(entry)
          delete require.cache[require.resolve(entry)]
          return { ...acc, ...require(entry) }
        }, {})
      },
      filename: `../${name}.html`,
      inject: false
    })
  })
}

module.exports = {
  generateStaticPages
}
