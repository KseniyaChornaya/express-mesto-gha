const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getUserMe,
  updateUser,
} = require('../controllers/user');
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../utils/validations/user-validation');

router.get('/', getUsers);
router.get('/:userId', validateUserId, getUserById);
router.get('/me', getUserMe);
// router.post('/', validateUserInfo, createUser);
router.patch('/me', validateUserInfo, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateUser);

module.exports = router;
