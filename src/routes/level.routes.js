const router = require('express').Router();

const { authJwt } = require("../middlewares/index.md");

const levelController = require('../controllers/level.controller');

router.post(
    '/createLevel',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    levelController.createLevel
)

router.get(
    '/getLevel/:levelId',
    levelController.getLevel
)

router.get(
    '/getAllLevels',
    levelController.getAllLevels
)

router.post(
    '/deleteLevel/:levelId',
    levelController.deleteLevel
)

module.exports = router;