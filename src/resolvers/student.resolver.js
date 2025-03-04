const Student = require('../models/student.model');
const Institute = require('../models/institute.model');

const studentResolvers = {
    Query: {
        students: async () => await Student.findAll({ include: Institute }),
    },
    Mutation: {
        createStudent: async (_, { name, instituteId }) => {
            return await Student.create({ name, InstituteId: instituteId });
        },
    },
};

module.exports = studentResolvers;
