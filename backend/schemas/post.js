export default `
  scalar Date
  
  type Post {
    id: ID!
    title: String!
    content: String!
    updatedAt: Date!
    createdAt: Date!
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String, content: String!): Post
    deletePost(id: ID!): Post
  }
`;
