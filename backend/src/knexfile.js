export default {
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
    // connection: `postgres://${process.env.DB_HOST}/devblog`,
    connection: {
      database: process.env.PROD_DATABASE,
      user: process.env.PROD_USER,
      password: process.env.PROD_PASSWORD
    },
    migrations: {
      directory: __dirname + '/config/migrations'
    },
    seeds: {
      directory: __dirname + '/config/seeds'
    }
  }
}
