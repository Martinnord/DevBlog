const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  content: {
    type: String,
    required: [true, "Content is required"]
  }
})

module.exports = mongoose.model('Post', PostSchema)
