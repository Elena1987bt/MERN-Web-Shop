const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
} = require('../controllers/productController');

const auth = require('../middleware/auth');

router.get('/', getProducts);
router.post('/', auth, createProduct);
router.get('/find/:id', getProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);
router.get('/stats', auth, getProductStats);

module.exports = router;
