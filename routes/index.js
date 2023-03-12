const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { authValidation } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/not-found-error');

router.post('/signup', authValidation, createUser);
router.post('/signin', authValidation, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
