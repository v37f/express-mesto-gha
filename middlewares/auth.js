const jsonwebtoken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { JWT_SECRET } = require('../config');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  let jwt;
  // Если токен есть в куках то берем его из куков, если нет, проверяем
  // заголовок авторизации, если в заголовок есть и в нем есть токен, берем
  // токен из заголовка, если и в заголовке нет токена, то передаем ошибку
  // авторизации в централизованный обработчик ошибок
  if (req.cookies.jwt) {
    jwt = req.cookies.jwt;
  } else if (authorization && authorization.startsWith('Bearer')) {
    jwt = authorization.replace('Bearer ', '');
  } else {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Некорректный токен'));
    return;
  }

  req.user = payload;
  next();
};
