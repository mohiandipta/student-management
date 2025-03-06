const Student = require("../models/student.model");
const Institute = require("../models/institute.model");
const Result = require("../models/result.model");

const studentResolvers = {
  Query: {
    students: async (_, { limit = 10, offset = 0 }) => {
      await Student.findAll({ include: Institute, limit, offset });
    },
    topRangkingStudents: async (_, { limit }) => {
      try {
        const studentsWithMarks = await Student.findAll({
          include: [
            {
              model: Result,
              attributes: ["grade"],
            },
            Institute,
          ],
        });

        const rankedStudents = studentsWithMarks.map((student) => {
          const totalMarks = student.Results.reduce((total, result) => {
            const grade = parseInt(result.grade, 10);
            return !isNaN(grade) ? total + grade : total;
          }, 0);

          return {
            student,
            totalMarks,
          };
        });

        rankedStudents.sort((a, b) => b.totalMarks - a.totalMarks);

        return rankedStudents.slice(0, limit).map((rankedStudent) => ({
          student: rankedStudent.student,
          totalMarks: rankedStudent.totalMarks,
        }));
      } catch (error) {
        console.error("Error fetching top-ranking students:", error);
        throw new Error("Error fetching top-ranking students");
      }
    },
  },
  Mutation: {
    createStudent: async (_, { name, instituteId }) => {
      return await Student.create({ name, InstituteId: instituteId });
    },

    updateStudent: async (_, { id, name, instituteId }) => {
      const student = await Student.findByPk(id);
      if (!student) {
        throw new Error("Student not found");
      }

      if (name) student.name = name;
      if (instituteId) student.InstituteId = instituteId;

      await student.save();
      return student;
    },

    deleteStudent: async (_, { id }) => {
      const student = await Student.findByPk(id);
      if (!student) {
        throw new Error("Student not found");
      }
      await student.destroy();
      return "Student deleted successfully";
    },
  },
};

module.exports = studentResolvers;
