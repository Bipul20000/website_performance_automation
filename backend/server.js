const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Import middleware
const corsMiddleware = require('./middleware/cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const productRoutes = require('./routes/products');
const dealerRoutes = require('./routes/dealers');
const newsRoutes = require('./routes/news');
const offerRoutes = require('./routes/offers');
const healthRoutes = require('./routes/health');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply middleware
app.use(corsMiddleware);
app.use(logger);
app.use(morgan('dev'));

// Mount routes
app.use('/api/products', productRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/health', healthRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MotoVerse API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      dealers: '/api/dealers',
      news: '/api/news',
      offers: '/api/offers',
      health: '/api/health',
    },
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB (non-blocking — server starts even if DB is unavailable)
connectDB().catch(err => {
  console.error('MongoDB connection failed:', err.message);
  // The server is designed to start even if DB is unavailable,
  // so we just log the error and let the application continue.
  // Routes dependent on DB will likely fail and be handled by errorHandler.
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 MotoVerse server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
  });
}

module.exports = app;
