export default `
  scalar Date

  type Status {
    message: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    updatedAt: Date!
    createdAt: Date!
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

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String, content: String!): Post
    deletePost(id: ID!): Post
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
/*

    signup(email: String!, name: String, password: String!, username: String): User
  
  }
 */
