module.exports = (sequelize, Sequelize) => {
    const Enrollment = sequelize.define("enrollments", {
      fullname: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.TEXT,
      },
    });
  
    return Enrollment;
  };
  