const router = require('express').Router();

const routeSignup = require('./entrance');
const routeSignin = require('./entrance');

const auth = require('../middlewares/auth');

const routeMovies = require('./movies');
const routeUsers = require('./users');

const NOT_FOUND_ERROR = require('../errors/NotFoundError');

router.use('/', routeSignup);
router.use('/', routeSignin);

router.use(auth);

router.use('/movies', routeMovies);
router.use('/users', routeUsers);

router.use((req, res, next) => next(new NOT_FOUND_ERROR('Страницы по запрошенному URL не существует')));

module.exports = router;
