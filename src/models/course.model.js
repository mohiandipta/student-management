const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Institute = require('./institute.model');

const Course = sequelize.define('Course', {
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  instituteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Institute, 
      key: 'id'
    },
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
  }
});

Course.belongsTo(Institute, { foreignKey: 'instituteId' });

module.exports = Course;
