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
    posts: [Post!]!
    updatedAt: Date!
    createdAt: Date!
  }

  type Query {
    getAllUsers: [User]
    getUser(username: String!): User
    currentUser: User
  }

  type registerResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
    test: String
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User

  }
`
