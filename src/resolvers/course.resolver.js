const Course = require('../models/course.model');
const Institute = require('../models/institute.model');

const courseResolvers = {
    Query: {
        courses: async () => await Course.findAll({ include: Institute }),
    },
    Mutation: {
        createCourse: async (_, { title, instituteId }) => {
            return await Course.create({ title, InstituteId: instituteId });
        },
    },
};

module.exports = courseResolvers;
