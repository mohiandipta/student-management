const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Institute = sequelize.define('Institute', {
    name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Institute;
