const jsonwebtoken = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const jwt = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
};
