import User from "../models/user";
import GraphQLDate from "graphql-date";

export default {
  Date: GraphQLDate,
  Query: {
    async getUsers() {
      return await User.query();
    },
    async getUser(_, { id }) {
      return await User.query().findById(id);
    }
  }
  // signup: (_, args) => {
  //   console.log('args', args)
  //   return User.create({ args })
  // }
};
