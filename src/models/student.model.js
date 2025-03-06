const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Institute = require("./institute.model");
const Course = require("./course.model")

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
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Course, key: "id" },
  },
});

Student.belongsTo(Institute, { foreignKey: "instituteId" });
Institute.hasMany(Student, { foreignKey: "instituteId" });
Student.belongsTo(Course, { foreignKey: "courseId" });
Course.hasMany(Student, { foreignKey: "courseId" });

module.exports = Student;
