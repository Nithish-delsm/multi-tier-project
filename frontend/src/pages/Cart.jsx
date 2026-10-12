import { useEffect, useState } from 'react';
import client from '../api/client';

function Cart() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  const loadCart = () => {
    client.get('/cart')
      .then((res) => setItems(res.data))
      .catch(() => setMessage('Failed to load cart'));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    await client.delete(`/cart/${id}`);
    loadCart();
  };

  const checkout = async () => {
    try {
      const res = await client.post('/orders');
      setMessage(`Order placed! Order #${res.data.orderId}, Total: ₹${res.data.total}`);
      setItems([]);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Checkout failed');
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Your Cart</h2>
      {message && <p>{message}</p>}
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
