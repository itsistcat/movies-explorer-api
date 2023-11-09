const router = require('express').Router();

const routeSignup = require('./signup');
const routeSignin = require('./signin');

const auth = require('../middlewares/auth');

const routeMovies = require('./movies');
const routeUsers = require('./users');

router.use('/', routeSignup);
router.use('/', routeSignin);

router.use(auth);

router.use('/movies', routeMovies);
router.use('/users', routeUsers);

module.exports = router;
