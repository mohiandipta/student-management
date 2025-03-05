const { merge } = require('lodash');

const authResolvers = require('./auth.resolver')
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
    authResolvers,
    instituteResolvers,
    studentResolvers,
    courseResolvers,
    resultResolvers,
    userResolvers
);

module.exports = resolvers;
