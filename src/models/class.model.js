module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define("classes", {
    class_code: {
      type: Sequelize.STRING,
    },
    class_name: {
      type: Sequelize.STRING,
    },
    start_day: {
      type: Sequelize.DATE,
    },
    weeks: {
      type: Sequelize.INTEGER,
    },
    fee: {
      type: Sequelize.DOUBLE,
    },
  });

  return Class;
};
