'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || undefined
    },
    migrations: {
      directory: __dirname + '/config/migrations'
    },
    seeds: {
      directory: __dirname + '/config/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: `postgres://${process.env.DB_HOST}/devblog`,
    // connection: {
    //   port: process.env.PORT,
    //   host: 'pg',
    //   database: process.env.DATABASE,
    //   user: process.env.USERNAME,
    //   password: process.env.PASSWORD,
    // },
    migrations: {
      directory: __dirname + '/config/migrations'
    },
    seeds: {
      directory: __dirname + '/config/seeds'
    }
  }
};