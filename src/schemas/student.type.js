const { gql } = require('apollo-server-express');

module.exports = gql`
    type Student { 
        id: ID!
        name: String!
        institute: Institute
    }

    type RankedStudent {
        student: Student!
        totalMarks: Int!
    }

    extend type Query {
        students: [Student]
        topRangkingStudents(limit:Int!): [RankedStudent]!
    }

    extend type Mutation {
        createStudent(name: String!, instituteId: ID!): Student
        updateStudent(id: ID!, name: String!, instituteId: ID!): Student
    }
`;