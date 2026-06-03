const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name can not be more than 100 characters'],
  },
  slug: {
    type: String,
    unique: true,
    required: [true, 'Please add a slug for the product'],
  },
  category: {
    type: String,
    enum: ['motorcycle', 'scooter', 'electric'],
    required: [true, 'Please specify a category'],
  },
  engine_cc: Number, // For motorcycles/scooters
  torque_nm: Number, // For motorcycles/scooters
  range_km: Number, // For electric
  power_bhp: Number, // For electric
  price_min: {
    type: Number,
    required: [true, 'Please add a minimum price'],
  },
  price_max: {
    type: Number,
    required: [true, 'Please add a maximum price'],
  },
  badge: {
    type: String,
    enum: ['new', 'premia', 'bestseller', null],
    default: null,
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

// Previous fix: Add index to 'category' field for faster filtering
ProductSchema.index({ category: 1 });

// New fix: Add indexes for slug and is_featured to optimize specific queries
ProductSchema.index({ slug: 1 });
ProductSchema.index({ is_featured: 1 });

module.exports = mongoose.model('Product', ProductSchema);
