
//routes/orderRoutes.js
const express = require("express");
const { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create an order (User only)
router.post("/", protect, createOrder);

// Get all orders (Admin only)
router.get("/", protect, admin, getOrders);

// Get single order by ID (User/Admin)
router.get("/:id", protect, getOrderById);

// Update order status (Admin only)
router.put("/:id", protect, admin, updateOrderStatus);

// Delete an order (Admin only)
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;
