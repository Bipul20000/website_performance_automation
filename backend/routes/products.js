const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts,
} = require('../controllers/productController');

// /api/products/featured must come before /api/products/:slug
router.get('/featured', getFeaturedProducts);
router.get('/', getAllProducts);
router.get('/:slug', getProductBySlug);

module.exports = router;
