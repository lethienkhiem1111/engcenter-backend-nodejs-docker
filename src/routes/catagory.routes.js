const router = require('express').Router();

const { authJwt } = require("../middlewares/index.md");

const catagoryController = require('../controllers/catagory.controller');

router.post(
    '/createCatagory',
    [ 
        authJwt.verifyToken, 
        authJwt.isUser,
        authJwt.isAdmin
    ],
    catagoryController.createCatagory
)

router.get(
    '/getCatagory/:catagoryId',
    catagoryController.getCatagory
)

router.get(
    '/getAllCatagories',
    catagoryController.getAllCatagories
)

router.post(
    '/deleteCatagory/:catagoryId',
    catagoryController.deleteCatagory
)

module.exports = router;