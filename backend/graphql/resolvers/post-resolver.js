const Post = require("../../models/Post.model")
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const posts = [{
  id: 1,
  title: 'soccer',
}, {
  id: 2,
  title: 'baseball',
}];


module.exports = {
    getPosts: () => {
      return posts
    },
    getPost: () => {
      console.log('post by id')
    },
    createPost: (root, args) => {
      const newPost = { title: args.title, content: args.content }
      posts.push(newPost)
      return newPost
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

