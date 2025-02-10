// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check for token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(" ")[1];
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the user is an admin
      if (decoded.isAdmin) {
        // Fetch the admin user
        req.user = await Admin.findById(decoded.id).select("-password");
      } else {
        // Fetch the regular user
        req.user = await User.findById(decoded.id).select("-password");
      }

      // If user or admin not found, return unauthorized
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };