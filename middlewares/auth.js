const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    throw new AuthorizationError('Необходимо авторизоваться');
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (err) {
    console.log(err.name);
    throw new AuthorizationError('Необходимо авторизоваться');
  }
  req.user = payload;
  next();
};

