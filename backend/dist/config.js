'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();

exports.default = {
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  dialect: 'ps'
};