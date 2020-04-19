#!/usr/bin/env node

const inject = require('./tasks/inject')
const scaffold = require('./tasks/scaffold')
const install = require('./tasks/install')

inject('bundler')
  .then(scaffold)
  .then(install)
