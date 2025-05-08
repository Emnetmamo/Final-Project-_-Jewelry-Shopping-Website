const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';  // Use environment variable for secret key


// User Signup
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received data:', { username, email, password });  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error('Error:', err);  
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  // User Login
  exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      // Find the user in the database by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the provided password with the stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id },  
        JWT_SECRET,   
        { expiresIn: '1d' } 
      );

      res.status(200).json({
        message: 'Login successful',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        token,  
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };