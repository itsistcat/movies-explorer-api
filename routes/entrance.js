const router = require('express').Router();

const { loginUserValidation, registerUserValidation } = require('../utils/validate');

const { loginUser, registerUser } = require('../controllers/users');

router.post('/signin', loginUserValidation, loginUser);
router.post('/signup', registerUserValidation, registerUser);

module.exports = router;
