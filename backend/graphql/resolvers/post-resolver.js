const Post = require("../../models/Post.model")

module.exports = {
  getPost: (_, { _id }) => Post.findById(_id),
  getPosts: () => Post.find({}).sort({ createdAt: -1 }),
  createPost: (_, args) => Post.create(args),
  updatePost: (_, { _id, ...rest }) =>
    Post.findByIdAndUpdate(_id, rest, { new: true }),
  deletePost: async (_, { _id }) => {
    try {
      await Post.findByIdAndRemove(_id)
      return {
        message: "Delete success!"
      }
    } catch (err) {
      throw err
    }
  }
}
