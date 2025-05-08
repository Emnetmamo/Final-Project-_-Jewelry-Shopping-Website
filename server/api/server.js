const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config');

dotenv.config();
connectDB();

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

app.get('/', (req, res) => {
  res.send('Hello, deployed successfully!');
});

// Export Express app wrapped in a handler for Vercel
const serverless = require('serverless-http');
module.exports = serverless(app);
