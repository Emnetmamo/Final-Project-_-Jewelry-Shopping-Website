const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// Import routes
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
// Add other routes here if needed

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "https://nomads-jewelry-shopping-website-front.vercel.app", // Your frontend domain
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// Parse incoming JSON requests
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://Mentalist:Jane1234@cluster0.mwjjyjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection failed:', error));


// Sample root route
app.get('/', (req, res) => {
  res.send('Hello, this is your server running on Vercel!');
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
