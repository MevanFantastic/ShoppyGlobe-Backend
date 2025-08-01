const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');

router.get('/', getAllProducts);          // GET /products
router.get('/:id', getProductById);      // GET /products/:id

module.exports = router;
