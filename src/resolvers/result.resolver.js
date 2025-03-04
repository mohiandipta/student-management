const Result = require('../models/result.model');
const Student = require('../models/student.model');
const Course = require('../models/course.model');

const resultResolvers = {
    Query: {
        results: async () => await Result.findAll({ include: [Student, Course] }),
    },
    Mutation: {
        createResult: async (_, { studentId, courseId, grade }) => {
            return await Result.create({ grade, StudentId: studentId, CourseId: courseId });
        },
    },
};

module.exports = resultResolvers;
