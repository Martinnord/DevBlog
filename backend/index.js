const express = require('express')
const middlewares = require('./config/middlewares')
const constants = require('./config/constants')
const config = require('./config')
const routes = require('./routes')
const { 
  graphqlExpress,
  graphiqlExpress
} = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { createServer } = require('http')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
// const knex = require('./config/database')
const app = express()
const schema = makeExecutableSchema({ typeDefs, resolvers })

import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knexfile';
import Post from './models/Post.model';
const knex = Knex(knexConfig.development);
Model.knex(knex);

middlewares(app)

app.use(
  '/graphql',
  graphiqlExpress({
    endpointURL: config.GRAPHQL_PATH,
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

graphQLServer.listen(3010, err => {
  if (err) {
    console.log(`Error: ${err}`)
  } else {
    console.log(`
      Good to go 😄 🍕
      App listening on 3001
      Env: ${process.env.NODE_ENV} 💫
    `)
  }
})

module.exports = app
