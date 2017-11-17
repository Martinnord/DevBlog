export default  `
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

  type Query {
    getPost(id: ID!): Post
    getPosts: [Post]
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
  type User {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastnName: String
    avatar: String
    updatedAt: Date!
    createdAt: Date!
  }

    signup(email: String!, name: String, password: String!, username: String): User
  
  }
 */