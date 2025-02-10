// src/pages/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Toast } from 'react-bootstrap';
import { products as productData } from '../data/products'; // Import your products data

const ProductPage = ({ onAddToCart }) => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [showToast, setShowToast] = useState(false); // State for the toast notification

  useEffect(() => {
    // Find the product by ID
    const foundProduct = productData.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    onAddToCart(product);
    setShowToast(true); // Show the toast notification
    setTimeout(() => setShowToast(false), 2000); // Hide the toast after 2 seconds
  };

  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div>
      <Card className="my-3">
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            <strong>Price: ${product.price.toFixed(2)}</strong>
            <br />
            <small className="text-muted">Category: {product.category}</small>
            <br />
            {/* Use a div instead of a p tag for the description */}
            <div>{product.description}</div>
          </Card.Text>
          <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
        </Card.Body>
      </Card>

      {/* Toast Notification */}
      <Toast 
        onClose={() => setShowToast(false)} 
        show={showToast} 
        delay={3000} 
        autohide 
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        <Toast.Body>{product.name} has been added to your cart!</Toast.Body>
      </Toast>
    </div>
  );
};

export default ProductPage;