module.exports = (sequelize, Sequelize) => {
    const Level = sequelize.define("levels", {
      name: {
        type: Sequelize.STRING,
      },
      level_code: {
        type: Sequelize.STRING,
      }
    });
  
    return Level;
  };
  