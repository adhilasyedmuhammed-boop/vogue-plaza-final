import { useMemo, useState } from 'react';
import { Heart, Minus, Plus, Ruler, ShoppingBag, Sparkles, Star, X } from 'lucide-react';

function ProductDetailsModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const addItem = () => {
    onAddToCart({ ...product, selectedSize, selectedColor, quantity });
    onClose();
  };

  return (
    <div className="detail-overlay" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <button className="modal-close" onClick={onClose} aria-label="Close details">
        <X size={22} />
      </button>
      <div className="detail-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.brand} exclusive</p>
          <h2>{product.name}</h2>
          <div className="detail-meta">
            <strong>{product.category}</strong>
            <span>
              <Star size={16} fill="currentColor" /> 4.9
            </span>
          </div>
          <p className="detail-price">${(product.price * quantity).toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>

          <div className="picker-group">
            <span>Color</span>
            <div className="picker-row">
              {product.colors.map((color) => (
                <button
                  className={selectedColor === color ? 'picker active' : 'picker'}
                  key={color}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="picker-group">
            <span>Size</span>
            <div className="picker-row">
              {product.sizes.map((size) => (
                <button
                  className={selectedSize === size ? 'size-chip active' : 'size-chip'}
                  key={size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-quantity">
            <span>Quantity</span>
            <div className="quantity-row">
              <button onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <strong>{quantity}</strong>
              <button onClick={() => setQuantity((current) => current + 1)} aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="spec-grid">
            <article>
              <Ruler size={18} />
              <span>Fit</span>
              <p>{product.fit}</p>
            </article>
            <article>
              <Sparkles size={18} />
              <span>Fabric</span>
              <p>{product.fabric}</p>
            </article>
          </div>

          <button className="button button-dark detail-add" onClick={addItem}>
            <ShoppingBag size={18} /> Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Categories({
  products,
  activeCategory,
  activeBrand,
  searchQuery,
  onCategoryChange,
  onBrandClear,
  onAddToCart,
  allCategories,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesBrand = activeBrand === 'All' || product.brand === activeBrand;
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.fabric.toLowerCase().includes(query);

      return matchesBrand && matchesCategory && matchesSearch;
    });
  }, [products, activeBrand, activeCategory, searchQuery]);

  const catalogTitle = activeBrand !== 'All'
    ? `${activeBrand} ${activeCategory === 'All' ? 'Edit' : activeCategory}`
    : activeCategory === 'All'
      ? 'Latest Luxury Arrivals'
      : activeCategory;

  return (
    <section className="catalog-section page-shell" id="catalog">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Marketplace Catalog</p>
          <h2>{catalogTitle}</h2>
        </div>
        <div className="catalog-controls">
          <button className={activeCategory === 'All' ? 'filter-pill active' : 'filter-pill'} onClick={() => onCategoryChange('All')}>
            All
          </button>
          {allCategories && allCategories.map((cat) => (
            <button 
              key={cat._id || cat.slug}
              className={activeCategory === cat.name ? 'filter-pill active' : 'filter-pill'} 
              onClick={() => onCategoryChange(cat.name)}
            >
              {cat.name}
            </button>
          ))}
          {activeBrand !== 'All' && (
            <button className="filter-pill" onClick={onBrandClear}>
              Clear {activeBrand}
            </button>
          )}
          <select aria-label="Sort products">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-count">{visibleProducts.length} luxury pieces available</div>

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product._id || product.id} onClick={() => setSelectedProduct(product)}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <button onClick={(event) => event.stopPropagation()} aria-label={`Save ${product.name}`}>
                <Heart size={18} />
              </button>
              <span className="view-tag">View Details</span>
            </div>
            <div className="product-info">
              <span>{product.brand}</span>
              <h3>{product.name}</h3>
              <p>{product.fabric}</p>
              <strong>${product.price.toFixed(2)}</strong>
            </div>
          </article>
        ))}
      </div>

      {visibleProducts.length === 0 && (
        <div className="empty-state">
          <ShoppingBag size={34} />
          <h3>No matching luxury pieces found</h3>
          <p>Try a broader category, clear the selected brand, or search by a different term.</p>
        </div>
      )}

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}
