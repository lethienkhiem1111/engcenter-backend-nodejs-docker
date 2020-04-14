const router = require('express').Router();

const {verifySignUp} = require('../middlewares/index.md');
const controller = require('../controllers/auth.controller');

router.post(
    '/signup', 
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
      ],
      controller.signUp
);
router.post('/signin',
    controller.signIn
);

module.exports = router;