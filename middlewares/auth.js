const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../utils/constants');
const UNAUTHORIZED_ERROR = require('../errors/UnauthorizedError'); // 401
const ERROR_MESSAGES = require('../utils/errorMes');

const { passIncorrect } = ERROR_MESSAGES[401].users;

function auth(req, _, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UNAUTHORIZED_ERROR(passIncorrect));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UNAUTHORIZED_ERROR(passIncorrect));
  }
  req.user = payload;

  return next();
}

module.exports = auth;
