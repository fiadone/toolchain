const { addConfig } = require('@fiad/cli')

module.exports = async function () {
  await addConfig('build', '"config=build webpack --progress --color"', 'scripts', true)
  await addConfig('dev', '"config=dev webpack-dev-server --progress --inline --color --open"', 'scripts', true)
}
