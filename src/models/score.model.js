module.exports = (sequelize, Sequelize) => {
    const Score = sequelize.define("scores", {
      reading: {
        type: Sequelize.INTEGER,
      },
      speaking: {
        type: Sequelize.INTEGER,
      },
      listening: {
        type: Sequelize.INTEGER,
      },
      writing: {
        type: Sequelize.INTEGER,
      },
      teacher_id: {
        type: Sequelize.STRING,
      },
      student_id: {
        type: Sequelize.STRING,
      },
    });
  
    return Score;
  };
  