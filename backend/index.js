import express from "express";
import middlewares from "./config/middlewares";
import constants from "./config/constants";
import config from "./config";
import routes from "./routes";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { createServer } from "http";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
// const knex = require('./config/database')
const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });

import Knex from "knex";
import { Model } from "objection";
import knexConfig from "./knexfile";
import { Post, User } from "./models";

const knex = Knex(knexConfig.development);
Model.knex(knex);

middlewares(app);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: config.GRAPHQL_PATH
  })
);

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress({
    schema
  })
);

app.use("/api", routes);

const graphQLServer = createServer(app);

graphQLServer.listen(3010, err => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`
      App listening on 3010
      Env: ${process.env.NODE_ENV}
    `);
  }
});

export default app;
