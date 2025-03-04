const { merge } = require('lodash');

const instituteResolvers = require('./institute.resolver');
const studentResolvers = require('./student.resolver');
const courseResolvers = require('./course.resolver');
const resultResolvers = require('./result.resolver');
const userResolvers = require('./user.resolver');

const resolvers = merge(
    {
        Query: {},
        Mutation: {}
    },
    instituteResolvers,
    studentResolvers,
    courseResolvers,
    resultResolvers,
    userResolvers
);

module.exports = resolvers;
