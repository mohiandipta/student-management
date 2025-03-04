const { gql } = require('apollo-server-express');

module.exports = gql`
    type Course { 
        id: ID!
        title: String!
        institute: Institute
    }

    type TopCourse {
        course: Course!
        enrollmentCount: Int!
    }

    extend type Query {
        courses: [Course]
        topCoursesByYear(year: Int!): [TopCourse!]!
    }

    extend type Mutation {
        createCourse(title: String!, instituteId: ID!): Course
        updateCourse(id:ID!, title: String, instituteId: ID): Course
    }
`;
