const { gql } = require('apollo-server-express');

const authSchema = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        passsword: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): AuthPayload
    }
`;

module.exports = authSchema;
