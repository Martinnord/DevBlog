export default `
  type User {
    id: ID!
    username: String
    email: String!
    password: String!
    firstName: String
    lastnName: String
    avatar: String
    updatedAt: Date!
    createdAt: Date!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
  }
`;