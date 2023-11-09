const EMAIL_REGEX = /.+@.+\..+/;
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const { MONGODB_URL = 'mongodb://0.0.0.0:27017/filmsdb' } = process.env;

const {
  NODE_ENV,
  SECRET_SIGNING_KEY,
  JWT_SECRET,
} = process.env;

module.exports = {
  NODE_ENV,
  SECRET_SIGNING_KEY,
  EMAIL_REGEX,
  URL_REGEX,
  MONGODB_URL,
  JWT_SECRET,
};
