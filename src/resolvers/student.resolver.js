const Student = require('../models/student.model');
const Institute = require('../models/institute.model');

const studentResolvers = {
    Query: {
        students: async (_, { limit = 10, offset = 0 }) => 
            await Student.findAll({ include: Institute, limit, offset }),
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
