#!/usr/bin/env node

const fs = require('fs-extra')
const minimist = require('minimist')
const chalk = require('chalk')
const install = require('./install')

const { manifest, context, yarn } = minimist(process.argv.slice(2))
const dependenciesString = context ? `${chalk.cyan(context)} dependencies` : 'dependencies'

if (!manifest || !fs.existsSync(manifest)) {
  process.stdout.write(chalk.red(`Attempt to install ${dependenciesString} failed. Dependencies manifest not found.\n`))
  process.exit(0)
}

const { dependencies = [], devDependencies = [] } = require(manifest)

if (!dependencies.length && !devDependencies.length) {
  process.exit(0)
}

(async () => {
  process.stdout.write(chalk.blue(`Installing ${dependenciesString}... `))

  if (dependencies.length) {
    await install(dependencies.join(' '), '', yarn)
  }

  if (devDependencies.length) {
    await install(devDependencies.join(' '), '-D', yarn)
  }

  process.stdout.write(chalk.green(`✔\n`))
  process.exit(0)
})()
