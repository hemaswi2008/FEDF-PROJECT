import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useData } from '../context/DataContext';

export default function HomePage() {
  const { products } = useData();
  const featured = products.slice(0, 4);

  return (
    <div className="page-container home-page">
      <Navbar />
      <div className="container">
        <section className="hero-landing">
          <div className="hero-copy">
            <span className="section-badge">Realtime review platform</span>
            <h1>Shop confidently with live product ratings and photo reviews.</h1>
            <p className="section-subtitle">
              Discover the best products and share your experience instantly. Every review updates live so the whole community can trust today’s feedback.
            </p>
            <div className="hero-actions">
              <Link to="/dashboard" className="btn-primary">Explore products</Link>
              <Link to="/login" className="btn-ghost">Sign in</Link>
            </div>
          </div>
          <aside className="hero-panel hero-stats">
            <div className="stat-card">
              <span className="stat-value">9</span>
              <p>verified products</p>
            </div>
            <div className="stat-card">
              <span className="stat-value">6.4k</span>
              <p>reviews shared</p>
            </div>
            <div className="stat-card">
              <span className="stat-value">99%</span>
              <p>real user trust</p>
            </div>
          </aside>
        </section>

        <section className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Live updates</h3>
            <p>Every new review appears instantly across the site, so you always see the latest feedback.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🖼️</div>
            <h3>Photo-first reviews</h3>
            <p>Add optional images with your rating to help others see exactly what you experienced.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>Trusted ratings</h3>
            <p>View average scores, review counts, and detailed product sentiment all in one place.</p>
          </div>
        </section>

        <section className="product-preview-section">
          <div className="section-headline" style={{ marginTop: 40 }}>
            <div>
              <h2 className="section-title">Featured products</h2>
              <p className="section-subtitle">Preview the top-rated items and jump straight into the review dashboard.</p>
            </div>
            <Link to="/dashboard" className="btn-ghost">View all products</Link>
          </div>

          <div className="product-grid">
            {featured.map((product) => (
              <div key={product.id} className="card product-card">
                <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                  <div className="product-icon">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-price">${(product.price / 100).toFixed(2)}</div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <h3>{product.name}</h3>
                  <div className="product-tags" style={{ marginTop: 12 }}>
                    <span className="product-pill">{product.category}</span>
                    {product.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="product-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
