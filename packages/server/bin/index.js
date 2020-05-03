#!/usr/bin/env node

const clean = require('./tasks/clean')
const config = require('./tasks/config')
const scaffold = require('./tasks/scaffold')
const install = require('./tasks/install')

clean()
  .then(config)
  .then(scaffold)
  .then(install)
  .catch(null)
