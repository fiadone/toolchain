#!/usr/bin/env node

const fs = require('fs-extra')
const minimist = require('minimist')
const chalk = require('chalk')

const { src, dest = './', context } = minimist(process.argv.slice(2))
const scaffoldString = context ? `${chalk.cyan(context)} scaffold` : 'scaffold'

if (!src || !fs.pathExistsSync(src)) {
  process.stdout.write(chalk.red(`Attempt to copy ${scaffoldString} files failed. Missing source path.\n`))
  process.exit(0)
}

process.stdout.write(chalk.blue(`Copying ${scaffoldString} files... `))

fs
  .copy(src, dest, { overwrite: false })
  .then(() => process.stdout.write(chalk.green('✔\n')))
  .catch((err) => {
    process.stdout.write(chalk.red('✘\n'))
    process.stdout.write(chalk.red(`${err}\n`))
  })
  