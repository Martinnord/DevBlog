const Model = require('objection').Model

class Post extends Model {
  static get tableName() {
    return 'post'
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

module.exports = Post

// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const PostSchema = new Schema({
//   title: {
//     type: String,
//     required: [true, "Title is required"]
//   },
//   content: {
//     type: String,
//     required: [true, "Content is required"]
//   },
//   author: {
//     type: String,
//     required: true
//   },
// }, { timestamps: true} )

// module.exports = mongoose.model('Post', PostSchema)
