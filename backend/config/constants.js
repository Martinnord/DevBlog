require('dotenv').config()

const devConfig = {
  MONGO_URL: process.env.MONGO_URL_DEV
}
const localConfig = {
  DATABASE_URL: process.env.DATABASE_URL_LOCAL
}
const prodConfig = {
  MONGO_URL: process.env.MONGO_URL_PROD
}

const defaultConfig = {
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET,
  GRAPHQL_PATH: process.env.GRAPHQL_PATH,
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,

  facebook: {
    clientID: process.env.FBclientID,
    clientSecret: process.env.FBclientSecret
  }
}

function envConfig(env) {
  switch (env) {
    case 'dev':
      return devConfig
    case 'local':
      return localConfig
    default:
      return prodConfig
  }
}

module.exports = Object.assign(defaultConfig, envConfig(process.env.NODE_ENV))
