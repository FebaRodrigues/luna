// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = ({ setUser  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      localStorage.setItem('isAdmin', true); // Set admin status in local storage
      localStorage.setItem('token', response.data.token); // Store the token
      setUser ({ email }); // Set user state
      navigate('/admin'); // Redirect to admin dashboard
    } catch (error) {
      alert('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Admin Login</h1>
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
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default AdminLogin;