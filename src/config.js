import {
  REACT_APP_GRAPHQL_URL,
  REACT_APP_GRAPHQL_SUBSCRIPTIONS_URL,
  NODE_ENV
} from './util/constants'

const defaultConfig = {
  GRAPHQL_URL: REACT_APP_GRAPHQL_URL,
  GRAPHQL_SUBSCRIPTIONS_URL: REACT_APP_GRAPHQL_SUBSCRIPTIONS_URL,
  NODE_ENV
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

export default Object.assign(defaultConfig, envConfig(NODE_ENV))