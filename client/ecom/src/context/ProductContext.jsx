// src/context/ProductContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products'; // Import your products
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts); // Set initial products
  const [categories, setCategories] = useState([]);

  // Fetch categories if needed
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories }}>
      {children}
    </ProductContext.Provider>
  );
};