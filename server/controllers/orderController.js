//contollers/orderController.js

const Order = require("../models/Order");
const Product = require("../models/Product");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress, paymentMethod } = req.body;

    // Validate input
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Check if all products exist
    const productIds = items.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== items.length) {
      return res.status(400).json({ message: "One or more products not found" });
    }

    // Create the order
    const order = new Order({
      userId: req.user._id,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error); // Log the error for debugging
    res.status(500).json({ message: "Error creating order", error: error.message }); // Return the error message
  }
};

// Get all orders (Admin)
const getOrders = async (req, res) => {
  try {
    console.log("Admin requesting all orders:", req.user); // Log the user making the request
    const orders = await Order.find().populate("userId", "name email");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error); // Log error details
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// Get order by ID (User/Admin)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId", "name email");
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Allow access only if the order belongs to the user or the user is an admin
    if (req.user._id.toString() !== order.userId._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus || order.orderStatus;
    order.paymentStatus = paymentStatus || order.paymentStatus;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// Delete an order (Admin only)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
