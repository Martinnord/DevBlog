'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlDate = require('graphql-date');

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _util = require('util');

var _database = require('../config/database');

var _yup = require('yup');

var _yup2 = _interopRequireDefault(_yup);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = require('../config/constants');

var _constants2 = _interopRequireDefault(_constants);

var _auth = require('../services/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hashAsync = (0, _util.promisify)(_bcryptjs2.default.hash);

const schema = _yup2.default.object().shape({
  email: _yup2.default.string().email().required('Please enter an email address'),
  username: _yup2.default.string().required('Please enter an username'),
  password: _yup2.default.string().required('Please enter a password').min(5)
});

exports.default = {
  Date: _graphqlDate2.default,
  User: {
    posts: ({ id }) => {
      return _post2.default.query().where('user_id', id).orderBy('createdAt', 'desc');
    }
  },
  Query: {
    currentUser: async (_, args, { user }) => {
      if (user) {
        return _user2.default.query().findById(user.id);
      }
      return null;
    },
    getAllUsers: async () => {
      return _user2.default.query();
    },
    getUser: async (_, args) => {
      const user = await _user2.default.query().where('username', args.username).first();
      return user;
    }
  },
  Mutation: {
    login: async (_, { email, password }, { SECRET }) => {
      // Finding the user
      const user = await (0, _database.knex)('users').where('email', email).first();

      if (!user) {
        throw new Error('Invalid email/password');
      }

      // Validating the password
      const validPassword = await _bcryptjs2.default.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Invalid email/password');
      }

      // Adding a jwt token to the user
      user.jwt = _jsonwebtoken2.default.sign({ id: user.id }, SECRET);
      console.log(user);

      return user;
    },
    register: async (_, { email, username, password }, { SECRET }) => {
      await schema.validate({ email, username, password });
      const users = await (0, _database.knex)('users').where('email', email);

      const userExists = (await (0, _database.knex)('users').where({ email }).orWhere({ username })).length === 1;

      if (userExists) {
        throw new Error('Email/username already in use');
      } else {
        const hashedPassword = await hashAsync(password, _bcryptjs2.default.genSaltSync(10));

        const user = await _user2.default.query().insert({
          email,
          username,
          password: hashedPassword
        });

        // Adding a jwt token to the user
        user.jwt = _jsonwebtoken2.default.sign({ id: user.id }, SECRET);

        return user;
      }
    },
    updateUserInfo: async (_, args, { user }) => {
      // Should be able to update password later
      try {
        // const user = User.query().findById(user.id)
        await (0, _auth.requireAuth)(user);
        return _user2.default.query().patchAndFetchById(user.id, {
          username: args.username,
          email: args.email,
          name: args.name,
          profileImage: args.profileImage,
          websiteUrl: args.websiteUrl,
          bio: args.bio,
          location: args.location,
          education: args.education,
          employerName: args.employerName,
          employerTitle: args.employerTitle,
          twitterUsername: args.twitterUsername,
          githubUsername: args.githubUsername
        });
      } catch (err) {
        throw err;
      }
    }
  }
};