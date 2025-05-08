// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const authRoutes = require('../routes/authRoutes');
const orderRoutes = require('../routes/orderRoutes');

const app = express();

// MongoDB URI directly as a string
const MONGO_URI = 'mongodb+srv://Mentalist:Jane1234@cluster0.mwjjyjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Function to connect to MongoDB with retry logic
const connectDB = async (attempts = 5) => {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,   // Optional, remove deprecated options
        useUnifiedTopology: true, // Optional, remove deprecated options
        serverSelectionTimeoutMS: 5000, // Timeout for server connection (5 seconds)
      });
      console.log('MongoDB connected successfully.');
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, error);
      lastError = error;
      if (i < attempts - 1) {
        console.log('Retrying...');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retry
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
