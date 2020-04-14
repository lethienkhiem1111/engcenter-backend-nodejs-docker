module.exports = (sequelize, Sequelize) => {
    const Introduction = sequelize.define("introductions", {
      code: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      }
    });
  
    return Introduction;
  };
  