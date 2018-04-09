import { Model } from 'objection'

export default class Post extends Model {
  static get tableName() {
    return 'posts'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['content', 'title'],

      properties: {
        id: { type: 'integer' },
        content: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1 }
      }
    }
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }

  $beforeDelete() {
    this.deletedAt = new Date().toISOString()
  }
}
