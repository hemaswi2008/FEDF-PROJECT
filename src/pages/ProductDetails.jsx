import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import StarRating from '../components/StarRating';

export default function ProductDetails() {
  const { id } = useParams();
  const pid = parseInt(id);
  const { products, getProductRating } = useData();
  const product = products.find(p => p.id === pid);
  const navigate = useNavigate();

  if (!product) return (
    <div className="page-container">
      <Navbar />
      <div style={{ padding: 48 }}>Product not found</div>
    </div>
  );

  const rating = getProductRating(pid);

  return (
    <div className="page-container">
      <Navbar />
      <div className="container">
        <div className="card">
          <div className="flex-row" style={{ alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ minWidth: 160, textAlign: 'center' }}>
              <div className="product-icon product-detail-image" style={{ width: 120, height: 120, margin: '0 auto' }}>
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <span className="section-badge">{product.category}</span>
              <h1 style={{ marginTop: 16 }}>{product.name}</h1>
              <p className="section-subtitle" style={{ marginTop: 12 }}>{product.description}</p>
              <div className="flex-row" style={{ marginTop: 18, flexWrap: 'wrap', gap: 12 }}>
                <span className="star-chip">{rating.avg || '—'} ★ average</span>
                <span className="product-price">${(product.price / 100).toFixed(2)}</span>
              </div>
              <div className="product-tags" style={{ marginTop: 18 }}>
                {product.tags.map((tag) => (
                  <span key={tag} className="product-pill">{tag}</span>
                ))}
              </div>
              <div className="detail-actions" style={{ marginTop: 28 }}>
                <button className="btn-primary" onClick={() => navigate(`/product/${pid}/add-review`)}>Add Review</button>
                <button className="btn-secondary" onClick={() => navigate(`/product/${pid}/reviews`)}>View Reviews</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
