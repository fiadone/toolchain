#!/usr/bin/env node

const fs = require('fs-extra')
const { fork } = require('child_process')
const minimist = require('minimist')
const chalk = require('chalk')

const { _: [cmd] } = minimist(process.argv.slice(2))
const commandPath = `${__dirname}/commands/${cmd}/index.js`

if (!fs.existsSync(commandPath)) {
  process.stdout.write(chalk.red('Unknown command.\n'))
  process.exit(0)
}

fork(commandPath, process.argv.slice(3))
