const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../Models/Admin');
const router = express.Router();

// Admin login
router.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create a token
    const token = jwt.sign({ id: admin._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

    // Return the token
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in admin' });
  }
});

module.exports = router;
