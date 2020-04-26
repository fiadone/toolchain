const { addConfig } = require('@fiad/cli')

module.exports = async function () {
  await addConfig('build', '"NODE_ENV=production webpack --progress --color"', 'scripts', true)
  await addConfig('dev', '"NODE_ENV=development webpack-dev-server --progress --inline --color --open"', 'scripts', true)
}
