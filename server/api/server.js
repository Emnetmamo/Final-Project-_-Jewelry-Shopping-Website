const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');


const MONGO_URI = 'mongodb+srv://Mentalist:Jane1234@cluster0.mwjjyjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const authRoutes = require('../routes/authRoutes');
const orderRoutes = require('../routes/orderRoutes');

const app = express();


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

// Middleware
app.use(
  cors({
    origin: ['https://nomads-jewelry-shopping-website-front.vercel.app'],
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true,
  })
);

app.use(express.json());


app.get('/', async (req, res) => {
  connectDB().catch(console.error); 
  res.send('Hello! Server is running. MongoDB connection will initialize if not yet connected.');
});


app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

module.exports = serverless(app);
