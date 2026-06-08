import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX = 160;
  const long = review.text.length > MAX;
  const text = expanded ? review.text : review.text.slice(0, MAX) + (long ? '...' : '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="review-card"
    >
      <Quote size={40} className="review-quote-icon" />
      
      <div className="review-stars">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < (review.stars || review.rating) ? "currentColor" : "none"} 
          />
        ))}
      </div>

      <p className="review-text">
        "{text}"
        {long && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: 0, 
              color: 'var(--gold-deep)',
              fontWeight: 800,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              marginLeft: '8px',
              cursor: 'pointer'
            }}
          >
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </p>

      <div className="review-footer">
        <strong>{review.name || review.author}</strong>
        <span>{review.status || (review.date ? `Verified Client • ${review.date}` : 'Verified Client')}</span>
      </div>
    </motion.div>
  );
};

const Reviews = ({ reviews }) => {
  const displayReviews = reviews && reviews.length > 0 ? reviews : [];

  return (
    <section className="reviews-section">
      <div className="page-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Client Testimonials</p>
            <h2>Verified Feedback</h2>
          </div>
          <p>
            Discover what our guests are saying about their shopping experiences 
            and our commitment to world-class service.
          </p>
        </div>

        <div className="review-grid">
          {displayReviews.map((r) => (
            <ReviewCard key={r._id || r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;