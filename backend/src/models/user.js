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
        name: { type: 'string', maxLength: 50 },
        password: { type: 'string', minLength: 6, maxLength: 60 },
        profile_image: { type: 'string' },
        website_url: { type: 'string', maxLength: 100 },
        bio: { type: 'string', maxLength: 400 },
        location: { type: 'string', maxLength: 50 },
        education: { type: 'string', maxLength: 50 },
        employer_name: { type: 'string', maxLength: 50 },
        employer_title: { type: 'string', maxLength: 50 },
        twitter_username: { type: 'string', maxLength: 50 },
        github_username: { type: 'string', maxLength: 50 },
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
