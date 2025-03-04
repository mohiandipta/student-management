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
        updateStudent: async (_, { id, name, instituteId }) => {

            const student = await Student.findByPk(id);
            if (!student) {
                throw new Error("Student not found");
            }

            if (name) student.name = name;
            if (instituteId) student.InstituteId = instituteId;

            await student.save();
            return student;
        }
    },
};

module.exports = studentResolvers;
