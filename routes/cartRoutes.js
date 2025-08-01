const express = require('express');
const router = express.Router();
const {
  addToCart,
  updateCartItem,
  removeCartItem
} =require('../controllers/cartController');

const authMiddleware = require('../middleware/authMiddleware');
router.post('/', authMiddleware, addToCart);
 router.put('/:id', authMiddleware, updateCartItem);
router.delete('/:id', authMiddleware, removeCartItem);


module.exports = router;

