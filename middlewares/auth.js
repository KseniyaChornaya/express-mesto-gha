const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorisationError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AuthorisationError('Необходимо авторизоваться');
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (err) {
    throw new AuthorisationError('Необходимо авторизоваться');
  }
  req.user = payload;
  next();
};
