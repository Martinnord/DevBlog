export default {
  development: {
    client: 'pg',
    connection: `postgres://${process.env.DB_HOST}/devblog`,
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