const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../../Models/Order');
const router = express.Router();

// Secret key for JWT (store it in an environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  try {
    // Verify the token and extract the user info
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // Store user ID in the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Route to get orders for the authenticated user
router.get('/api/userorders', verifyToken, async (req, res) => {
  try {
    // Get orders for the authenticated user
    const orders = await Order.find({ userId: req.userId });

    // If no orders are found for the user, return a specific message
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Return the orders placed by the user
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err });
  }
});

module.exports = router;
