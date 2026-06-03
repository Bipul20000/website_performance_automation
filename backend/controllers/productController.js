const Product = require('../models/Product');

// @desc    Get all products, optionally filtered by category, with pagination
// @route   GET /api/products?category=motorcycle|scooter|electric&page=1&limit=10
exports.getAllProducts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 products per page
    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort({ price_min: 1 })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filter); // Get total count for pagination metadata

    res.json({
      success: true,
      count: products.length,
      total: totalProducts, // Add total count
      page: page,
      pages: Math.ceil(totalProducts / limit), // Add total pages
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single product by slug
// @route   GET /api/products/:slug
exports.getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get featured products only
// @route   GET /api/products/featured
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ is_featured: true }).sort({
      price_min: 1,
    });

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};
