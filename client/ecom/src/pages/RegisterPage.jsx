// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      console.log('Registration successful:', response.data);
      // Redirect to login page or home page after successful registration
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please check your input and try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {error && <p className="text-danger">{error}</p>}
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default RegisterPage;