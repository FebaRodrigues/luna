// routes/productRoutes.js
const express = require("express");
const { addProduct, getProducts, deleteProduct, updateProduct, getProductById } = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new product (Admin only)
router.post("/", protect, admin, addProduct);

// Get all products
router.get("/", getProducts);

// Get product by ID
router.get("/:id", getProductById); // Ensure this route is defined

// Update product (Admin only)
router.put("/:id", protect, admin, updateProduct);

// Delete product (Admin only)
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;