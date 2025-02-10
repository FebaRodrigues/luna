// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details or decode token to check if admin
      setUser({ name: 'Admin', role: 'admin' }); // Mock user object
    }
  }, []);

  return user;
};

export default useAuth;
