// server/config.js
const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Using existing DB connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
};


module.exports = connectDB;
