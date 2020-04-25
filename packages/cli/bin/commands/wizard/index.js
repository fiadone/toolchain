#!/usr/bin/env node

const fs = require('fs-extra')
const minimist = require('minimist')
const clear = require('clear')
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')

const { heading, headingColor, info, infoColor, questions, handler } = minimist(process.argv.slice(2))
const baseErrorString = 'Attempt to start wizard failed.'

if (!questions || !fs.existsSync(questions)) {
  process.stdout.write(chalk.red(`${baseErrorString} Missing questions.\n`))
  process.exit(0)
}

if (!handler || !fs.existsSync(handler)) {
  process.stdout.write(chalk.red(`${baseErrorString} Missing handler file.\n`))
  process.exit(0)
}

const handleAnswers = require(handler)

if (typeof handleAnswers !== 'function') {
  process.stdout.write(chalk.red(`${baseErrorString} The handler module should export a function.\n`))
  process.exit(0)
}

// starting
clear()

// printing heading
if (heading) {
  const headingStyle = chalk[headingColor] || chalk.white
  process.stdout.write(headingStyle(`${figlet.textSync(heading, { horizontalLayout: 'full' })}\n\n`))
}

// printing info
if (info) {
  const infoStyle = chalk[infoColor] || chalk.white
  process.stdout.write(infoStyle(`\n${info}\n\n`))
  process.stdout.write('--------\n\n')
}

// wizard
inquirer
  .prompt(require(questions))
  .then(handleAnswers)
  .catch(err => process.stdout.write(chalk.red(err)))
