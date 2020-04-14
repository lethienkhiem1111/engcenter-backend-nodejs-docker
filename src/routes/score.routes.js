const router = require('express').Router();

const { authJwt } = require("../middlewares/index.md");

const scoreController = require('../controllers/score.controller');

router.post(
    '/createScore',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    scoreController.createScore
);

router.get(
    '/getScore/:classId/:studentId',
    scoreController.getScore
)

router.post(
    '/deleteScore/:scoreId',
    scoreController.deleteScore
)

module.exports = router;