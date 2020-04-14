const router = require('express').Router();

const { authJwt } = require("../middlewares/index.md");

const outlineController = require('../controllers/outline.controller');

router.post(
    '/createOutline',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    outlineController.createOutline
);

router.get(
    '/getOutline/:outlineId',
    outlineController.getOutline
)

router.get(
    '/getAllOutlinesByClassId/:classId',
    outlineController.getAllOutlines
);

router.post(
    '/deleteOutline/:outlineId',
    outlineController.deleteOutline
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

// router.post(
//     '/deleteCourse/:courseId',
//     [ 
//         authJwt.verifyToken, 
//         authJwt.isUser,
//         authJwt.isAdmin
//     ],
//     couserController.deleteCourse
// )

module.exports = router;