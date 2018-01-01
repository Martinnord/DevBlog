import { Model } from 'objection'

export default class Post extends Model {
  static get tableName() {
    return 'posts'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'content'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        content: { type: 'string', minLength: 1, maxLength: 255 }
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
