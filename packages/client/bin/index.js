#!/usr/bin/env node

const { spawnSync } = require('child_process')

const scaffold = require('./tasks/scaffold')
const install = require('./tasks/install')
const config = require('./tasjs/config')

scaffold()
  .then(install)
  .then(config)
  .then(() => spawnSync('npx @fiad/bundler', null, { shell: true, stdio: 'inherit' }))
