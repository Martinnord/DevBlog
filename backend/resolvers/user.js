import GraphQLDate from 'graphql-date'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import { promisify } from 'util'
import { knex } from '../config/database'
import yup from 'yup'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import constants from '../config/constants'

const hashAsync = promisify(bcrypt.hash)

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Please enter an email address'),
  username: yup.string().required('Please enter an username'),
  password: yup
    .string()
    .required('Please enter a password')
    .min(5)
})

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
    login: async (_, { email, password }) => {
      const user = await knex('users')
        .where('email', email)
        .first()

      if (!user) {
        throw new Error('No user with this email')
      }

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        throw new Error('Wrong password!')
      }

      // Adding a jwt token to the user
      user.jwt = jwt.sign({ id: user.id }, constants.JWT_SECRET)

      return user
    },
    register: async (_, { email, username, password }) => {
      try {
        const a = await schema.validate({ email, username, password })
        const users = await knex('users')
          .where('email', email)
          .select('id')

        if (users.length === 0) {
          const hashedPassword = await hashAsync(
            password,
            bcrypt.genSaltSync(10)
          )

          const user = await User.query().insert({
            email,
            username,
            password: hashedPassword
          })

          // Adding a jwt token to the user
          user.jwt = jwt.sign({ id: user.id }, constants.JWT_SECRET)

          return {
            ok: true,
            user
          }
        } else {
          console.log('user already exists')
          return {
            ok: false,
            error: formatErrors()
          }
        }
      } catch (err) {
        console.log('Error', err)
        return {
          ok: false,
          errors: [err]
        }
      }
    }
  }
}
