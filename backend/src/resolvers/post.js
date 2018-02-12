import GraphQLDate from 'graphql-date'
import Post from '../models/post'
import User from '../models/user'
import yup from 'yup'
import { requireAuth } from '../services/auth';

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
    },
    getUserPosts: async (_, args, { user }) => {
      try {
        return await Post.query().where('user_id', user.id )
      } catch (err) {
      }
    },
  },
  Mutation: {
    createPost: async (_, {title, content, imageUrl}, { user }) => {
      // console.log('context', context)
      try {
        await requireAuth(user)
        return await Post.query().insert({ title, content, imageUrl, user_id: user.id })
      } catch (err) {
        throw err
      }
    },
    updatePost: async (_, { id, title, content }, { user }) => {
      try {
        await requireAuth(user)
        return await Post.query().patchAndFetchById(id, { title, content, imageUrl })
      } catch (err) {
        throw err
      }
    },
    deletePost: async (_, { id }, { user }) => {
      try {
        await requireAuth(user)
        return await Post.query().deleteById(id)
      } catch (err) {
        throw err
      }
    }
  }
}
