const sequelize = require("../database/database");
const Course = require("../models/course.model");
const Institute = require("../models/institute.model");
const Student = require("../models/student.model");

const courseResolvers = {
  Query: {
    courses: async (_, { limit, offset }) => {
      return await Course.findAll({ include: Institute, limit, offset });
    },
    topCoursesByYear: async (_, { year }) => {
        return await Student.findAll({
          attributes: [
            "courseId",
            [sequelize.fn("COUNT", sequelize.col("courseId")), "enrollmentCount"],
          ],
          where: sequelize.where(
            sequelize.fn("EXTRACT", sequelize.literal("YEAR FROM \"Student\".\"createdAt\"")),
            year
          ),
          group: ["courseId", "Course.id", "Course->Institute.id"],
          order: [[sequelize.fn("COUNT", sequelize.col("courseId")), "DESC"]], // Fix ORDER BY
          limit: 5,
          include: [{ model: Course, include: [Institute] }],
        }).then((results) =>
          results.map((entry) => ({
            course: entry.Course,
            enrollmentCount: entry.dataValues.enrollmentCount,
          }))
        );
      },
          
  },
  Mutation: {
    createCourse: async (_, { title, instituteId }) => {
      return await Course.create({ title, InstituteId: instituteId });
    },

    updateCourse: async (_, { id, title, instituteId }) => {
      const course = await Course.findByPk(id);
      if (!course) {
        throw new Error("Course not found");
      }

      if (title) course.title = title;
      if (instituteId) course.InstituteId = instituteId;

      await course.save();
      return course;
    },

    deleteCourse: async (_, { id }) => {
      const course = await Course.findByPk(id);
      if (!course) {
        throw new Error("Course not found");
      }
      await course.destroy();
      return "Course deleted successfully";
    },
  },
};

module.exports = courseResolvers;
