const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');


const MONGO_URI = 'mongodb+srv://Mentalist:Jane1234@cluster0.mwjjyjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

// DB connect
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // already connected
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err;
  }
};

app.use(
  cors({
    origin: ["https://nomads-jewelry-shopping-website-front.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

// Basic test route
app.get('/', async (req, res) => {
  try {
    await connectDB();
    res.status(200).send('MongoDB connected and server is live!');
  } catch (err) {
    res.status(500).send('Failed to connect to MongoDB.');
  }
});

// Routes
const authRoutes = require('../routes/authRoutes');
const orderRoutes = require('../routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Export serverless handler
module.exports = serverless(app);
