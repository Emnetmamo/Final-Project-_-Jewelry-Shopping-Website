// server/config.js
const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Reusing MongoDB connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI); 
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error('MongoDB connection failed');
  }
};

module.exports = connectDB;
