import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';

export default function ViewReviews() {
  const { id } = useParams();
  const pid = parseInt(id);
  const { products, getProductReviews, getProductRating } = useData();
  const product = products.find(p => p.id === pid);
  const reviews = getProductReviews(pid);
  const rating = getProductRating(pid);

  if (!product) return (
    <div className="page-container">
      <Navbar />
      <div style={{ padding: 48 }}>Product not found</div>
    </div>
  );

  return (
    <div className="page-container">
      <Navbar />
      <div className="container">
        <div className="section-headline">
          <div>
            <h1 className="section-title">Reviews for {product.name}</h1>
            <p className="section-subtitle">Read what people are saying and see live feedback as new ratings arrive.</p>
          </div>
          <div className="star-chip">{rating.avg || '—'} ★ • {rating.count} reviews</div>
        </div>

        {reviews.length === 0 ? (
          <div className="card">No reviews yet.</div>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {reviews.map((r, i) => (
              <div key={i} className="card review-card">
                <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                  <div>
                    <strong>{r.userName}</strong>
                    <div className="muted" style={{ marginTop: 4 }}>{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="product-pill">{r.rating} ★</div>
                </div>
                <h3 style={{ margin: '16px 0 6px' }}>{r.title}</h3>
                {r.image && (
                  <img src={r.image} alt={r.title} className="review-image" />
                )}
                <p style={{ color: 'var(--text)' }}>{r.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
