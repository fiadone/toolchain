const { addConfig } = require('@fiad/cli')

module.exports = async function () {
  await addConfig('build', '"webpack --env.production --progress"', 'scripts', true)
}
