#!/usr/bin/env node

const scaffold = require('./tasks/scaffold')
const install = require('./tasks/install')
const config = require('./tasks/config')

scaffold()
  .then(config)
  .then(install)
  .catch(null)
