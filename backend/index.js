import express from 'express'
import path from 'path'
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
import jwt from 'jsonwebtoken'

const app = express()
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

Model.knex(knex)

const SECRET = constants.JWT_SECRET

const addUser = async req => {
  const token = req.headers.authorization
  try {
    const user = await jwt.verify(token, SECRET)
    req.user = user
  } catch (err) {
    console.log(err)
  }
  req.next()
}

app.use(cors('*'))
app.use(addUser)

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
      SECRET,
    }
  })
))

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
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
