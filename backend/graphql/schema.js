var typeDefs = `
  scalar Date

  type Status {
    message: String!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    updatedAt: Date!
    createdAt: Date!
  }

  type Query {
    getPost(_id: ID!): Post
    getPosts: [Post]
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(_id: ID!, title: String, content: String!): Post
    deletePost(_id: ID!): Status
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
module.exports = typeDefs

