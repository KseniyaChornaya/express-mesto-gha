const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');
const { validateUser, validateUserLogin } = require('../utils/validations/user-validation');

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);
router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUser, createUser);
router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
