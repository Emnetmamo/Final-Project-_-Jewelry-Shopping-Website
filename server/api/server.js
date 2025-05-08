const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

dotenv.config();

const connectDB = require('../config');
const authRoutes = require('../routes/authRoutes');
const orderRoutes = require('../routes/orderRoutes');

const app = express();

// MongoDB connection flag
let isConnected = false;

// Middleware to connect to DB before handling any route
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("MongoDB connected");
    } catch (err) {
      console.error('MongoDB connection failed:', err);
      return res.status(500).send('MongoDB connection failed');
    }
  }
  next();
});

app.use(
  cors({
    origin: ["https://nomads-jewelry-shopping-website-front.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, deployed successfully!');
});

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Export serverless handler
module.exports = serverless(app);
