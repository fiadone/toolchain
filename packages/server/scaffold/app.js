#!/usr/bin/env nodejs

require('dotenv').load()

const path = require('path')
const http = require('http')
const express = require('express')

const apiCtrl = require('./server/controllers/api')
const frontCtrl = require('./server/controllers/front')
const session = require('./server/middlewares/session')
const notFound = require('./server/middlewares/not-found')

const app = express()
const assetsPath = path.resolve(__dirname, 'public/assets')

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
}

app.use(session)

app.use('/assets', express.static(assetsPath))
app.use('/api', apiCtrl)
app.use('/', frontCtrl)

app.use(notFound)

http.createServer(app).listen(3000, 'localhost')
