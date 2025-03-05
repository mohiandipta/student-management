// typeDefs/user.js
const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String
  }

  extend type Query {
    users(limit: Int, offset: Int): [User]
  }

  extend type Mutation {
    createUser(username: String!, email: String!): User
    updateUser(id: ID!, username: String, password: String): User
    deleteUser(id: ID!): String
  }
`;
