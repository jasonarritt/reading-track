const { gql } = require("apollo-server-express");

const typeDefs = gql`
// User typeDef
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  // Book typeDef
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  // Auth typeDef
  type Auth {
    token: ID!
    user: User
  }
  // Query typeDef
  type Query {
    user(_id: String, username: String): User
    users: [User]
    me: User
  }
  // Mutation typeDef
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      bookId: String!
      authors: [String]!
      description: String
      title: String!
      image: String
      link: String
    ): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
