const ERROR_MESSAGES = require('../utils/errorMes');
const INACCURATE_DATA_ERROR = require('../errors/InaccurateDataError'); // 400
const FORBIDDEN_ERROR = require('../errors/ForbiddenError'); // 403
const NOT_FOUND_ERROR = require('../errors/NotFoundError'); // 404

const { deletionFilms } = ERROR_MESSAGES[200].movies;
const { savingFavourite } = ERROR_MESSAGES[201].movies;

const { cast } = ERROR_MESSAGES[400].users;
const { savingValidate } = ERROR_MESSAGES[400].movies;
const { lackOfAccess } = ERROR_MESSAGES[403].movies;
const { userIdNotFound, filmNotFound } = ERROR_MESSAGES[404].movies;

const Movie = require('../models/movie');

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
    .then(() => res.status(201).send({ message: savingFavourite }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new INACCURATE_DATA_ERROR(savingValidate));
      } else {
        next(err);
      }
    });
}

function receiveMovies(req, res, next) {
  const { _id } = req.user;
  Movie
    .find({ owner: _id })
    .populate('owner', '_id')
    .then((movies) => {
      if (movies) return res.send(movies);

      throw new NOT_FOUND_ERROR(userIdNotFound);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new INACCURATE_DATA_ERROR(cast));
      } else {
        next(err);
      }
    });
}

function deleteMovie(req, res, next) {
  const { id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie
    .findById({ _id: movieId })
    .then((movie) => {
      if (!movie) throw new NOT_FOUND_ERROR(filmNotFound);

      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() !== userId) {
        throw new FORBIDDEN_ERROR(lackOfAccess);
      }

      Movie
        .findByIdAndRemove({
          _id: movieId,
        })
        .then(() => res.send({ message: deletionFilms }))
        .catch(next);
    })
    .catch(next);
}

module.exports = {
  createMovie,
  deleteMovie,
  receiveMovies,
};
