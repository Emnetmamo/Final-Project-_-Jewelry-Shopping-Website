const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecretkey'; 
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
      const user = await User.findOne({ username });
      if (!user) {
        console.log("== USER NOT FOUND ==");
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("== PASSWORD MISMATCH ==");
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '1d' });
  
      return res.json({ token, user: { id: user._id, username: user.username } });
  
    } catch (err) {
      console.error("== SERVER ERROR ==", err);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  



