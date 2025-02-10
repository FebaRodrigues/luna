// src/pages/About.jsx
import { Container, Row, Col } from 'react-bootstrap';


const About = () => {
  return (
    <Container className="about-container">
      <h1 className="about-header">About Us</h1>
      <div className="about-section">
        <h3>Our Mission</h3>
        <p>
          ShopEasy is dedicated to providing a seamless online shopping experience, offering a wide range of products at competitive prices.
        </p>
      </div>
      <div className="about-section">
        <h3>Our Vision</h3>
        <p>
          We aim to be the leading online shopping destination, ensuring customer satisfaction through quality products and exceptional service.
        </p>
      </div>
      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>Email: <a href="mailto:support@shopeasy.com">support@shopeasy.com</a></p>
        <p>Phone: +123-456-7890</p>
      </div>
    </Container>
  );
};

export default About;