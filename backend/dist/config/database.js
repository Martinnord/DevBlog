'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.knex = undefined;

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _knexfile = require('../knexfile');

var _knexfile2 = _interopRequireDefault(_knexfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const knex = exports.knex = (0, _knex2.default)(_knexfile2.default[process.env.NODE_ENV || 'development']);