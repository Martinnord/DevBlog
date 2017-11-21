export default `
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

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
`;
