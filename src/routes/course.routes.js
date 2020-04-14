const router = require('express').Router();

const { authJwt } = require("../middlewares/index.md");

const couserController = require('../controllers/course.controller');

router.post(
    '/createCourse',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    couserController.createCourse
);

router.get(
    '/getCourse/:courseId',
    couserController.getCourse
)

router.get(
    '/getAllCourses',
    couserController.getAllCourses
);

router.post(
    '/editCourse/:courseId',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    couserController.editCourse
)

router.post(
    '/deleteCourse/:courseId',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    couserController.deleteCourse
)

router.post(
    '/createEnrollment/:courseId',
    couserController.createEnrollCourse
)

router.get(
    '/getEnrollmentsCourses/:courseId',
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
    couserController.getEnrollsCourses
)
router.post(
    '/deleteEnrollment/:enrollmentId',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    couserController.deleteEnrollment
)

module.exports = router;