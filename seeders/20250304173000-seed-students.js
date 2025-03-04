const faker = require('@faker-js/faker');
const { Student } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const students = [];
    const batchSize = 1000;

    for (let i = 0; i < 100; i++) {
      students.push({
        name: faker.name.findName(),
        InstituteId: faker.datatype.number({ min: 1, max: 100000 }), // Linking to an institute (ensure institutes exist)
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
