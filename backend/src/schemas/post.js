export default `
  scalar Date
  
  type Post {
    id: ID!
    title: String!
    content: String!
    imageUrl: String!
    user: User!
    updatedAt: String
    createdAt: String
  }

  type Query {
    getAllPosts: [Post]
    getPost(id: Int!): Post
    getUserPosts: [Post]
  }

  type Mutation {
    createPost(title: String!, content: String!, imageUrl: String): Post
    updatePost(id: ID!, title: String, content: String!): Post
    deletePost(id: ID!): Post
  }
`;
