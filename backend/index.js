import express from 'express'
import path from 'path'
import middlewares from './config/middlewares'
import constants from './config/constants'
import config from './config'
import cors from 'cors'
import bodyParser from 'body-parser'
import { knex } from './config/database'
import knexConfig from './knexfile'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'graphql-tools'
import { createServer } from 'http'
import { Model } from 'objection'
import { Post, User } from './models'

const app = express()
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

Model.knex(knex)

app.use(cors('*'))
middlewares(app)

app.use(
  constants.GRAPHQL_PATH,
  bodyParser.json(),
  graphqlExpress({
    schema
  })
)

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: config.GRAPHQL_PATH
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
