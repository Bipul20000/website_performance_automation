const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️  MongoDB connection failed: ${error.message}`);
    console.warn('⚠️  Server will continue running without database connection.');
    console.warn('⚠️  Please ensure MongoDB is running to use database features.');
  }
};

module.exports = connectDB;
