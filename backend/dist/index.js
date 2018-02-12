'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('./config/constants');

var _constants2 = _interopRequireDefault(_constants);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _database = require('./config/database');

var _knexfile = require('./knexfile');

var _knexfile2 = _interopRequireDefault(_knexfile);

var _apolloServerExpress = require('apollo-server-express');

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _graphqlTools = require('graphql-tools');

var _http = require('http');

var _objection = require('objection');

var _models = require('./models');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
const typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, './schemas')));
const resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)((0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, './resolvers')));
const schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs, resolvers });

_objection.Model.knex(_database.knex);

const SECRET = _constants2.default.JWT_SECRET;

const addUser = async req => {
  try {
    const token = req.headers.authorization;
    if (token != null) {
      const user = await _jsonwebtoken2.default.verify(token.split(' ')[1], SECRET);
      req.user = user;
    } else {
      req.user = null;
    }
  } catch (err) {
    console.log(err);
  }
  req.next();
};

app.use((0, _cors2.default)('*'));
app.use(addUser);

app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)(req => ({
  schema,
  context: {
    user: req.user,
    SECRET,
    serverUrl: `${req.protocol}://${req.get('host')}`
  }
})));

app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
  endpointURL: '/graphql'
}));

console.log('DB_HOST', process.env.DB_HOST);
const graphQLServer = (0, _http.createServer)(app);

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

exports.default = app;