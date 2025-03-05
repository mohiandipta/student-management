const { faker } = require('@faker-js/faker');
const Institute = require('../src/models/institute.model');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const institutes = await Institute.findAll({
      attributes: ['id'], // Only fetch the id field
    });

    if (institutes.length === 0) {
      throw new Error('No institutes found. Please seed institutes first.');
    }

    const instituteIds = institutes.map(institute => institute.id);

    const students = [];
    const batchSize = 1000;

    for (let i = 0; i < 100000; i++) {
      students.push({
        name: faker.person.fullName(),
        instituteId: instituteIds[Math.floor(Math.random() * instituteIds.length)],
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
