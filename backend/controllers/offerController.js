const Offer = require('../models/Offer');

// @desc    Get active offers that haven't expired
// @route   GET /api/offers
exports.getActiveOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find({
      is_active: true,
      valid_till: { $gte: new Date() },
    }).sort({ valid_till: 1 });

    res.json({
      success: true,
      count: offers.length,
      data: offers,
    });
  } catch (err) {
    next(err);
  }
};
