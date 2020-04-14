module.exports = (sequelize, Sequelize) => {
    const Catagory = sequelize.define("catagories", {
      name: {
        type: Sequelize.STRING,
      },
      catagory_code: {
        type: Sequelize.STRING,
      }
    });
  
    return Catagory;
  };
  