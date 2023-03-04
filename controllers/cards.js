const { BAD_REQUEST_STATUS_CODE, NOT_FOUND_STATUS_CODE, DEFAULT_ERROR_STATUS_CODE } = require('../utils/constants');

const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.send(card))
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

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ message: 'Пост удалён' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Неправильный формат _id карточки' });
        return;
      }
      res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        if (err.path === 'likes') {
          res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Передан некорректный _id пользователя' });
          return;
        }
        if (err.path === '_id') {
          res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Передан некорректный _id карточки' });
          return;
        }
      }
      res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        if (err.path === 'likes') {
          res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Передан некорректный _id пользователя' });
          return;
        }
        if (err.path === '_id') {
          res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Передан некорректный _id карточки' });
          return;
        }
      }
      res.status(DEFAULT_ERROR_STATUS_CODE).send({ message: 'Что-то пошло не так...' });
    });
};
