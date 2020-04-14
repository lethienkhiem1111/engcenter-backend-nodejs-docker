const router = require('express').Router();

const { authJwt } = require("../middlewares/index.md");

const scheduleController = require('../controllers/schedule.controller');

router.post(
    '/createSchedule',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    scheduleController.createSchedule
);

router.get(
    '/getScheduleByClassId/:classId',
    scheduleController.getSchedulesByClassId
)

router.get(
    '/getScheduleByUserId/:userId',
    scheduleController.getSchedulesByUserId
)

router.get(
    '/getAllSchedules',
    scheduleController.getAllSchedules
);

// router.post(
//     '/editCourse/:courseId',
//     [ 
//         authJwt.verifyToken, 
//         authJwt.isUser,
//         authJwt.isAdmin
//     ],
//     couserController.editCourse
// )

router.post(
    '/deleteSchedule/:scheduleId',
    // [ 
    //     authJwt.verifyToken, 
    //     authJwt.isUser,
    //     authJwt.isAdmin
    // ],
    scheduleController.deleteSchedule
)

module.exports = router;