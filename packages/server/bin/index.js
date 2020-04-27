#!/usr/bin/env node

const clean = require('./tasks/clean')
const scaffold = require('./tasks/scaffold')
const install = require('./tasks/install')
const config = require('./tasks/config')

clean()
  .then(scaffold)
  .then(install)
  .then(config)
