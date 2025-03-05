const { gql } = require('apollo-server-express');

module.exports = gql`
    type Institute { 
        id: ID!
        name: String!
    }

    extend type Query {
        institutes(limit: Int, offset: Int): [Institute]
    }

    extend type Mutation {
        createInstitute(name: String!): Institute
        updateInstitute(id: ID!, name: String): Institute
        deleteInstitute(id: ID!): String
    }
`;