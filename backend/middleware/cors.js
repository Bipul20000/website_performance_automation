const cors = require('cors');

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      process.env.FRONTEND_URL
    ];
    // Allow if no origin (e.g. mobile apps, curl), exact match, or any .vercel.app subdomain
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

module.exports = cors(corsOptions);
