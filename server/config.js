const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Reusing MongoDB connection");
    return; 
  }

  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };

    await mongoose.createConnection(process.env.MONGO_URI, options);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error('MongoDB connection failed');
  }
};

module.exports = connectDB;
