const { gql } = require('apollo-server-express');
const userTypeDefs = require('./user.schema'); // Include user typeDefs
const instituteTypeDefs = require('./institute.schema');
const studentTypeDefs = require('./student.schema');
const courseTypeDefs = require('./course.schema');
const resultTypeDefs = require('./result.schema');
const authTypeDefs = require('./auth.schema');

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
    ${authTypeDefs}
`;

module.exports = typeDefs;
