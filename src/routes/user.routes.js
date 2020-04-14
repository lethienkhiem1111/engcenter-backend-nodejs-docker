const router = require("express").Router();

const { authJwt } = require("../middlewares/index.md");
const {verifySignUp} = require('../middlewares/index.md');
const userController = require("../controllers/user.controller");
const profileController = require("../controllers/profile.controller");

router.get("/", [authJwt.verifyToken], userController.getUser);

router.get(
  "/getAllUsers",
  [
    authJwt.verifyToken,
    authJwt.isUser, 
    authJwt.isAdmin
  ],
  userController.getAllUser
);

router.post(
  "/createUser",
  [ 
    authJwt.verifyToken, 
    authJwt.isUser, 
    authJwt.isAdmin, 
    verifySignUp.checkDuplicateUsernameOrEmail, 
    verifySignUp.checkRolesExisted
  ],
  userController.createUser
);

router.post(
  "/editPassword",
  [
    authJwt.verifyToken,
  ],
  userController.editPasswordUser
)

router.post(
  "/deleteUser",
  [
    authJwt.verifyToken
  ],
  userController.deleteUser
)

router.post(
  "/createProfile/:userId",
  [
    authJwt.verifyToken,
    authJwt.isUser
  ],
  profileController.createProfile
)

router.get(
  "/getProfile/:userId",
  [
    authJwt.verifyToken,
    authJwt.isUser
  ],
  profileController.getProfile
)

router.post(
  "/editProfile/:profileId",
  [
    authJwt.verifyToken,
    authJwt.isUser
  ],
  profileController.editProfile
)

router.post(
  "/deleteProfile/:profileId",
  [
    authJwt.verifyToken,
    authJwt.isUser
  ],
  profileController.deleteProfile
)


// router.get(
//     '/user',
//     [authJwt.verifyToken],
//     controller.userBoard
// );

// router.get(
//     '/admin',
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
// )

module.exports = router;
