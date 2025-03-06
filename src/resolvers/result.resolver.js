const Result = require("../models/result.model");
const Student = require("../models/student.model");
const Course = require("../models/course.model");
const Institute = require("../models/institute.model");

const resultResolvers = {
  Query: {
    results: async (_, { limit = 10, offset = 0 }) => {
      return await Result.findAll({
        include: [Student, Course],
        limit,
        offset,
      });
    },
    resultsByInstitute: async (_, { instituteId }) => {
      try {
        const institute = await Institute.findByPk(instituteId);
        if (!institute) {
          throw new Error(`Institute with ID ${instituteId} not found`);
        }

        const students = await Student.findAll({
          where: { instituteId },
          include: {
            model: Result,
            include: [Course],
          },
        });

        return {
          institute,
          students: students.map((student) => ({
            student,
            results: student.Results,
          })),
        };
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching results by institute");
      }
    },
  },
  Mutation: {
    createResult: async (_, { studentId, courseId, grade }) => {
      return await Result.create({
        grade,
        StudentId: studentId,
        CourseId: courseId,
      });
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
