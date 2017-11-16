const GraphQLDate = require("graphql-date")

const PostResolvers = require("./post-resolver")
const UserResolvers = require('./user-resolver')

module.exports = {
  Date: GraphQLDate,
  Query: {
    //getPost: PostResolvers.getPost,
    getPosts: PostResolvers.getPosts
  },
   Mutation: {
    //createPost: PostResolvers.createPost,
  //   updatePost: PostResolvers.updatePost,
  //   deletePost: PostResolvers.deletePost,
  //   signup: UserResolvers.signup
   }
}
