const router = require('express').Router();
const { validateUserInfo, validateUserId } = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);

router.patch('/me', validateUserInfo, updateProfile);
router.patch('/me/avatar', validateUserInfo, updateAvatar);

module.exports = router;
