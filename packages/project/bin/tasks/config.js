const { addConfig } = require('@fiad/cli')

module.exports = async function () {
  await addConfig('test', 'jest', 'scripts', true)
  await addConfig('prettify', 'prettier', 'scripts', true)
  await addConfig('browserslist', '["defaults"]')
}
