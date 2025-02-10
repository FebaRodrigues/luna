//models/Order.js

const mongoose = require("mongoose");
const User = require("./User"); 

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: "Pending" }, // Paid, Pending, Failed
  orderStatus: { type: String, default: "Processing" }, // Processing, Shipped, Delivered, Cancelled
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
