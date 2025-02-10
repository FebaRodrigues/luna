//contollers/productController.js
const Product = require("../models/Product");


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);  // Return the created product
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle errors
  }
};

const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(products);  // Return paginated products
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle errors
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });  // Success message
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle errors
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);  // Return the updated product
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle errors
  }
};

module.exports = { addProduct, getProducts, deleteProduct, updateProduct, getProductById };
