import GraphQLDate from "graphql-date";
import PostResolvers from "./post.resolver";
import UserResolvers from "./user.resolver";

module.exports = {
  Date: GraphQLDate,
  Query: {
    getPosts: PostResolvers.getPosts,
    getPost: PostResolvers.getPost,
    getUsers: UserResolvers.getUsers,
    getUser: UserResolvers.getUser
  },
  Mutation: {
    createPost: PostResolvers.createPost,
    updatePost: PostResolvers.updatePost,
    deletePost: PostResolvers.deletePost
  }
};
