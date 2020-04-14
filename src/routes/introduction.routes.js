const router = require('express').Router();

const { authJwt } = require("../middlewares/index.md");

const introController = require('../controllers/introduction.controller');

router.post(
    '/createIntro',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    introController.createIntro
);
router.post(
    '/deleteIntro/:introCode',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    introController.deleteIntro
);

router.get(
    '/getIntro/:introCode',
    introController.getIntro
)

router.get(
    '/getAllIntros',
    introController.getAllIntro
);


module.exports = router;