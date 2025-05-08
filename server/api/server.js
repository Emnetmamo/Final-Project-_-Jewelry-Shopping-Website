// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const authRoutes = require('../routes/authRoutes');
const orderRoutes = require('../routes/orderRoutes');

dotenv.config();

const app = express();

// MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Function to connect to MongoDB with retry logic
const connectDB = async (attempts = 5) => {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully.');
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, error);
      lastError = error;
      if (i < attempts - 1) {
        console.log('Retrying...');
        await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds before retry
      }
    }
  }
  console.error('MongoDB connection failed after multiple attempts:', lastError);
  throw lastError; // Throw error if all attempts fail
};

// Initialize MongoDB connection
connectDB().catch(err => {
  console.error("Error initializing MongoDB:", err);
  process.exit(1); // Exit if MongoDB connection fails
});

// CORS configuration
app.use(
  cors({
    origin: ["https://nomads-jewelry-shopping-website-front.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// Parse incoming JSON requests
app.use(express.json());

// Sample root route
app.get('/', (req, res) => {
  res.send('Hello, MongoDB connected successfully!');
});

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Export the serverless handler for Vercel
module.exports = serverless(app);
