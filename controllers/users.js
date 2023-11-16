const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../utils/constants');
const { PASSWORD_REGEX } = require('../utils/validate');
const ERROR_MESSAGES = require('../utils/errorMes');

const INACCURATE_DATA_ERROR = require('../errors/InaccurateDataError'); // 400
const UNAUTHORIZED_ERROR = require('../errors/UnauthorizedError'); // 401
const NOT_FOUND_ERROR = require('../errors/NotFoundError'); // 404
const CONFLICT_ERROR = require('../errors/ConflictError'); // 409

const { registrationUsers } = ERROR_MESSAGES[201].users;

const {
  cast,
  passwordValidate,
  dataValidate,
} = ERROR_MESSAGES[400].users;

const { passIncorrect } = ERROR_MESSAGES[401].users;
const { idNotFound } = ERROR_MESSAGES[404].users;
const { emailDuplication } = ERROR_MESSAGES[409].users;

const User = require('../models/user');

function registerUser(req, res, next) {
  const { email, password, name } = req.body;

  if (!PASSWORD_REGEX.test(password)) {
    throw new INACCURATE_DATA_ERROR(passwordValidate);
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.status(201).send({ message: registrationUsers }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new CONFLICT_ERROR(emailDuplication));
      } else if (err.name === 'ValidationError') {
        next(new INACCURATE_DATA_ERROR(dataValidate));
      } else {
        next(err);
      }
    });
}

function loginUser(req, res, next) {
  const { email, password } = req.body;

  if (!PASSWORD_REGEX.test(password)) {
    throw new INACCURATE_DATA_ERROR(passwordValidate);
  }

  User
    .findUserByCredentials(email, password)
    .then(({ _id }) => {
      if (_id) {
        const token = jwt.sign(
          { _id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );

        return res.send({ token });
      }
      throw new UNAUTHORIZED_ERROR(passIncorrect);
    })
    .catch(next);
}

function getCurrentUserInfo(req, res, next) {
  const { _id } = req.user;

  User
    .findById(_id)
    .then((user) => {
      if (user) return res.send(user);
      throw new NOT_FOUND_ERROR(idNotFound);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new INACCURATE_DATA_ERROR(cast));
      } else {
        next(err);
      }
    });
}

function setCurrentUserInfo(req, res, next) {
  const { email, name } = req.body;
  const { _id } = req.user;

  User
    .findByIdAndUpdate(
      _id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.send(user);
      throw new NOT_FOUND_ERROR(idNotFound);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new CONFLICT_ERROR(emailDuplication));
      }

      if (err.name === 'CastError') {
        return next(new INACCURATE_DATA_ERROR(cast));
      }

      if (err.name === 'ValidationError') {
        return next(new INACCURATE_DATA_ERROR(dataValidate));
      }
      return next(err);
    });
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUserInfo,
  setCurrentUserInfo,
};
