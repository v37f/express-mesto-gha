const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
