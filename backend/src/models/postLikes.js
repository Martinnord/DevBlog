import { Model } from 'objection'

export default class PostLikes extends Model {
  static get tableName() {
    return 'post_likes'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'post_id'],

      properties: {
        user_id: { type: 'integer' },
        post_id: { type: 'integer' }
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
