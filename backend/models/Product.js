const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: String,
      enum: ['motorcycle', 'scooter', 'electric'],
      required: [true, 'Category is required'],
    },
    engine_cc: {
      type: Number,
      min: 0,
    },
    torque_nm: {
      type: Number,
      min: 0,
    },
    torque_rpm: {
      type: Number,
      min: 0,
    },
    power_bhp: {
      type: Number,
      min: 0,
    },
    cooling: {
      type: String,
      trim: true,
    },
    price_min: {
      type: Number,
      min: 0,
    },
    price_max: {
      type: Number,
      min: 0,
    },
    image_url: {
      type: String,
      trim: true,
    },
    badge: {
      type: String,
      enum: ['new', 'premia', 'bestseller', null],
      default: null,
    },
    is_electric: {
      type: Boolean,
      default: false,
    },
    range_km: {
      type: Number,
      min: 0,
    },
    features: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from name before saving
productSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Indexes
// slug index created automatically by unique: true
productSchema.index({ category: 1 });
productSchema.index({ is_featured: 1 });

module.exports = mongoose.model('Product', productSchema);
