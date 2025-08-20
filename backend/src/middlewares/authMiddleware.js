

const jwt = require("jsonwebtoken");
const config = require("../config");
const status = require("http-status-codes");

const JWT_SECRET = config.serverConfig.jwtSecret;


// Middleware to verify JWT token from cookies
const authMiddleware = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(status.StatusCodes.BAD_GATEWAY).json({ error: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user info to request for use in controllers
    req.user = decoded;

    next(); // Proceed to next middleware/controller
  } catch (err) {
    console.error("AuthMiddleware Error:", err.message);
    return res.status().json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
