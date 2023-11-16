const { MONGODB_URL = 'mongodb://0.0.0.0:27017/filmsdb' } = process.env;

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  NODE_ENV,
  MONGODB_URL,
  JWT_SECRET,
};
