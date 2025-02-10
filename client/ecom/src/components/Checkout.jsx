// src/components/Checkout.jsx
import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = (method) => {
    // Simulate payment processing
    console.log(`Proceeding with payment via ${method}`);
    // After payment, clear the cart and navigate to confirmation
    clearCart(); // Clear the cart items
    navigate('/confirmation'); // Redirect to confirmation page
  };

  return (
    <Card className="my-3">
      <Card.Body>
        <h2>Checkout</h2>
        <h5>Your Order Summary:</h5>
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item.id}>
              {item.name} - {item.quantity} x ${item.price.toFixed(2)}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="mt-3">Total Price: ${totalPrice.toFixed(2)}</h5>
        <h5 className="mt-4">Select Payment Method:</h5>
        <Button variant="primary" className="mb-2" onClick={() => handlePayment('Credit Card')}>Credit Card</Button>
        <Button variant="secondary" className="mb-2" onClick={() => handlePayment('PayPal')}>PayPal</Button>
        <Button variant="success" className="mb-2" onClick={() => handlePayment('Cash on Delivery')}>Cash on Delivery</Button>
      </Card.Body>
    </Card>
  );
};

export default Checkout;