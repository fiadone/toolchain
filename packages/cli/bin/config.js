#!/usr/bin/env node

const minimist = require('minimist')
const config = require('../commands/config')

const { add, remove, value, context, force } = minimist(process.argv.slice(2))

if (!add && !remove) {
  process.stdout.write(chalk.red(`No property to manage. Please pass one through the --add or --remove params.\n`))
  process.exit(0)
}

if (add) {
  if (typeof value === 'undefined') {
    process.stdout.write(chalk.red(`Missing value. Please pass it through the --value param.\n`))
    process.exit(0)
  }

  config.add(add, value, context, force).catch(err => process.stdout.write(chalk.red(`${err}\n`)))
}

if (remove) {
  config.remove(remove, context).catch(err => process.stdout.write(chalk.red(`${err}\n`)))
}
