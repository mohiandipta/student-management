const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const institutes = new Set(); // Use a Set to ensure unique names
    const batchSize = 1000;

    while (institutes.size < 100) {
      // Generate a unique name by adding a random suffix
      const baseName = faker.company.name();
      const uniqueName = `${baseName} University ${Math.floor(Math.random() * 1000)}`;
      
      // Only add if not already in the set
      if (!institutes.has(uniqueName)) {
        institutes.add(uniqueName);
      }
    }

    // Convert Set to array of objects for bulk insert
    const institutesArray = Array.from(institutes).map(name => ({
      name: name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert in batches
    for (let i = 0; i < institutesArray.length; i += batchSize) {
      const batch = institutesArray.slice(i, i + batchSize);
      await queryInterface.bulkInsert('Institutes', batch, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Institutes', null, {});
  },
};