import GraphQLDate from 'graphql-date'
import Post from '../models/post'
import yup from 'yup'
import User from '../models/user'

export default {
  Date: GraphQLDate,
  Post: {
    user: ({ user_id }) => {
      return User.query().findById(user_id)
    }
  },
  Query: {
    getAllPosts: async () => {
      return await Post.query().orderBy('createdAt', 'desc')
    },
    getPost: async (_, { id }) => {
      return await Post.query().findById(id)
    }
  },
  Mutation: {
    createPost: async (_, { title, content }, { user }) => {
      const userId = user.id
      return await Post.query().insert({ title, content, user_id: userId })
    },
    updatePost: async (_, { id, title, content }) => {
      return await Post.query().patchAndFetchById(id, { title, content })
    },
    deletePost: async (_, { id }) => {
      return await Post.query().deleteById(id)
    }
  }
}
