const { gql } = require("apollo-server-express");

module.exports = gql`
  type Result {
    id: ID!
    grade: String!
    student: Student
    course: Course
  }

  type InstituteResults {
    institute: Institute!
    students: [StudentResults!]!
  }

  type StudentResults {
    student: Student!
    results: [Result!]!
  }

  extend type Query {
    results(limit: Int, offset: Int): [Result]
    resultsByInstitute(instituteId: ID!): InstituteResults
  }

  extend type Mutation {
    createResult(studentId: ID!, courseId: ID!, grade: String!): Result
    updateResult(id: ID!, studentId: ID!, courseId: ID!, grade: String!): Result
    deleteResult(id: ID!): String
  }
`;
