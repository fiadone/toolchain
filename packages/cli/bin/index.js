#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const { fork } = require('child_process')
const minimist = require('minimist')
const chalk = require('chalk')

const { _: [cmd] } = minimist(process.argv.slice(2))
const commandPath = path.join(__dirname, `${cmd}.js`)

if (!fs.existsSync(commandPath)) {
  process.stdout.write(chalk.red('Unknown command.\n'))
  process.exit(0)
}

fork(commandPath, process.argv.slice(3))
