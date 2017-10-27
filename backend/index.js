const express = require('express')
const middlewares = require('./config/middlewares')
const constants = require('./config/constants')
const routes = require('./routes')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { createServer } = require('http')

const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
// Init express
const app = express()

const schema = makeExecutableSchema({ typeDefs, resolvers })

// express middleware
middlewares(app)

app.use(
  '/graphql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH
  })
)

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress({
    schema
  })
)
app.use('/api', routes)

const graphQLServer = createServer(app)

graphQLServer.listen(constants.PORT, err => {
  if (err) {
    console.log(`Error: ${err}`)
  } else {
    console.log(`
      Good to go 😄 🍕
      App listening on: ${constants.PORT}
      Env: ${process.env.NODE_ENV} 💫
    `)
  }
})

module.exports = app
