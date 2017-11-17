import GraphQLDate from "graphql-date";
import PostResolvers from "./post";
//const UserResolvers = require('./user-resolver')

module.exports = {
  Date: GraphQLDate,
  Query: {
    getPost: PostResolvers.getPost,
    getPosts: PostResolvers.getPosts
  },
  Mutation: {
    createPost: PostResolvers.createPost,
    updatePost: PostResolvers.updatePost,
    deletePost: PostResolvers.deletePost
  }
};
