const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Institute = require('./institute.model');

const Student = sequelize.define('Student', {
    name: { type: DataTypes.STRING, allowNull: false }
});

Student.belongsTo(Institute);

module.exports = Student;
