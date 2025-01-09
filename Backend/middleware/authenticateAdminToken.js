const jwt = require('jsonwebtoken');

const authenticateAdminToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token, authorization denied' });
  }

  try {
    const verified = jwt.verify(token.split(' ')[1], 'YOUR_SECRET_KEY');
    req.admin = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticateAdminToken;
