// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header'; // Import your Header component
import Footer from './components/Footer'; // Import your Footer component
import ProductList from './components/ProductList'; // Import your ProductList component
import Cart from './components/Cart'; // Import your Cart component
import Checkout from './components/Checkout'; // Ensure this matches your file name
import Confirmation from './components/Confirmation'; // Import your Confirmation component
import LoginPage from './pages/LoginPage'; // Import your LoginPage component
import RegisterPage from './pages/RegisterPage'; // Import your RegisterPage component
import About from './pages/About'; // Import your About page
import Home from './pages/Home'; // Import your Home page
import ProductPage from './pages/ProductPage'; // Import your ProductPage component
import AdminDashboard from './pages/AdminDashboard'; // Import your AdminDashboard component
import AdminLogin from './pages/AdminLogin'; // Import your AdminLogin component
import { products as productData } from './data/products'; // Import your product data
import { ProductProvider } from './context/ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './styles/custom.css'; // Import your custom styles

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin) {
      setUser ({ email: 'admin@example.com' }); // Set admin user if applicable
    }
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id);
      if (itemIndex === -1) {
        return [...prevItems, { ...product, quantity: 1 }];
      } else {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ProductProvider>
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header cartCount={cartItems.length} user={user} setUser ={setUser } />
        <main className="flex-shrink-0">
          <Container>
            <Routes>
              <Route path="/" element={<Home 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                categories={[...new Set(productData.map(product => product.category))]} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                filteredProducts={productData.filter(product => 
                  (!selectedCategory || product.category === selectedCategory) && 
                  product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )} 
                handleAddToCart={handleAddToCart} 
              />} />
              <Route path="/products" element={<ProductList onAddToCart={handleAddToCart} />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart 
                cartItems={cartItems} 
                onRemoveFromCart={handleRemoveFromCart} 
                onIncreaseQuantity={(id) => handleAddToCart({ id })} // Adjust as needed
                onDecreaseQuantity={(id) => handleRemoveFromCart(id)} // Adjust as needed
                user={user} 
              />} />
              <Route path="/checkout" element={<Checkout 
                cartItems={cartItems} 
                clearCart={clearCart} 
              />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/login" element={<LoginPage setUser ={setUser } />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/product/:id" element={<ProductPage onAddToCart={handleAddToCart} />} />
              <Route path="/admin" element={user && localStorage.getItem('isAdmin') ? <AdminDashboard /> : <AdminLogin setUser ={setUser } />} />
              <Route path="/admin-login" element={<AdminLogin setUser ={setUser } />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
    </ProductProvider>
  );
}

export default App;