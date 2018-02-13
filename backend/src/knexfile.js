module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://martinnord:password@db/devblog`,
    // connection: {
    //   host: 'backend_db_1',
    //   port: process.env.DB_PORT || 5432,
    //   user: process.env.DB_USER || 'postgres',
    //   password: process.env.DB_PASSWORD || undefined,
    //   database: process.env.DATABASE
    // },
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
}
