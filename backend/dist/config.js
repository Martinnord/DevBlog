'use strict';

require('dotenv').config();

module.exports = {
  DATABASE: process.env.DATABASE_URL_LOCAL,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST,
  POST: process.env.DB_PORT,
  GRAPHQL_PATH: process.env.GRAPHQL_PATH,
  dialect: 'mysql',
  define: {
    underscored: true
  }
};