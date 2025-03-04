const Institute = require('../models/institute.model');

const instituteResolvers = {
    Query: {
        institutes: async () => await Institute.findAll(),
    },
    Mutation: {
        createInstitute: async (_, { name }) => {
            return await Institute.create({ name });
        },
    },
};

module.exports = instituteResolvers;
