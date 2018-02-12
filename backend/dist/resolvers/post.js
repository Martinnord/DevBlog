'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlDate = require('graphql-date');

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _yup = require('yup');

var _yup2 = _interopRequireDefault(_yup);

var _auth = require('../services/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Date: _graphqlDate2.default,
  Post: {
    user: ({ user_id }) => {
      return _user2.default.query().findById(user_id);
    }
  },
  Query: {
    getAllPosts: async () => {
      return await _post2.default.query().orderBy('createdAt', 'desc');
    },
    getPost: async (_, { id }) => {
      return await _post2.default.query().findById(id);
    },
    getUserPosts: async (_, args, { user }) => {
      try {
        return await _post2.default.query().where('user_id', user.id);
      } catch (err) {}
    }
  },
  Mutation: {
    createPost: async (_, { title, content, imageUrl }, { user }) => {
      // console.log('context', context)
      try {
        await (0, _auth.requireAuth)(user);
        return await _post2.default.query().insert({ title, content, imageUrl, user_id: user.id });
      } catch (err) {
        throw err;
      }
    },
    updatePost: async (_, { id, title, content }, { user }) => {
      try {
        await (0, _auth.requireAuth)(user);
        return await _post2.default.query().patchAndFetchById(id, { title, content, imageUrl });
      } catch (err) {
        throw err;
      }
    },
    deletePost: async (_, { id }, { user }) => {
      try {
        await (0, _auth.requireAuth)(user);
        return await _post2.default.query().deleteById(id);
      } catch (err) {
        throw err;
      }
    }
  }
};