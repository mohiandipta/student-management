const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Institute = require('./institute.model');

const Course = sequelize.define('Course', {
    title: { type: DataTypes.STRING, allowNull: false }
});

Course.belongsTo(Institute);

module.exports = Course;
