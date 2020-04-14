const db = require('../models/index.model');
const Class = db.class;

exports.createClass = (req, res, next) => {
    const { 
        class_name,
        class_code,
        weeks,
        start_day,
        fee,
        courseId
     } = req.body;
    Class.create({
        class_name: class_name,
        class_code: class_code,
        weeks: weeks,
        start_day: start_day,
        fee: fee,
        courseId: courseId
    })
    .then(result => {
        return res.status(200).json({
            success: true,
            class: result
        })
    })
    .catch(err => next(err))
}

exports.getClass = (req, res, next) => {
    const classId = req.params.classId;
    Class.findOne({
        where: {
            id: classId
        }
    })
    .then(result => {
        if(!result) {
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            })
        }
        return res.status(200).json({
            success: false,
            class: result
        })
    })
    .catch(err => next(err))
}


exports.getAllClassese = (req, res, next) => {
    Class.findAll()
    .then((classes) => {
        return res.status(200).json({
          success: true,
          classes: classes,
        });
      })
      .catch((err) => next(err));
}

exports.editClass = (req, res, next) => {
  const classId = req.params.classId;
  const { 
    class_name,
    class_code,
    weeks,
    start_day,
    fee,
    courseId
     } = req.body;

  Class.findOne({
    where: {
      id: classId,
    },
  })
    .then((classResult) => {
      if (!classResult) {
        return res.status(404).json({
          success: false,
          message: "Class not found",
        });
      }
      classResult.class_name = class_name,
      classResult.class_code = class_code,
      classResult.weeks = weeks,
      classResult.start_day = start_day,
      classResult.fee = fee,
      classResult.courseId = courseId
      classResult
        .save()
        .then((editedClass) => {
          return res.status(200)
            .json({
              success: true,
              class: editedClass,
            })
            
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.deleteClass = (req, res, next) => {
    const classId = req.params.classId;
    Class.findOne({
      where: {
        id: classId,
      },
    })
      .then((classResult) => {
        if (!classResult) {
          return res.status(404).json({
            success: false,
            message: "Class not found",
          });
        }
        classResult.destroy().then(() => {
          return res.status(200).json({
            message: `Class has destroy with id: ${classResult.id}`,
          });
        });
      })
      .catch((err) => next(err));
  };