module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define("schedules", {
      session: {
        type: Sequelize.STRING,
      },
      dayofweek: {
        type: Sequelize.STRING,
      },
      day: {
        type: Sequelize.DATE,
      },
      time: {
        type: Sequelize.STRING,
      },
      skill: {
        type: Sequelize.STRING,
      },
      room_number: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
    });
  
    return Schedule;
  };
  