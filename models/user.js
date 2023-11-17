const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const NOT_FOUND_ERROR = require('../errors/NotFoundError');
const ERROR_MESSAGES = require('../utils/errorMes');

const { emailNotFound } = ERROR_MESSAGES[404].users;

const { EMAIL_REGEX } = require('../utils/validate');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => EMAIL_REGEX.test(email),
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      required: true,
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,

      },
    },
  },

  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return (
          this
            .findOne({ email })
            .select('+password')
        )
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password)
                .then((matched) => {
                  if (matched) return user;

                  return Promise.reject();
                });
            }

            throw new NOT_FOUND_ERROR(emailNotFound);
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
