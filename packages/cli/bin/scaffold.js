#!/usr/bin/env node

const scaffold = require('../commands/scaffold')
const minimist = require('minimist')
const chalk = require('chalk')

const { src, dest = './', context } = minimist(process.argv.slice(2))

scaffold(src, dest, context).catch(err => process.stdout.write(chalk.red(`${err}\n`)))
