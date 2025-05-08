// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const authRoutes = require('../routes/authRoutes');
const orderRoutes = require('../routes/orderRoutes');

const app = express();

// MongoDB URI directly as a string (use the correct URI)
const MONGO_URI = 'mongodb+srv://Mentalist:Jane1234@cluster0.mwjjyjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Function to handle MongoDB connection
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout for server connection (5 seconds)
      });
      console.log('MongoDB connected successfully.');
    } else {
      console.log('MongoDB is already connected.');
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit if MongoDB connection fails
  }
};

// Establish connection when the server starts
connectDB();

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
