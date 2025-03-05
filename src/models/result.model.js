const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Student = require("./student.model");
const Course = require("./course.model");

const Result = sequelize.define("Result", {
  grade: { type: DataTypes.STRING, allowNull: false },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

Result.belongsTo(Student, { foreignKey: "studentId" });
Result.belongsTo(Course, { foreignKey: "courseId" });

module.exports = Result;
