export default `
  scalar Date
  
  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
    updatedAt: String
    createdAt: String
  }

  type Query {
    getAllPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String, content: String!): Post
    deletePost(id: ID!): Post
  }
`;
