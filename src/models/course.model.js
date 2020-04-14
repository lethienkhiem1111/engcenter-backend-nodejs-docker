module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("courses", {
    course_code: {
      type: Sequelize.STRING,
    },
    course_name: {
      type: Sequelize.STRING,
    },
    certification: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    start_day: {
      type: Sequelize.DATE,
    },
    end_day: {
      type: Sequelize.DATE,
    },
  });

  return Course;
};
