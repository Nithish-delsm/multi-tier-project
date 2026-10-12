import { useState } from 'react';
import client from './api/client';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('products');
  const [message, setMessage] = useState('');

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setPage('products');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      setPage('login');
      return;
    }
    try {
      await client.post('/cart', { productId, quantity: 1 });
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setMessage('Failed to add to cart');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1>ShopEase</h1>
        <div>
          <button onClick={() => setPage('products')}>Products</button>
          {user && <button onClick={() => setPage('cart')}>Cart</button>}
          {user ? (
            <>
              <span style={{ marginLeft: '1rem' }}>Hi, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={() => setPage('login')}>Login</button>
          )}
        </div>
      </nav>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {page === 'products' && <Products onAddToCart={handleAddToCart} />}
      {page === 'cart' && user && <Cart />}
      {page === 'login' && <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
