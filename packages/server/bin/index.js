#!/usr/bin/env node

const clean = require('./tasks/clean')
const scaffold = require('./tasks/scaffold')
const install = require('./tasks/install')
const config = require('./tasks/config')

clean()
  .then(config)
  .then(scaffold)
  .then(install)
  .catch(null)
