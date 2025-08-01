const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');

router.get('/', getAllProducts);          // fix 2 
router.get('/:id', getProductById);      

module.exports = router;
