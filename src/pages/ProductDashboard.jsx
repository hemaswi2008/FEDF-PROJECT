import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import StarRating from '../components/StarRating';
import Navbar from '../components/Navbar';

export default function ProductDashboard() {
  const { products, getProductRating } = useData();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Navbar />
      <div className="container">
        <div className="hero-panel">
          <div>
            <span className="section-badge">Realtime review dashboard</span>
            <h1 className="section-title">Explore products with live ratings</h1>
            <p className="section-subtitle">Tap into the review flow for every item and watch scores update instantly across devices.</p>
          </div>
        </div>

        <div className="product-grid">
          {products.map(p => {
            const r = getProductRating(p.id);
            return (
              <div key={p.id} className="card product-card" onClick={() => navigate(`/product/${p.id}`)}>
                <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                  <div className="product-icon">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="product-price">${(p.price / 100).toFixed(2)}</div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <h3>{p.name}</h3>
                  <div className="product-tags" style={{ marginTop: 12 }}>
                    <span className="product-pill">{p.category}</span>
                    {p.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="product-pill">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flex-row" style={{ marginTop: 20, justifyContent: 'space-between' }}>
                  <div className="flex-row">
                    <StarRating value={Math.round(r.avg)} readonly size={14} />
                    <span className="muted" style={{ fontSize: 13 }}>{r.avg || '—'} ({r.count})</span>
                  </div>
                  <div className="badge">Instant updates</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
