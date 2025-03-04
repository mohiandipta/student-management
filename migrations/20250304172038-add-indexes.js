module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding indexes to optimize query performance
    await queryInterface.addIndex('Users', ['username'], {
      unique: true,
      name: 'username_index',
    });
    await queryInterface.addIndex('Users', ['email'], {
      unique: true,
      name: 'email_index',
    });

    await queryInterface.addIndex('Courses', ['title'], {
      name: 'course_title_index',
    });

    await queryInterface.addIndex('Institutes', ['name'], {
      unique: true,
      name: 'institute_name_index',
    });

    await queryInterface.addIndex('Results', ['StudentId'], {
      name: 'result_studentId_index',
    });

    await queryInterface.addIndex('Results', ['CourseId'], {
      name: 'result_courseId_index',
    });

    await queryInterface.addIndex('Students', ['name'], {
      name: 'student_name_index',
    });

    await queryInterface.addIndex('Students', ['InstituteId'], {
      name: 'student_instituteId_index',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Dropping the indexes if migration is rolled back
    await queryInterface.removeIndex('Users', 'username_index');
    await queryInterface.removeIndex('Users', 'email_index');
    await queryInterface.removeIndex('Courses', 'course_title_index');
    await queryInterface.removeIndex('Institutes', 'institute_name_index');
    await queryInterface.removeIndex('Results', 'result_studentId_index');
    await queryInterface.removeIndex('Results', 'result_courseId_index');
    await queryInterface.removeIndex('Students', 'student_name_index');
    await queryInterface.removeIndex('Students', 'student_instituteId_index');
  },
};
