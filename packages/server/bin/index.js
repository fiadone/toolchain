#!/usr/bin/env node

const scaffold = require('./tasks/scaffold')
const install = require('./tasks/install')

scaffold().then(install)
