const router = require('express').Router();
const { validateCard } = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCard, createCard);

router.delete('/:cardId', validateCard, deleteCard);

router.put('/:cardId/likes', validateCard, likeCard);
router.delete('/:cardId/likes', validateCard, dislikeCard);

module.exports = router;
