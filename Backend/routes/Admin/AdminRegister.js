const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../../Models/Admin'); // Import Admin model
const router = express.Router();

// Register Admin
router.post('/api/admin/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword
    });

    // Save to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering admin' });
  }
});

module.exports = router;
