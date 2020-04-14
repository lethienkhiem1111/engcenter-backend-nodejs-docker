const db = require('../models/index.model');
const Introduction = db.introduction;

exports.createIntro = (req, res, next) => {
    const { code, title, content } = req.body;
    Introduction.create({
        code: code,
        title: title,
        content: content
    })
    .then((intro) => {
        return res.status(200).json({
            success: true,
            intro: intro
        })
    })
    .catch(err => next(err))
}

exports.getIntro = (req, res, next) => {
    const introCode = req.params.introCode;
    Introduction.findOne({
        where: {
            code: introCode
        }
    })
    .then(intro => {
        if(!intro) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found'
            })
        }
        return res.status(200).json({
            success: true,
            introduction: intro
        })
    })
    .catch(err => next(err))
}


exports.getAllIntro = (req, res, next) => {
    Introduction.findAll()
    .then((intros) => {
        return res.status(200).json({
          success: true,
          introductions: intros,
        });
      })
      .catch((err) => next(err));
}

exports.deleteIntro = (req, res, next) => {
    const introCode = req.params.introCode;
    Introduction.findOne({
      where: {
        code: introCode,
      },
    })
      .then((intro) => {
        if (!intro) {
          return res.status(404).json({
            success: false,
            message: "Intro not found",
          });
        }
        intro.destroy().then(() => {
          return res.status(200).json({
            message: `Intro has destroy with id: ${intro.id}`,
          });
        });
      })
      .catch((err) => next(err));
  };
  