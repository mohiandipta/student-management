const Institute = require('../models/institute.model');

const instituteResolvers = {
    Query: {
        institutes: async () => await Institute.findAll(),
    },
    Mutation: {
        createInstitute: async (_, { name }) => {
            return await Institute.create({ name });
        },

        updateInstitute: async (_, { id, name }) => {
            const institute = await Institute.findByPk(id);
            if (!institute) {
                throw new Error("Institute not found");
            }

            if (name) institute.name = name;

            await institute.save();
            return institute;
        },

        deleteInstitute: async (_, { id }) => {
            const institute = await Institute.findByPk(id);
            if (!institute) {
                throw new Error("Institute not found");
            }
            await institute.destroy();
            return "Institute deleted successfully";
        },
    },
};

module.exports = instituteResolvers;
