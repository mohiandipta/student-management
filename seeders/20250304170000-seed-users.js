const { faker } = require('@faker-js/faker');
const { User } = require('../models');
const bcrypt = require('bcrypt');  // Make sure bcrypt is imported to hash the password

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    const batchSize = 1000;

    for (let i = 0; i < 100; i++) {
      const password = faker.internet.password();  // Generate a random password
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      users.push({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: hashedPassword, // Store the hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Insert in batches to avoid memory issues
      if (users.length === batchSize) {
        await queryInterface.bulkInsert('Users', users, {});
        users.length = 0; // Reset the array to free memory
      }
    }

    // Insert remaining records that didn't fill a batch
    if (users.length > 0) {
      await queryInterface.bulkInsert('Users', users, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
