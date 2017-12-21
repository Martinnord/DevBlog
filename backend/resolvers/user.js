import GraphQLDate from 'graphql-date'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import { promisify } from 'util'

const hashSync = promisify(bcrypt.hash)

export default {
  Date: GraphQLDate,
  Query: {
    getUsers: async () => {
      return await User.query()
    },
    getUser: async (_, { id }) => {
      return await User.query().findById(id)
    }
  },
  Mutation: {
    register: async (_, { email, username, password }) => {
      try {
        const hashedPassword = await hashSync(password, bcrypt.genSaltSync(10))
        await User.query().insert({ email, username, password: hashedPassword })
        return true
      } catch (err) {
        return false
      }
    }
  }
}
