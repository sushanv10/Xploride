const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Check if Authorization header is present
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract token from Authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Token decoded:", decoded)
    // Attach user details to req.user
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };
    next();
  } catch (err) {
   if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
      return res.status(401).json({ msg: 'Token is not valid' }); 
  } 
};

module.exports = authMiddleware;
