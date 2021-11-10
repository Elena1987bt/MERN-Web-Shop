const express = require('express');
const router = express.Router();
const {
  getOrders,
  getUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getMonthlyIncome,
} = require('../controllers/orderController');

const auth = require('../middleware/auth');

router.get('/', auth, getOrders);
router.post('/', auth, createOrder);
router.get('/find/:userId', auth, getUserOrders);
router.put('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);
router.get('/income', auth, getMonthlyIncome);
module.exports = router;
