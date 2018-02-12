'use strict';

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const morgan = require('morgan');
const constants = require('./constants');
const passport = require('passport');
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

module.exports = app => {
  app.use(passport.initialize());
  app.use(helmet());
  // app.use(logger('dev'))
  if (isDev && !isTest) {
    app.use(morgan('dev'));
  }
};