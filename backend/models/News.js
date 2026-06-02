const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'News title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
    },
    category: {
      type: String,
      enum: ['launch', 'event', 'award', 'corporate'],
      required: [true, 'News category is required'],
    },
    image_url: {
      type: String,
      trim: true,
    },
    published_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from title before saving
newsSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Indexes
// slug index created automatically by unique: true
newsSchema.index({ published_at: -1 });

module.exports = mongoose.model('News', newsSchema);
