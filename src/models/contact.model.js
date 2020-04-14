module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("contact", {
    content: {
      type: Sequelize.STRING,
    },
    // student_id: {
    //   type: Sequelize.UUID,
    //   references: {
    //     model: 'users', 
    //     key: 'id', 
    //   }
    // },
    class_id: {
      type: Sequelize.STRING,
    },
    auth_name: {
      type: Sequelize.STRING,
    },
    auth_id: {
      type: Sequelize.STRING
    }
  },
  {

    timestamps: true
  }
  );

  return Contact;
};
