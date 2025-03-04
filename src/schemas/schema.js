const { gql } = require('apollo-server-express');
const userTypeDefs = require('./user.type'); // Include user typeDefs
const instituteTypeDefs = require('./institute.type');
const studentTypeDefs = require('./student.type');
const courseTypeDefs = require('./course.type');
const resultTypeDefs = require('./result.type');

const baseTypeDefs = gql`
    type Query
    type Mutation
`;

const typeDefs = gql`
    ${baseTypeDefs}
    ${userTypeDefs}
    ${instituteTypeDefs}
    ${studentTypeDefs}
    ${courseTypeDefs}
    ${resultTypeDefs}
`;

module.exports = typeDefs;
