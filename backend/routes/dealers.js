const express = require('express');
const router = express.Router();
const {
  getAllDealers,
  getNearbyDealers,
} = require('../controllers/dealerController');

// /api/dealers/nearby must come before any /:param route
router.get('/nearby', getNearbyDealers);
router.get('/', getAllDealers);

module.exports = router;
