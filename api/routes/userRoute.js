const express = require('express');
const router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserStats,
} = require('../controllers/userController');

const auth = require('../middleware/auth');

router.get('/', auth, getUsers);
router.get('/find/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/stats', auth, getUserStats);

module.exports = router;
