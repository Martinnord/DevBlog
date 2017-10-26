var typeDefs = `
  type Post {
    _id: String
    title: String
    content: String
  }

  type Query {
    getPosts: [Post]
  }

  schema {
    query: Query
  }
`
module.exports = typeDefs
