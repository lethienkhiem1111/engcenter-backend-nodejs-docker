const router = require('express').Router();

const { authJwt } = require("../middlewares/index.md");

const contactController = require('../controllers/contact.controller');

router.post(
    '/createContact',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    contactController.createContact
);

router.get(
    '/getContactsByClassUserId/:classId/:studentId',
    contactController.getContactsByClassUserId
)

router.post(
    '/deleteContact/:contactId',
    contactController.deleteContact
)

module.exports = router;