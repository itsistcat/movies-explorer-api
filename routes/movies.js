const router = require('express').Router();

const { createMovie, receiveMovies } = require('../controllers/movies');

router.post('/', createMovie);
router.get('/', receiveMovies);

module.exports = router;
