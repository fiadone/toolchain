const { addConfig } = require('@fiad/cli')

module.exports = async function () {
  await addConfig('dev-client', '"webpack-dev-server --env.development --progress --open"', 'scripts', true)
}