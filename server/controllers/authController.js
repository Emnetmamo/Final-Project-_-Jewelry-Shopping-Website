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
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }
  
    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        console.log("== USER NOT FOUND ==");
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("== PASSWORD MISMATCH ==");
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  
      // Return the token and user details
      return res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
      console.error("== SERVER ERROR ==", err);  // Log the entire error
      return res.status(500).json({ message: 'Server error', error: err.message });  // Include error message
    }
  };
  