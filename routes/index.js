const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const auth = require('../middlewares/auth');

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);
router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
