#!/usr/bin/env node

const fs = require('fs-extra')
const minimist = require('minimist')

const configure = require('./tasks/configure')

const { _: [dir = ''] } = minimist(process.argv.slice(2))
const cwd = `${process.cwd()}/${dir.replace(/^(\.\/|\/)/, '')}`

fs.ensureDir(cwd, () => {
  process.chdir(cwd)
  configure()
})
