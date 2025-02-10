// src/components/Confirmation.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const Confirmation = () => {
  return (
    <Card className="my-3">
      <Card.Body>
        <h2>Thank You for Your Purchase!</h2>
        <p>Your order has been successfully placed. You will receive a confirmation email shortly.</p>
      </Card.Body>
    </Card>
  );
};

export default Confirmation;