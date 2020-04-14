const db = require('../models/index.model');
const Schedule = db.schedule;
const User = db.user;
const Class = db.class;
const Profile = db.profile;

exports.createSchedule = (req, res, next) => {
    const { 
        session, 
        dayofweek, 
        day,
        time, 
        skill,
        room_number,
        address, 
        userId, 
        classId
      } = req.body;

    Schedule.create({
      session: session,
      dayofweek: dayofweek,
      day: day,
      time: time,
      skill: skill,
      room_number: room_number,
      address: address,
      userId: userId,
      classId: classId
    })
      .then((schedule) => {
        return res.status(200).json({
          success: true,
          schedule: schedule,
        });
      })
      .catch((err) => next(err));
  };
  
  exports.getSchedulesByClassId = (req, res, next) => {
    const classId = req.params.classId;
    Schedule.findAll({
      where: {
        classId: classId,
      },
      include: [{
        model: User,
        attributes: ['username', 'email', 'id'],
        include: [Profile]
      }
    ]
    })
      .then((schedule) => {
        if (!schedule) {
          return res.status(404).json({
            success: false,
            message: "Schedule not found",
          });
        }
        return res.status(200).json({
          success: true,
          schedule: schedule,
        });
        
      })
      .catch((err) => next(err));
  };

  exports.getSchedulesByUserId = (req, res, next) => {
    const userId = req.params.userId;
    Schedule.findAll({
      where: {
        userId: userId,
      },
      include: [{
        model: Class
      }
    ]
    })
      .then((schedule) => {
        if (!schedule) {
          return res.status(404).json({
            success: false,
            message: "Schedule not found",
          });
        }
        return res.status(200).json({
          success: true,
          schedule: schedule,
        });
        
      })
      .catch((err) => next(err));
  };
  
  exports.getAllSchedules = (req, res, next) => {
    Schedule.findAll()
      .then((schedules) => {
        return res.status(200).json({
          success: true,
          schedules: schedules,
        });
      })
      .catch((err) => next(err));
  };
  
//   exports.editCourse = (req, res, next) => {
//     const courseId = req.params.courseId;
//     const { 
//         course_code, 
//         course_name,
//         description, 
//         start_day, 
//         end_day,
//         levelId,
//         catagoryId
//        } = req.body;
  
//     Course.findOne({
//       where: {
//         id: courseId,
//       },
//     })
//       .then((course) => {
//         if (!course) {
//           return res.status(404).json({
//             success: false,
//             message: "Course not found",
//           });
//         }
//         course
//           .save({
//             course_code: course_code,
//             course_name: course_name,
//             description: description,
//             start_day: start_day,
//             end_day: end_day,
//             levelId: levelId,
//             catagoryId: catagoryId
//           })
//           .then((course) => {
//             return res
//               .status(200)
//               .json({
//                 success: true,
//                 course: course,
//               })
//               .catch((err) => next(err));
//           });
//       })
//       .catch((err) => next(err));
//   };
  
  exports.deleteSchedule = (req, res, next) => {
    const scheduleId = req.params.scheduleId;
    Schedule.findOne({
      where: {
        id: scheduleId,
      },
    })
      .then((schedule) => {
        if (!schedule) {
          return res.status(404).json({
            success: false,
            message: "Schedule not found",
          });
        }
        schedule.destroy().then(() => {
          return res.status(200).json({
            message: `Schedule has destroy with id: ${course.id}`,
          });
        });
      })
      .catch((err) => next(err));
  };