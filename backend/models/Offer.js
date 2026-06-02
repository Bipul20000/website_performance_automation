const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Offer title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    discount_type: {
      type: String,
      enum: ['flat', 'percent', 'cashback', 'emi'],
      required: [true, 'Discount type is required'],
    },
    discount_value: {
      type: Number,
      required: [true, 'Discount value is required'],
      min: 0,
    },
    valid_till: {
      type: Date,
      required: [true, 'Valid till date is required'],
    },
    applicable_on: {
      type: [String],
      default: [],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for querying active, non-expired offers
offerSchema.index({ is_active: 1, valid_till: 1 });

module.exports = mongoose.model('Offer', offerSchema);
