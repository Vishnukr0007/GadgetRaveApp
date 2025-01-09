const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use secret from environment variables
    req.user = decoded; // Attach user info (from token payload) to req.user
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;
