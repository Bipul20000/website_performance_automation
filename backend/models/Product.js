const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['motorcycle', 'scooter', 'electric'],
    index: true, // Added index to speed up category-based queries
  },
  price_min: {
    type: Number,
    required: true,
  },
  price_max: {
    type: Number,
    required: true,
  },
  engine_cc: Number,
  torque_nm: Number,
  range_km: Number,
  power_bhp: Number,
  badge: {
    type: String,
    enum: ['new', 'premia', 'bestseller'],
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
