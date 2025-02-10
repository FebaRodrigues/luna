// src/pages/Home.jsx
import { useState, useContext } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { ProductContext } from '../context/ProductContext';

const Home = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, handleAddToCart }) => {
  const { products, categories } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Filter products based on search query and selected category
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true)
    );
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      <h1 className="my-4">Welcome to ShopEasy</h1>
      <p className="lead">Your one-stop shop for the latest trends in fashion, footwear, and accessories. Discover our exclusive collections and enjoy seamless shopping experience.</p>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Featured Products Section */}
      <h3 className="mb-4">Featured Products</h3>
      <Row className="g-4">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <Col key={product.id} xs={12} md={4}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Col>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </Row>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            active={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {/* Promotional Banner */}
      <Card className="my-4 text-center">
        <Card.Body>
          <h4>Exclusive Offer!</h4>
          <p>Get 20% off on your first purchase. Use code: WELCOME20</p>
          <Button variant="primary">Shop Now</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;