const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../Models/LoginSignUp');
const router = express.Router();

// Secret key for signing JWT tokens (should be stored in an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use environment variable in production

// User Login Route
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send token as cookie (with secure flag in production)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only true in production
      maxAge: 24 * 60 * 60 * 1000, // Expiry time (24 hours)
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// User Registration Route
router.post('/api/signup', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password, termsAccepted } = req.body;

  // Validate termsAccepted
  if (!termsAccepted) {
    return res.status(400).json({ error: 'You must accept the terms of service' });
  }

  // Validate phoneNumber format (simple check)
  const phoneRegex = /^[0-9]{10}$/; // Adjust to your desired phone format
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      termsAccepted,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '24h' });

    // Set token as a secure cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure the secure flag is set in production
      maxAge: 3600000, // 1 hour expiration
    });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// User Authentication Route (Protecting Routes)
router.get('/api/user', async (req, res) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify JWT Token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details
    res.json({ name: user.firstName, email: user.email });
  } catch (err) {
    console.error('Invalid or expired token:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

// Route to get all users (for demonstration purposes)
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

module.exports = router;
