export default `
  scalar Date

  type Post {
    id: ID!
    title: String!
    content: String!
    image_url: String!
    user: User!
    likes: [User]
    updated_at: String
    created_at: String
  }

  type Query {
    getAllPosts: [Post]
    getPost(id: Int!): Post
    getUserPosts: [Post]
  }

  type Mutation {
    createPost(title: String!, content: String!, image_url: String): Post
    updatePost(id: ID!, title: String, content: String!): Post
    deletePost(id: ID!): Post
    likePost(id: ID!): Post
  }
`;
