import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="category-tile"
      onClick={() => onSelect(category.name)}
    >
      <div className="category-tile-image">
        <img src={category.img} alt={category.alt || category.name} />
        <div className="category-tile-overlay">
          <div className="category-tile-content">
            <h3>{category.name}</h3>
            <span className="category-tile-action">
              Explore Collection <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function CategoryGrid({ categories, onCategorySelect }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="category-grid-section page-shell" id="categories">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Discover Departments</p>
          <h2>Shop by Category</h2>
        </div>
        <p>
          Explore our meticulously curated departments, from high-end tailoring to 
          exclusive accessories and family occasion edits.
        </p>
      </div>

      <div className="category-mosaic">
        {categories.map((category) => (
          <CategoryCard 
            key={category._id || category.slug} 
            category={category} 
            onSelect={onCategorySelect} 
          />
        ))}
      </div>
    </section>
  );
}
