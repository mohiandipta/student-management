const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
        sync: true
    }
);

sequelize.authenticate()
    .then(() => console.log('✅ Database Connected!'))
    .catch(err => console.error('❌ Database Connection Error:', err));

module.exports = sequelize;
