#!/usr/bin/env node

const fs = require('fs-extra')
const readline = require('readline')
const minimist = require('minimist')
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')

const { config } = minimist(process.argv.slice(2))
const baseErrorString = 'Attempt to start wizard failed.'

if (!config || !fs.existsSync(config)) {
  process.stdout.write(chalk.red(`${baseErrorString} Missing config.\n`))
  process.exit(0)
}

const { header, headerColor, description, descriptionColor, questions = [], handler } = require(config)

if (!handler || typeof handler !== 'function') {
  process.stdout.write(chalk.red(`${baseErrorString} The handler module should export a function.\n`))
  process.exit(0)
}

readline.clearScreenDown(process.stdout, () => {
  // printing header
  if (header) {
    const headerStyle = chalk[headerColor] || chalk.white
    process.stdout.write(headerStyle(`\n\n${figlet.textSync(header, { horizontalLayout: 'full' })}\n\n`))
  }
  // printing description
  if (description) {
    const descriptionStyle = chalk[descriptionColor] || chalk.white
    process.stdout.write(descriptionStyle(`\n${description}\n\n`))
    process.stdout.write('--------\n\n')
  }
  // launching wizard
  inquirer
    .prompt(questions)
    .then(handler)
    .catch(err => process.stdout.write(chalk.red(err)))
})
