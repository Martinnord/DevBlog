import express from "express";
import middlewares from "./config/middlewares";
import constants from "./config/constants";
const config = require("./config");
const routes = require("./routes");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { createServer } = require("http");
import typeDefs from "./graphql/schema";
const resolvers = require("./graphql/resolvers");
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
  "/graphql",
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
      App listening on 3001
      Env: ${process.env.NODE_ENV}
    `);
  }
});

export default app;
