module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/devblog',
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
      host: process.env.DB_HOST,
      database: process.env.PROD_DATABASE,
      user: process.env.PROD_USER,
      password: process.env.PROD_PASSWORD,
      port: process.env.PROD_PORT,
    },
    migrations: {
      directory: __dirname + '/config/migrations'
    },
    seeds: {
      directory: __dirname + '/config/seeds'
    }
  }
}
