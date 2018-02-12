'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireAuth = requireAuth;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function requireAuth(user) {
  if (!user || !user.id) {
    throw new Error('Unauthorized');
  }

  const me = await _user2.default.query().findById(user.id);

  if (!me) {
    throw new Error('Unauthorized');
  }

  return me;
}