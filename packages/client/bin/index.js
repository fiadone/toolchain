#!/usr/bin/env node

const { spawnSync } = require('child_process')

const scaffold = require('./tasks/scaffold')
const install = require('./tasks/install')

scaffold()
  .then(install)
  .then(() => spawnSync('npx @fiad/bundler', null, { shell: true, stdio: 'inherit' }))
