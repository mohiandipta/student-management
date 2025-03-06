const { faker } = require('@faker-js/faker');
const Institute = require('../src/models/institute.model');
const Course = require('../src/models/course.model')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const institutes = await Institute.findAll({
      attributes: ['id'], // Only fetch the id field
    });

    if (institutes.length === 0) {
      throw new Error('No institutes found. Please seed institutes first.');
    }

    const instituteIds = institutes.map(institute => institute.id);
    
    const courses = await Course.findAll({
      attributes: ['id'], // Only fetch the id field
    });

    if (courses.length === 0) {
      throw new Error('No courses found. Please seed courses first.');
    }

    const courseIds = courses.map(course => course.id);

    const students = [];
    const batchSize = 1000;

    for (let i = 0; i < 100; i++) {
      students.push({
        name: faker.person.fullName(),
        instituteId: instituteIds[Math.floor(Math.random() * instituteIds.length)],
        courseId: courseIds[Math.floor(Math.random() * courseIds.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Insert in batches to avoid memory issues
      if (students.length === batchSize) {
        await queryInterface.bulkInsert('Students', students, {});
        students.length = 0; // Reset the array to free memory
      }
    }

    // Insert remaining records that didn't fill a batch
    if (students.length > 0) {
      await queryInterface.bulkInsert('Students', students, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Students', null, {});
  },
};
