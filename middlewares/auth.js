const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../utils/constants');

function authorizeUser(req, _, next) {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return 'Неправильные почта или пароль';
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return 'Неправильные почта или пароль';
  }

  req.user = payload;

  return next();
}

module.exports = authorizeUser;
