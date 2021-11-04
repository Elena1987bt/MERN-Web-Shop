const express = require('express');
const router = express.Router();
const {
  getCart,
  getCarts,
  createCart,
  updateCart,
  deleteCart,
} = require('../controllers/cartController');

const auth = require('../middleware/auth');

router.get('/', getCarts);
router.post('/', auth, createCart);
router.get('/find/:userId', getCart);
router.put('/:id', auth, updateCart);
router.delete('/:id', auth, deleteCart);
module.exports = router;
