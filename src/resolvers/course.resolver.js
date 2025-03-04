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
        updateCourse: async (_, { id, title, instituteId }) => {
            const course = await Course.findByPk(id);
            if (!course) {
                throw new Error("Course not found");
            }
            
            if (title) course.title = title;
            if (instituteId) course.InstituteId = instituteId;

            await course.save();
            return course;
        }
    },
};

module.exports = courseResolvers;
