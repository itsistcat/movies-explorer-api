/* eslint-disable no-console */
const Movie = require('../models/movie');

// eslint-disable-next-line no-unused-vars
function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const { _id } = req.user;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: _id,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => {
      movie
        .populate('owner', '_id')
        .then(() => res.status(201).send(movie))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// eslint-disable-next-line no-unused-vars
function receiveMovies(_, res, next) {
  Movie
    .find({})
    .populate('owner', '_id')
    .then((movies) => res.send(movies))
    .catch((err) => console.log(err));
}

module.exports = {
  createMovie,

  receiveMovies,
};
