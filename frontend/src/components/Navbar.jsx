import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';

export default function Navbar({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  cartCount,
  onCartOpen,
  brands,
  onBrandChange,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  const chooseCategory = (category) => {
    onCategoryChange(category);
    setMobileOpen(false);
    setBrandsOpen(false);
  };

  const chooseBrand = (brand) => {
    onBrandChange(brand);
    setMobileOpen(false);
    setBrandsOpen(false);
  };

  return (
    <header className="top-header">
      <div className="utility-bar">
        <span>Complimentary delivery over $99</span>
        <span>Premium modestwear edits</span>
        <span>Easy returns</span>
      </div>

      <nav className="navbar page-shell" aria-label="Main navigation">
        <button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>

        <Link className="brand-mark" to="/" onClick={() => chooseCategory('All')}>
          Vogue Plaza
        </Link>

        <div className="desktop-menu">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? 'nav-link active' : 'nav-link'}
              key={category}
              onClick={() => chooseCategory(category)}
            >
              {category}
            </button>
          ))}
          <div className="brands-menu" onMouseLeave={() => setBrandsOpen(false)}>
            <button
              className="nav-link"
              onClick={() => setBrandsOpen((open) => !open)}
            >
              Brands
            </button>
            {brandsOpen && (
              <div className="brand-dropdown">
                {brands.map((brand) => (
                  <button key={brand} onClick={() => chooseBrand(brand)}>
                    <span>{brand}</span>
                    <small>View edit</small>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <label className="search-box" aria-label="Search products">
          <Search size={18} />
          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products or brands"
          />
        </label>

        <div className="nav-actions">
          <NavLink className="icon-button" to="/login" aria-label="Login">
            <UserRound size={21} />
          </NavLink>
          <button className="icon-button bag-button" onClick={onCartOpen} aria-label="Open shopping bag">
            <ShoppingBag size={21} />
            <span>{cartCount}</span>
          </button>
        </div>
      </nav>

      <div className={mobileOpen ? 'mobile-panel open' : 'mobile-panel'} aria-hidden={!mobileOpen}>
        <div className="mobile-panel-header">
          <Link className="brand-mark" to="/" onClick={() => setMobileOpen(false)}>
            Vogue Plaza
          </Link>
          <button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <label className="search-box mobile-search" aria-label="Search products">
          <Search size={18} />
          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products or brands"
          />
        </label>
        <div className="mobile-links">
          <button onClick={() => chooseCategory('All')}>New Arrivals</button>
          {categories.map((category) => (
            <button key={category} onClick={() => chooseCategory(category)}>
              {category}
            </button>
          ))}
          <span className="mobile-subtitle">Brands</span>
          {brands.map((brand) => (
            <button key={brand} onClick={() => chooseBrand(brand)}>
              {brand}
            </button>
          ))}
          <Link to="/login" onClick={() => setMobileOpen(false)}>
            Login
          </Link>
          <Link to="/register" onClick={() => setMobileOpen(false)}>
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
