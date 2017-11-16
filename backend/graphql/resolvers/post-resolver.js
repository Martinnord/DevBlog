const Post = require("../../models/Post.model.js")

module.exports = {
    getPosts: () => {
      Post.query().then(posts => { console.log(posts) })
    }
}



// module.exports = {
//   Query: {
//     getPosts: () => { },
//   },
//   getPost: (_, { _id }) => Post.findById(_id),
//   getPosts: () => Post.findOne({}),
//   createPost: (_, args) => Post.create(args),
//   updatePost: (_, { _id, ...rest }) =>
//     Post.findByIdAndUpdate(_id, rest, { new: true }),
//   deletePost: async (_, { _id }) => {
//     try {
//       await Post.findByIdAndRemove(_id)
//       return {
//         message: "Delete success!"
//       }
//     } catch (err) {
//       throw err
//     }
//   }
// }

