import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../AuthContext';
import Navbar from '../components/Navbar';

export default function AddReview() {
  const { id } = useParams();
  const pid = parseInt(id);
  const { products, addReview } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const product = products.find(p => p.id === pid);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImage(null);
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  if (!product) return (
    <div className="page-container">
      <Navbar />
      <div style={{ padding: 48 }}>Product not found</div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReview({ productId: pid, userId: user?.id || 0, userName: user?.name || 'Anonymous', rating, title, body, image: preview });
    navigate(`/product/${pid}/reviews`);
  };

  return (
    <div className="page-container">
      <Navbar />
      <div style={{ padding: 32, maxWidth: 700, margin: '0 auto' }}>
        <h2>Write a review for {product.name}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label className="label">Rating</label>
          <select className="input-field" value={rating} onChange={e => setRating(parseInt(e.target.value))}>
            {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} star{v>1?'s':''}</option>)}
          </select>

          <label className="label">Title</label>
          <input className="input-field" value={title} onChange={e=>setTitle(e.target.value)} />

          <label className="label">Body</label>
          <textarea className="input-field" rows={6} value={body} onChange={e=>setBody(e.target.value)} />

          <label className="label">Optional image</label>
          <input
            className="input-field"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
              <img src={preview} alt="Review preview" style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 16, border: '1px solid var(--border)' }} />
              <button type="button" className="btn-ghost" onClick={() => { setImage(null); setPreview(null); }}>
                Remove image
              </button>
            </div>
          )}

          <div>
            <button className="btn-primary" type="submit">Publish Review</button>
            <button type="button" className="btn-ghost" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
