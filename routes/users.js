const router = require('express').Router();
const { userValidation } = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);
router.get('/:userId', userValidation, getUserById);

router.patch('/me', userValidation, updateProfile);
router.patch('/me/avatar', userValidation, updateAvatar);

module.exports = router;
