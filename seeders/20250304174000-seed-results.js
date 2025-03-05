const { faker } = require('@faker-js/faker');
const Student = require('../src/models/student.model')
const Course = require('../src/models/course.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const students = await Student.findAll({
      attributes: ['id'], // Only fetch the id field
    });

    if (students.length === 0) {
      throw new Error('No students found. Please seed students first.');
    }

    const studentIds = students.map(student => student.id);

    const courses = await Course.findAll({
      attributes: ['id'], // Only fetch the id field
    });

    if (courses.length === 0) {
      throw new Error('No courses found. Please seed courses first.');
    }

    const courseIds = courses.map(course => course.id);

    const results = [];
    for (let i = 0; i < 100000; i++) {
      results.push({
        grade: faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E', 'F']),
        studentId: studentIds[Math.floor(Math.random() * studentIds.length)],
        courseId: courseIds[Math.floor(Math.random() * courseIds.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Results', results, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Results', null, {});
  },
};
