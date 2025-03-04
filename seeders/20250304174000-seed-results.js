const faker = require('@faker-js/faker');
const { Result } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const results = [];
    for (let i = 0; i < 100; i++) {
      results.push({
        grade: faker.random.arrayElement(['A', 'B', 'C', 'D', 'F']),
        StudentId: faker.random.number({ min: 1, max: 100000 }),
        CourseId: faker.random.number({ min: 1, max: 100000 }),
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
