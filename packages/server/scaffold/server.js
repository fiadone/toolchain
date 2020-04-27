#!/usr/bin/env nodejs

require('dotenv').config()

const path = require('path')
const http = require('http')
const express = require('express')
const logger = require('morgan')

const session = require('./server/middlewares/session')

const apiCtrl = require('./server/controllers/api')
const defaultCtrl = require('./server/controllers/default')

const env = process.env.NODE_ENV
const app = express()
const port = 3000

app.set('view engine', 'twig')
app.set('views', path.join(__dirname, 'views'))

if (env === 'production') {
  app.set('trust proxy', 1)
}

if (env === 'development') {
  app.use(require('./server/middlewares/webpack-dev')(port))
}

app.use(logger('tiny'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session())

app.use(express.static('public'))

app.use('/api', apiCtrl())
app.use('/', defaultCtrl())

http
  .createServer(app)
  .listen(port, 'localhost', () => {
    console.log()
    console.log(`
    /*=============================================*/
    /*                                             */
    /*   App is running on http://localhost:${port}   */
    /*                                             */
    /*=============================================*/
    `)
    console.log()
  })
