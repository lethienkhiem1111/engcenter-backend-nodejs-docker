const db = require("../models/index.model");
const Course = db.course;
const Level = db.level;
const Catagory = db.catagory;
const Enrollment = db.enrollment;

exports.createCourse = (req, res, next) => {
  const { 
      course_code, 
      course_name,
      certification,
      description, 
      start_day, 
      end_day, 
      levelId,
      catagoryId
    } = req.body;
  Course.create({
    course_code: course_code,
    course_name: course_name,
    certification: certification,
    description: description,
    start_day: start_day,
    end_day: end_day,
    levelId: levelId,
    catagoryId: catagoryId
  })
    .then((course) => {
      return res.status(200).json({
        success: true,
        course: course,
      });
    })
    .catch((err) => next(err));
};

exports.getCourse = (req, res, next) => {
  const courseId = req.params.courseId;
  Course.findOne({
    where: {
      id: courseId,
    },
    include: [{
      model: Level
    },{
      model: Catagory
    }
  ]
  })
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      return res.status(200).json({
        success: true,
        course: course,
      });
      // course.getLevel((result) => {
      //   console.log('level')
      //   console.log(result)
      //   if(!result) {
      //     level = '';
      //   }
      //   level = result;
      // });
      // course.getCatagory((result) => {
      //   console.log('catagory')
      //   console.log(result)
      //   if(!result) {
      //     catagory = '';
      //   }
      //   catagory = result;
      // })
      
    })
    .catch((err) => next(err));
};

exports.getAllCourses = (req, res, next) => {
  Course.findAll()
    .then((courses) => {
      return res.status(200).json({
        success: true,
        courses: courses,
      });
    })
    .catch((err) => next(err));
};

exports.editCourse = (req, res, next) => {
  const courseId = req.params.courseId;
  const { 
      course_code, 
      course_name,
      certification,
      description, 
      start_day, 
      end_day,
      levelId,
      catagoryId
     } = req.body;

  Course.findOne({
    where: {
      id: courseId,
    },
  })
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
          course.course_code = course_code,
          course.course_name = course_name,
          course.certification = certification,
          course.description = description,
          course.start_day = start_day,
          course.end_day = end_day,
          course.levelId = levelId,
          course.catagoryId = catagoryId
      course
        .save()
        .then((course) => {
          return res.status(200)
            .json({
              success: true,
              course: course,
            })
            .catch((err) => next(err));
        });
    })
    .catch((err) => next(err));
};

exports.deleteCourse = (req, res, next) => {
  const courseId = req.params.courseId;
  Course.findOne({
    where: {
      id: courseId,
    },
  })
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      course.destroy().then(() => {
        return res.status(200).json({
          message: `Course has destroy with id: ${course.id}`,
        });
      });
    })
    .catch((err) => next(err));
};

exports.createEnrollCourse = (req, res, next) => {
  const courseId = req.params.courseId;
  const {
    fullname,
    birthday,
    phone, 
    email,
    message
  } = req.body;
  Course.findOne({
    where: {
      id: courseId,
    },
  })
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      Enrollment.create({
        fullname: fullname,
        birthday: birthday,
        phone: phone,
        email: email,
        message: message, 
        courseId
      }).then((result) => {
        return res.status(200).json({
          success: true,
          result: result
        });
      });
    })
    .catch((err) => next(err));
}

exports.getEnrollsCourses = (req, res, next) => {
  const courseId = req.params.courseId;
  Course.findOne({
    where: {
      id: courseId,
    },
  })
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      course.getEnrollments().then((result) => {
        return res.status(200).json({
          success: true,
          result: result
        });
      });
    })
    .catch((err) => next(err));
}

exports.deleteEnrollment = (req, res, next) => {
  const enrollmentId = req.params.enrollmentId;
  Enrollment.findOne({
    where: {
      id: enrollmentId,
    },
  })
    .then((enrollment) => {
      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message: "Enrollment not found",
        });
      }
      enrollment.destroy().then(() => {
        return res.status(200).json({
          message: `Enrollment has destroy with id: ${enrollment.id}`,
        });
      });
    })
    .catch((err) => next(err));
};