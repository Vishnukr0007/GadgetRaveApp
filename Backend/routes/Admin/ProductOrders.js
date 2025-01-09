const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../../Models/Order');
const router = express.Router();

// Secret key for JWT (store it in environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to verify JWT token and extract userId
const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  try {
    // Verify the token and extract userId from the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // Attach userId to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


// Route to place a new order
router.post('/api/orders', verifyToken, async (req, res) => {
  try {
    // Add userId to the order before saving it to the database
    const newOrder = new Order({
      ...req.body,
      userId: req.userId, // Attach userId to the order
    });

    await newOrder.save();
    res.status(201).send({ message: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to place order', details: err });
  }
});

// Route to fetch all orders (this could be restricted to admin or the user)
router.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch orders', details: err });
  }
});

// Route to update order status
router.put('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Assuming you use a MongoDB database and Mongoose
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





module.exports = router;
