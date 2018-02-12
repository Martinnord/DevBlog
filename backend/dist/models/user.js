'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objection = require('objection');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _objection.Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 16 },
        email: { type: 'string', minLength: 1, maxLength: 62 },
        name: { type: 'string', minLength: 1, maxLength: 50 },
        password: { type: 'string', minLength: 6, maxLength: 60 },
        profileImage: { type: 'string', minLength: 1 },
        websiteUrl: { type: 'string', minLength: 1, maxLength: 100 },
        bio: { type: 'string', minLength: 1, maxLength: 400 },
        location: { type: 'string', minLength: 1, maxLength: 50 },
        education: { type: 'string', minLength: 1, maxLength: 50 },
        employerName: { type: 'string', minLength: 1, maxLength: 50 },
        employerTitle: { type: 'string', minLength: 1, maxLength: 50 },
        twitterUsername: { type: 'string', minLength: 1, maxLength: 50 },
        githubUsername: { type: 'string', minLength: 1, maxLength: 50 }
      }
    };
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  $beforeDelete() {
    this.deleted_at = new Date().toISOString();
  }
}
exports.default = User;