// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

dotenv.config();

const connectDB = require('../config');
const authRoutes = require('../routes/authRoutes');
const orderRoutes = require('../routes/orderRoutes');

const app = express();

app.use(
  cors({
    origin: ["https://nomads-jewelry-shopping-website-front.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', async (req, res) => {
  try {
    res.send('Hello, deployed successfully!');
  } catch (err) {
    console.error('Error in root route:', err);
    res.status(500).send('Something went wrong.');
  }
});

// Only connect when invoked
let isConnected = false;

app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error('MongoDB connection failed:', err);
      return res.status(500).send('MongoDB connection failed');
    }
  }
  next();
});

module.exports = serverless(app);
