#!/usr/bin/env node

const fs = require('fs-extra')
const minimist = require('minimist')
const chalk = require('chalk')
const install = require('../commands/install')

const { manifest, context, yarn } = minimist(process.argv.slice(2))

if (!manifest || !fs.existsSync(manifest)) {
  process.stdout.write(chalk.red(`Attempt to install ${context ? chalk.cyan(context) : ''} dependencies failed. Dependencies manifest not found.\n`))
  process.exit(0)
}

install(manifest, context, yarn).catch(() => process.stdout.write(chalk.red('Dependencies installation failed.\n')))
