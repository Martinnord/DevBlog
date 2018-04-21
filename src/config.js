import dotenv from 'dotenv'

dotenv.config()


const defaultConfig = {
  GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_URL,
  GRAPHQL_SUBSCRIPTIONS_URL: process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS_URL,
}

const devConfig = {}

const prodConfig = {}

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig
    case 'production':
      return prodConfig
    default:
      return devConfig
  }
}

export default Object.assign(defaultConfig, envConfig(process.env.NODE_ENV))