module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profile", {
    fullname: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
  });

  return Profile;
};
