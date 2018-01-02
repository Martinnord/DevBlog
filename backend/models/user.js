import { Model } from 'objection'
import bcrypt from 'bcryptjs'

export default class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 16 },
        email: { type: 'string', minLength: 1, maxLength: 62 },
        password: { type: 'string', minLength: 6, maxLength: 60 },
        firstname: { type: 'string', minLength: 1, maxLength: 50 }
      }
    }
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
  }

  $beforeDelete() {
    this.deleted_at = new Date().toISOString()
  }
}
