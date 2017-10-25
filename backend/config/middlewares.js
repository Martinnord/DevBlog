const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const constants = require('./constants')
const db = require('./database')
const passport = require('passport')

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(passport.initialize())
  app.use(helmet())
  app.use(cors())

  // app.use(logger('dev'))
  if (isDev && !isTest) {
    app.use(morgan('dev'))
  }
}
