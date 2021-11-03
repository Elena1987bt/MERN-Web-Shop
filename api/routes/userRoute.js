const express = require('express');
const router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// const auth = require('../middleware/auth');

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
