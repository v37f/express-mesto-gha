const NotFoundError = require('../errors/NotFoundError');

const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так...' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return Promise.reject(new NotFoundError('Карточка не найдена'));
      }
      return res.send({ message: 'Пост удалён' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неправильный формат _id карточки' });
        return;
      }
      if (err.name === 'NotFoundError') {
        res.status(err.statusCode).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Что-то пошло не так...' });
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
        return Promise.reject(new NotFoundError('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        if (err.path === 'likes') {
          res.status(400).send({ message: 'Передан некорректный _id пользователя' });
          return;
        }
        if (err.path === '_id') {
          res.status(400).send({ message: 'Передан некорректный _id карточки' });
          return;
        }
      }
      if (err.name === 'NotFoundError') {
        res.status(err.statusCode).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Что-то пошло не так...' });
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
        return Promise.reject(new NotFoundError('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        if (err.path === 'likes') {
          res.status(400).send({ message: 'Передан некорректный _id пользователя' });
          return;
        }
        if (err.path === '_id') {
          res.status(400).send({ message: 'Передан некорректный _id карточки' });
          return;
        }
      }
      if (err.name === 'NotFoundError') {
        res.status(err.statusCode).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};
