const db = require("../models/index.model");
const Level = db.level;

exports.createLevel = (req, res, next) => {
  const { name, level_code } = req.body;
  Level.create({
    name: name,
    level_code: level_code,
  })
    .then((level) => {
      return res.status(200).json({
        success: true,
        level: level,
      });
    })
    .catch((err) => next(err));
};

exports.getLevel = (req, res, next) => {
  const levelId = req.params.levelId;
  Level.findOne({
    where: {
      id: levelId,
    },
  })
    .then((level) => {
      if (!level) {
        return res.status(404).json({
          success: false,
          message: "Level not found",
        });
      }
      return res.status(200).json({
        success: true,
        level: level,
      });
    })
    .catch((err) => next(err));
};

exports.getAllLevels = (req, res, next) => {
  Level.findAll()
    .then((levels) => {
      return res.status(200).json({
        success: true,
        levels: levels,
      });
    })
    .catch((err) => next(err));
};

exports.deleteLevel = (req, res, next) => {
  const levelId = req.params.levelId;
  Level.findOne({
    where: {
      id: levelId,
    },
  })
    .then((level) => {
      if (!level) {
        return res.status(404).json({
          success: false,
          message: "Level not found",
        });
      }
      level.destroy().then(() => {
        return res.status(200).json({
          message: `Level has destroy with id: ${level.id}`,
        });
      });
    })
    .catch((err) => next(err));
};
