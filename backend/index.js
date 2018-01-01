import express from 'express'
import path from 'path'
import constants from './config/constants'
import config from './config'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'graphql-tools'
import { createServer } from 'http'
import Knex from 'knex'
import { Model } from 'objection'
import knexConfig from './knexfile'
import { Post, User } from './models'
const bodyParser = require('body-parser')

const app = express()
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
)
const schema = makeExecutableSchema({ typeDefs, resolvers })
const knex = Knex(knexConfig.development)

Model.knex(knex)

app.use(cors('*'))

const graphqlEndpoint = '/graphql'

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({
    schema
  })
)

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: graphqlEndpoint
  })
)

const graphQLServer = createServer(app)

graphQLServer.listen(3010, err => {
  if (err) {
    console.log(`Error: ${err}`)
  } else {
    console.log(`
      App listening on 3010
      Env: ${process.env.NODE_ENV}
    `)
  }
})

export default app
