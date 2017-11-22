import GraphQLDate from "graphql-date";
import User from "../models/user";

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
    async createUser(_, args) {
      return await User.query().insert(args);
    },
  }
};
