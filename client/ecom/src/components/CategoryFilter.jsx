// src/components/CategoryFilter.jsx
import { Form } from 'react-bootstrap';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <Form.Select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} className="mb-3">
      <option value="">All Categories</option>
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </Form.Select>
  );
};

export default CategoryFilter;
