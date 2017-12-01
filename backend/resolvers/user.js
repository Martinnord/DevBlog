import GraphQLDate from "graphql-date";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { promisify } from "util";

const hashSync = promisify(bcrypt.hash);

export default {
  Date: GraphQLDate,
  Query: {
    async getUsers() {
      return await User.query();
    },
    async getUser(_, { id }) {
      return await User.query().findById(id);
    }
  },
  Mutation: {
    async createUser(_, { email, username, password }) {
      const hash = await hashSync(password, bcrypt.genSaltSync(10));
      return User.query().insert({ email, username, password: hash });
    }
  }
};

