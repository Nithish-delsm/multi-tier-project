import { useEffect, useState } from 'react';
import client from '../api/client';

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    client.get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {products.map((p) => (
        <div key={p.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <img src={p.image_url} alt={p.name} style={{ width: '100%' }} />
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p><strong>₹{p.price}</strong></p>
          <p>Stock: {p.stock}</p>
          <button onClick={() => onAddToCart(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Products;
