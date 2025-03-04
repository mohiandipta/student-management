const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Student = require('./student.model');
const Course = require('./course.model');

const Result = sequelize.define('Result', {
    grade: { type: DataTypes.STRING, allowNull: false }
});

Result.belongsTo(Student);
Result.belongsTo(Course);

module.exports = Result;
