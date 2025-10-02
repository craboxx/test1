import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import OrderForm from './components/OrderForm';

const subcategories = {
  events: ["Stage", "Enterence", "Pathway", "Cheddar", "Nameboard"],
  catering: ["FoodCorner", "JuiceCorner", "Dishes", "Drinks"],
  special: ["Mehandi", "Haldi", "BrideToBe", "Birthday"],
  more: ["Paperblast", "Coldpyro", "DryIce", "Sound", "Light"]
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [priceSort, setPriceSort] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);

  const mountedRef = useRef(false);

  useEffect(() => {
    // Splash timeout
    const t = setTimeout(() => setSplashVisible(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    fetchAndDisplayProducts(selectedCategory, selectedSubcategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedSubcategory, priceSort, priceRange]);

  async function fetchAndDisplayProducts(category = 'all', subcategory = null) {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      let prods = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        const matchCategory = category === 'all' || data.category === category;
        const matchSubcategory = !subcategory || data.subcategory === subcategory;
        if (matchCategory && matchSubcategory) prods.push({ id: doc.id, ...data });
      });

      if (priceRange) {
        const [min, max] = priceRange.split('-');
        const upperLimit = max === 'inf' ? Infinity : parseInt(max, 10);
        prods = prods.filter(p => p.rate >= parseInt(min, 10) && p.rate <= upperLimit);
      }

      if (priceSort === 'low') prods.sort((a, b) => a.rate - b.rate);
      else if (priceSort === 'high') prods.sort((a, b) => b.rate - a.rate);

      setProducts(prods);
    } catch (err) {
      console.error('Error loading products:', err);
      setProducts([]);
    }
  }

  function saveCart(newCart) {
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  function loadCart() {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }

  function addToCart(item) {
    if (!cart.find(p => p.id === item.id)) {
      const next = [...cart, item];
      setCart(next);
      saveCart(next);
    }
  }

  function removeFromCart(index) {
    const next = cart.slice();
    next.splice(index, 1);
    setCart(next);
    saveCart(next);
  }

  function clearCart() {
    setCart([]);
    saveCart([]);
  }

  useEffect(() => {
    // intercept back button and beforeunload
    function onBeforeUnload(e) {
      e.preventDefault();
      e.returnValue = '';
    }

    function onPopState() {
      const exit = window.confirm('Are you sure you want to exit?');
      if (!exit) {
        window.history.pushState(null, null, window.location.href);
      } else {
        window.history.back();
      }
    }

    window.addEventListener('beforeunload', onBeforeUnload);
    window.addEventListener('popstate', onPopState);
    // push initial state
    window.history.pushState(null, null, window.location.href);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // update disabled state for product buttons after cart changes (ensures consistency)
  useEffect(() => {
    if (mountedRef.current) saveCart(cart);
    mountedRef.current = true;
  }, [cart]);

  return (
    <div>
      {/* Splash */}
      {splashVisible && (
        <div id="splash" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <img src="/assets/logo.png" alt="Logo" style={{ maxWidth: 600, maxHeight: 200 }} />
        </div>
      )}

      <div id="mainContent" style={{ display: splashVisible ? 'none' : 'block' }}>
        <div style={{ position: 'absolute', top: 3, right: 3 }}>
          <button id="cartButton" onClick={() => setShowCart(v => !v)}>🛒 <span id="cartCount">{cart.length}</span></button>
        </div>

        <CartModal show={showCart} cart={cart} removeFromCart={removeFromCart} onClose={() => setShowCart(false)} />

        <nav id="categoryButtons">
          <button data-filter="events" className={selectedCategory === 'events' ? 'active' : ''} onClick={() => { setSelectedCategory('events'); setSelectedSubcategory(null); }}>{'Events'}</button>
          <button data-filter="special" className={selectedCategory === 'special' ? 'active' : ''} onClick={() => { setSelectedCategory('special'); setSelectedSubcategory(null); }}>{'Special'}</button>
          <button data-filter="catering" className={selectedCategory === 'catering' ? 'active' : ''} onClick={() => { setSelectedCategory('catering'); setSelectedSubcategory(null); }}>{'Catering'}</button>
          <button data-filter="more" className={selectedCategory === 'more' ? 'active' : ''} onClick={() => { setSelectedCategory('more'); setSelectedSubcategory(null); }}>{'More'}</button>
        </nav>

        <div id="subCategoryButtons">
          {(subcategories[selectedCategory] || []).map(sub => (
            <button key={sub} className={selectedSubcategory === sub ? 'active subcategory-btn' : 'subcategory-btn'} onClick={() => { setSelectedSubcategory(sub); }}>{sub}</button>
          ))}
        </div>

        <div className="dropdown">
          <button>Price ⚙️</button>
          <div className="dropdown-content">
            <button className="price-filter" data-sort="low" onClick={() => { setPriceSort('low'); setPriceRange(null); }}>
              Low to High
            </button>
            <button className="price-filter" data-sort="high" onClick={() => { setPriceSort('high'); setPriceRange(null); }}>
              High to Low
            </button>
            <button id="clearPriceFilter" onClick={() => { setPriceSort(null); setPriceRange(null); }}>
              Clear Filter
            </button>
          </div>
        </div>

        <main>
          <div id="productGrid" className="grid">
            {products.length === 0 ? <p style={{ padding: 20 }}>No products found.</p> : products.map(p => (
              <ProductCard key={p.id} data={p} addToCart={addToCart} isAdded={!!cart.find(c => c.id === p.id)} />
            ))}
          </div>
          <div className="spacer-div" />
        </main>

        <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
          <button id="purchaseBtn" onClick={() => {
            if (!cart || cart.length === 0) {
              const popup = document.getElementById('emptyCartPopup');
              if (popup) { popup.style.display = 'block'; setTimeout(() => { if (popup) popup.style.display = 'none'; }, 2000); }
              return;
            }
            setShowOrderForm(true);
          }}>
            Purchase<img src="/assets/whatsapplogo.png" alt="WhatsApp" className="whatsapp-icon" />
          </button>
        </div>

      </div>

      <div id="emptyCartPopup" style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ff4d4d', color: 'white', padding: '12px 24px', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 9999, display: 'none', fontFamily: 'sans-serif' }}>🛒 Your cart is empty!</div>

      {showOrderForm && <OrderForm cart={cart} onClose={() => setShowOrderForm(false)} onOrderPlaced={() => { clearCart(); setShowOrderForm(false); }} />}

    </div>
  );
}