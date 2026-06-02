const News = require('../models/News');

// @desc    Get all news articles, sorted newest first, limit 6
// @route   GET /api/news
exports.getAllNews = async (req, res, next) => {
  try {
    const news = await News.find()
      .sort({ published_at: -1 })
      .limit(6);

    res.json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single news article by slug
// @route   GET /api/news/:slug
exports.getNewsBySlug = async (req, res, next) => {
  try {
    const article = await News.findOne({ slug: req.params.slug });

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'News article not found',
      });
    }

    res.json({
      success: true,
      data: article,
    });
  } catch (err) {
    next(err);
  }
};
