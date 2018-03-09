const devConfig = {
  GRAPHQL_URI: process.env.GRAPHQL_URI_DEV
}

const prodConfig = {
  GRAPHQL_URI: process.env.GRAPHQL_URI_PROD
}

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

export default envConfig(process.env.NODE_ENV)