const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const { BAD_REQUEST_STATUS_CODE, NOT_FOUND_STATUS_CODE, DEFAULT_ERROR_STATUS_CODE } = require('../utils/constants');

const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Некорректный формат _id пользователя' });
        return;
      }
      res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((passwordHash) => User.create({
      email,
      password: passwordHash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_STATUS_CODE).send(
          {
            message: err.errors[Object.keys(err.errors)[0]].message,
          },
        );
        return;
      }
      res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User
    .findOne({ email })
    .orFail(() => res.status(401).send({ message: 'Неправильная почта или пароль' }))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      return res.status(401).send({ message: 'Неправильная почта или пароль' });
    }))
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, 'JWT_SECRET', { expiresIn: '7d' });
      res.cookie('jwt', jwt, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).end();
    })
    .catch((err) => console.log(err));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_STATUS_CODE).send(
          {
            message: err.errors[Object.keys(err.errors)[0]].message,
          },
        );
        return;
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Некорректный формат _id пользлователя' });
        return;
      }
      res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_STATUS_CODE).send(
          {
            message: err.errors[Object.keys(err.errors)[0]].message,
          },
        );
        return;
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Некорректный формат _id пользлователя' });
        return;
      }
      res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' });
    });
};
