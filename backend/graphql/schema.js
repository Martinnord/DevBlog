var typeDefs = `
  type Post {
    _id: ID!
    title: String!
    content: String!
  }

  type Query {
    getPost(_id: ID!): Post
    getPosts: [Post]
  }

  schema {
    query: Query
  }
`
module.exports = typeDefs

