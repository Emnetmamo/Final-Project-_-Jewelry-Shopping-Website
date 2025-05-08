const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const connectDB = require('../config'); 
const authRoutes = require('../routes/authRoutes');
const orderRoutes = require('../routes/orderRoutes');

dotenv.config();

const app = express();

const initializeDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await connectDB();
  } catch (err) {
    console.error('Error during MongoDB initialization:', err);
    throw new Error('MongoDB initialization failed');
  }
};


initializeDB()
  .then(() => {
    console.log("MongoDB initialized successfully.");
  })
  .catch((err) => {
    console.error("Error initializing MongoDB:", err);
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
