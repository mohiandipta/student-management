const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Institute = require("./institute.model");

const Student = sequelize.define("Student", {
  name: { type: DataTypes.STRING, allowNull: false },
  instituteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Institute,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

Student.belongsTo(Institute, { foreignKey: "instituteId" });

module.exports = Student;
