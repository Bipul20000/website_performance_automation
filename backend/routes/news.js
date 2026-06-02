const express = require('express');
const router = express.Router();
const {
  getAllNews,
  getNewsBySlug,
} = require('../controllers/newsController');

router.get('/', getAllNews);
router.get('/:slug', getNewsBySlug);

module.exports = router;
