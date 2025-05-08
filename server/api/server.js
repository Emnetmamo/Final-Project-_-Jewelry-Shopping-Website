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

// Check if the database is already connected
if (mongoose.connection.readyState === 0) {
  console.log('MongoDB is not connected. Establishing a connection...');
  
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout for server connection (5 seconds)
  })
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if MongoDB connection fails
  });
} else {
  console.log('MongoDB is already connected.');
}

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
