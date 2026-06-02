const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Dealer name is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    is_premia: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
dealerSchema.index({ city: 1 });
dealerSchema.index({ state: 1 });

module.exports = mongoose.model('Dealer', dealerSchema);
