const router = require('express').Router();

const { authJwt } = require("../middlewares/index.md");

const classController = require('../controllers/class.controller');

router.post(
    '/createClass',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    classController.createClass
);

router.get(
    '/getClass/:classId',
    classController.getClass
)

router.get(
    '/getAllClassese',
    classController.getAllClassese
)

router.post(
    '/editClass/:classId',
    classController.editClass
)

router.post(
    '/deleteClass/:classId',
    classController.deleteClass
);


module.exports = router;