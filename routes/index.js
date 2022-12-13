const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use(() => {
  throw new NotFoundError('Страница не нейдена');
});

module.exports = router;
