#!/usr/bin/env node

const scaffold = require('./tasks/scaffold')
const config = require('./tasks/config')
const install = require('./tasks/install')

scaffold()
  .then(config)
  .then(install)
  .catch(null)
