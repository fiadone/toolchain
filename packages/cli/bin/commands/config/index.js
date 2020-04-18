#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const minimist = require('minimist')
const chalk = require('chalk')

const { add, remove, value, context, force } = minimist(process.argv.slice(2))

if (!add && !remove) {
  process.stdout.write(chalk.red(`No property to manage. Please pass one through the --add or --remove params.\n`))
  process.exit(0) 
}

const packageJsonPath = path.join(process.cwd(), 'package.json')
const packageJson = fs.existsSync(packageJsonPath) ? require(packageJsonPath) : {}
const key = add || remove

if (add && typeof value === 'undefined') {
  process.stdout.write(chalk.red(`Attempt to add "${key}" property failed. Missing value.\n`))
  process.exit(0) 
}

if (context && typeof packageJson[context] === 'undefined') {
  packageJson[context] = {}
}

if (add && !force) {
  if (context && typeof packageJson[context][key] !== 'undefined') {
    process.stdout.write(chalk.red(`Attempt to add "${key}" property failed. A "${key}" property already exists in "${context}".\n`))
    process.exit(0) 
  } else if (!context && typeof packageJson[key] !== 'undefined') {
    process.stdout.write(chalk.red(`Attempt to add "${key}" property failed. A "${key}" property already exists.\n`))
    process.exit(0) 
  }
}

if (add) {
  if (context) {
    packageJson[context][key] = value
  } else {
    packageJson[key] = value
  }
}

if (remove) {
  if (context) {
    delete packageJson[context][remove]
  } else {
    delete packageJson[remove]
  }
}

process.stdout.write(chalk.blue('Updating package.json... '))

fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), err => {
  const result = err ? chalk.red('✘\n') : chalk.green('✔\n')
  process.stdout.write(result)
})
  