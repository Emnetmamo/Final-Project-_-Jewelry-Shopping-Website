const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

// Replace with your actual Mongo URI
const MONGO_URI = 'mongodb+srv://Mentalist:Jane1234@cluster0.mwjjyjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const authRoutes = require('../routes/authRoutes');
const orderRoutes = require('../routes/orderRoutes');

const app = express();

// MongoDB connection caching for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Initial MongoDB connection happens outside the request cycle
connectDB().catch(console.error); // MongoDB initializes in the background

// Middleware
app.use(
  cors({
    origin: ['https://nomads-jewelry-shopping-website-front.vercel.app'],
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true,
  })
);

app.use(express.json());

// Route for quick check on MongoDB status
app.get('/', (req, res) => {
  res.send('Hello! Server is running. MongoDB is initializing in the background.');
});

// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Serverless export
module.exports = serverless(app);
