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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' });
    });
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
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные' });
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
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Некорректный формат _id пользлователя' });
        return;
      }
      res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' });
    });
};
