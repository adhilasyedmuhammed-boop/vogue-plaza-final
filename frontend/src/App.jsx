import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Brands from './components/Brands';
import CategoryGrid from './components/CategoryGrid';
import Categories from './components/Categories';
import Reviews from './components/Reviews';
import CartDrawer from './components/CartDrawer';
import Login from './components/Login';
import Register from './components/Register';
import MapSection from './components/MapSection';
import './App.css';

function Storefront({
  inventoryItems,
  activeCategory,
  activeBrand,
  searchQuery,
  setActiveCategory,
  setActiveBrand,
  addToCart,
  reviews,
  allCategories,
}) {
  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="hero-section" aria-label="Vogue Plaza premium modest fashion">
        <div className="hero-media">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2400&auto=format&fit=crop"
            alt="Elegant luxury fashion department store"
          />
        </div>
        <div className="hero-content page-shell">
          <p className="eyebrow">Premium modest marketplace</p>
          <h1>Vogue Plaza</h1>
          <p>
            A spacious Shoppers Stop inspired luxury storefront for refined apparel, beauty,
            footwear, watches, and family occasion edits.
          </p>
          <div className="hero-actions">
            <button className="button button-dark" onClick={scrollToCatalog}>
              Shop arrivals <ArrowRight size={18} />
            </button>
            <button
              className="button button-light"
              onClick={() => {
                setActiveBrand('Gucci');
                setActiveCategory('All');
                setTimeout(scrollToCatalog, 0);
              }}
            >
              Explore brands
            </button>
          </div>
        </div>
      </section>

      <section className="service-strip page-shell" aria-label="Shopping benefits">
        <article>
          <Truck size={22} />
          <span>White glove delivery</span>
          <p>Complimentary premium delivery on curated luxury orders.</p>
        </article>
        <article>
          <ShieldCheck size={22} />
          <span>Secure checkout</span>
          <p>Billing, mock card payment, and receipt handled in one clean funnel.</p>
        </article>
        <article>
          <Sparkles size={22} />
          <span>Brand-led edits</span>
          <p>Armani, Gucci, Versace, Burberry, Prada, Rolex, and Chanel.</p>
        </article>
      </section>

      <Brands
        brands={[...new Set(inventoryItems.map((item) => item.brand))]}
        activeBrand={activeBrand}
        activeCategory={activeCategory}
        onBrandSelect={(brand) => {
          setActiveBrand(brand);
          setActiveCategory('All');
        }}
        onCategorySelect={setActiveCategory}
      />

      <CategoryGrid 
        categories={allCategories} 
        onCategorySelect={setActiveCategory} 
      />

      <Categories
        products={inventoryItems}
        activeCategory={activeCategory}
        activeBrand={activeBrand}
        searchQuery={searchQuery}
        onCategoryChange={setActiveCategory}
        onBrandClear={() => setActiveBrand('All')}
        onAddToCart={addToCart}
        allCategories={allCategories}
      />

      {reviews && reviews.length > 0 && <Reviews reviews={reviews} />}

      <MapSection />
    </>
  );
}

function AppShell() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('vogue_plaza_bag')) || [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      try {
        const [productsRes, categoriesRes, reviewsRes] = await Promise.all([
          axios.get(`${baseUrl}/products`),
          axios.get(`${baseUrl}/categories`),
          axios.get(`${baseUrl}/reviews`),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('vogue_plaza_bag', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (location.pathname === '/checkout') {
      setCartOpen(true);
    }
  }, [location.pathname]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const addToCart = (product) => {
    const quantityToAdd = product.quantity || 1;

    setCartItems((currentItems) => {
      const key = `${product._id || product.id}-${product.selectedSize}-${product.selectedColor}`;
      const existingItem = currentItems.find((item) => item.cartKey === key);

      if (existingItem) {
        return currentItems.map((item) =>
          item.cartKey === key ? { ...item, quantity: item.quantity + quantityToAdd } : item,
        );
      }

      return [...currentItems, { ...product, cartKey: key, quantity: quantityToAdd }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (cartKey, nextQuantity) => {
    setCartItems((currentItems) =>
      nextQuantity < 1
        ? currentItems.filter((item) => item.cartKey !== cartKey)
        : currentItems.map((item) =>
            item.cartKey === cartKey ? { ...item, quantity: nextQuantity } : item,
          ),
    );
  };

  const openFilteredCategory = (category) => {
    setActiveCategory(category);
    setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 0);
  };

  const storefront = (
    <Storefront
      inventoryItems={products}
      activeCategory={activeCategory}
      activeBrand={activeBrand}
      searchQuery={searchQuery}
      setActiveCategory={openFilteredCategory}
      setActiveBrand={setActiveBrand}
      addToCart={addToCart}
      reviews={reviews}
      allCategories={categories}
    />
  );

  return (
    <div className="app-frame">
      <Navbar
        categories={categories.map((c) => c.name)}
        activeCategory={activeCategory}
        onCategoryChange={(category) => {
          setActiveBrand('All');
          openFilteredCategory(category);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        brands={[...new Set(products.map((item) => item.brand))]}
        onBrandChange={(brand) => {
          setActiveBrand(brand);
          setActiveCategory('All');
          setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 0);
        }}
      />

      <main>
        {loading ? (
          <div className="loading-state page-shell">Loading premium collection...</div>
        ) : (
          <Routes>
            <Route path="/" element={storefront} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={storefront} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-grid">
          <div>
            <strong>Vogue Plaza</strong>
            <p>High-end MERN-ready marketplace storefront with mock luxury inventory.</p>
          </div>
          <div>
            <span>Departments</span>
            <p>Men's Wear, Ladies' Wear, Kids' Corner, Accessories & Beauty, Footwear, Watches.</p>
          </div>
          <div>
            <span>Guest Care</span>
            <p>Personal styling, secure mock checkout, premium delivery, and easy returns.</p>
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        updateQuantity={updateQuantity}
        removeItem={(cartKey) => setCartItems((items) => items.filter((item) => item.cartKey !== cartKey))}
        clearCart={() => setCartItems([])}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
