const db = require('../models/index.model');
const Outline = db.outline;

exports.createOutline = (req, res, next) => {
    const { title, name, classId } = req.body;
    Outline.create({
        title: title,
        name: name,
        classId: classId
    })
    .then((outline) => {
        return res.status(200).json({
            success: true,
            outline: outline
        })
    })
    .catch(err => next(err))
}

exports.getOutline = (req, res, next) => {
    const outlineId = req.params.outlineId;
    Outline.findOne({
        where: {
            id: outlineId
        }
    })
    .then(outline => {
        if(!outline) {
            return res.status(404).json({
                success: false,
                message: 'Outline not found'
            })
        }
        res.status(200).json({
            success: true,
            outline: outline
        })
    })
    .catch(err => next(err))
}


exports.getAllOutlines = (req, res, next) => {
  const classId = req.params.classId;
    Outline.findAll({
      where: {
        classId: classId
      }
    })
    .then((outlines) => {
        res.status(200).json({
          success: true,
          outlines: outlines,
        });
      })
      .catch((err) => next(err));
}

exports.deleteOutline = (req, res, next) => {
    const outlineId = req.params.outlineId;
    Outline.findOne({
      where: {
        id: outlineId,
      },
    })
      .then((outline) => {
        if (!outline) {
          return res.status(404).json({
            success: false,
            message: "Outline not found",
          });
        }
        outline.destroy().then(() => {
          return res.status(200).json({
            message: `Outline has destroy with id: ${outline.id}`,
          });
        });
      })
      .catch((err) => next(err));
  };

  exports.deleteOutline = (req, res, next) => {
    const outlineId = req.params.outlineId;
    Outline.findOne({
      where: {
        id: outlineId,
      },
    })
      .then((outline) => {
        if (!outline) {
          return res.status(404).json({
            success: false,
            message: "Outline not found",
          });
        }
        outline.destroy().then(() => {
          return res.status(200).json({
            message: `Outline has destroy with id: ${outline.id}`,
          });
        });
      })
      .catch((err) => next(err));
  };