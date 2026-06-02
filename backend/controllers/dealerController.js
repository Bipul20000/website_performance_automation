const Dealer = require('../models/Dealer');

// @desc    Get all dealers, optionally filtered by city
// @route   GET /api/dealers?city=Mumbai
exports.getAllDealers = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.city) {
      filter.city = new RegExp(`^${req.query.city}$`, 'i');
    }

    const dealers = await Dealer.find(filter).sort({ city: 1, name: 1 });

    res.json({
      success: true,
      count: dealers.length,
      data: dealers,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get 3 nearest dealers using simple Euclidean distance on lat/lng
// @route   GET /api/dealers/nearby?lat=19.076&lng=72.877
exports.getNearbyDealers = async (req, res, next) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        error: 'Please provide lat and lng query parameters',
      });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    // Fetch all dealers that have coordinates
    const dealers = await Dealer.find({
      lat: { $exists: true, $ne: null },
      lng: { $exists: true, $ne: null },
    });

    // Calculate distance using simple Euclidean formula (good enough for nearby)
    const withDistance = dealers.map((dealer) => {
      const dLat = dealer.lat - userLat;
      const dLng = dealer.lng - userLng;
      const distance = Math.sqrt(dLat * dLat + dLng * dLng);
      return {
        ...dealer.toObject(),
        distance: parseFloat(distance.toFixed(4)),
      };
    });

    // Sort by distance and return closest 3
    withDistance.sort((a, b) => a.distance - b.distance);
    const closest = withDistance.slice(0, 3);

    res.json({
      success: true,
      count: closest.length,
      data: closest,
    });
  } catch (err) {
    next(err);
  }
};
