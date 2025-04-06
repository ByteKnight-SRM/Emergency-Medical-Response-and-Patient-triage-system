// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
  // roles can be a single role string or an array of roles
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (roles.length && !roles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        next();
      } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
      }
    },
  ];
};

module.exports = auth;
