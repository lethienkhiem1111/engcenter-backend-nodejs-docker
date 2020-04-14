const db = require('../models/index.model');
const { Op } = require("sequelize");
const Score = db.score;

exports.createScore = (req, res, next) => {
    const { 
        reading, 
        speaking, 
        listening, 
        writing,
        teacher_id,
        student_id,
        class_id
    } = req.body;
    Score.create({
        reading: reading,
        speaking: speaking,
        listening: listening,
        writing: writing,
        teacher_id: teacher_id,
        student_id: student_id,
        classId: class_id
    })
    .then((score) => {
        return res.status(200).json({
            success: true,
            score: score
        })
    })
    .catch(err => next(err))
}

exports.getScore = (req, res, next) => {
    const classId = req.params.classId;
    const studentId = req.params.studentId;
    Score.findOne({
        where: {
            [Op.and]: [{ classId: classId }, { student_id: studentId }], 
        }
    })
    .then(score => {
        if(!score) {
            return res.status(404).json({
                success: false,
                message: 'Score not found'
            })
        }
        return res.status(200).json({
            success: true,
            score: score
        })
    })
    .catch(err => next(err))
}
exports.deleteScore = (req, res, next) => {
    const scoreId = req.params.scoreId;
    Score.findOne({
      where: {
        id: scoreId,
      },
    })
      .then((score) => {
        if (!score) {
          return res.status(404).json({
            success: false,
            message: "Score not found",
          });
        }
        score.destroy().then(() => {
          return res.status(200).json({
            message: `Score has destroy with id: ${score.id}`,
          });
        });
      })
      .catch((err) => next(err));
  };
