// typeDefs/user.js
const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    createUser(username: String!, email: String!): User
    updateUser(id: ID!, username: String, password: String): User

    register(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }
`;
