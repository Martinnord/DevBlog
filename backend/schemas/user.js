export default `
  type User {
    id: ID!
    username: String
    email: String!
    password: String!
    jwt: String
    firstName: String
    lastName: String
    avatar: String
    updatedAt: Date!
    createdAt: Date!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type registerResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): registerResponse!
    login(email: String!, password: String!): User
  }
`
