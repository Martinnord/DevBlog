import { Model } from 'objection';

class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "content"],

      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        content: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }
}

module.exports = Post;

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
