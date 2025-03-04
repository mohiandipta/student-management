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

        updateResult: async (_, { id, grade, studentId, courseId }) => {
            const result = await Result.findByPk(id);
            if (!result) {
                throw new Error("Result not found");
            }

            if (grade) result.grade = grade;
            if (studentId) result.StudentId = studentId;
            if (courseId) result.CourseId = courseId;

            await result.save();
            return result;
        },

        deleteResult: async (_, { id }) => {
            const result = await Result.findByPk(id);
            if (!result) {
                throw new Error("Result not found");
            }
            await result.destroy();
            return "Result deleted successfully";
        },
    },
};

module.exports = resultResolvers;
