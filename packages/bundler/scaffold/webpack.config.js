module.exports = process.env.production ? require('./webpack/build') : require('./webpack/dev')
