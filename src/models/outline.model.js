module.exports = (sequelize, Sequelize) => {
  const Outline = sequelize.define("outlines", {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    }
  });

  return Outline;
};
