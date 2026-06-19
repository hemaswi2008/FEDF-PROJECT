import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Toast from '../components/Toast';

const DataContext = createContext();

const initialProducts = [
  { id: 1, name: 'Noise-Cancelling Headphones', category: 'Electronics', price: 4999, image: '/images/noise-cancellation.jpeg', description: 'Great sound', tags: ['audio', 'music'], reviews: [] },
  { id: 2, name: 'Running Shoes', category: 'Footwear', price: 2999, image: '/images/running-shoes.jpeg', description: 'Lightweight', tags: ['fitness', 'shoes'], reviews: [] },
  { id: 3, name: 'Classic Novel', category: 'Books & Reading', price: 499, image: '/images/classic-novel.png', description: 'A timeless read', tags: ['books', 'reading'], reviews: [] },
  { id: 4, name: 'Smartphone 5G', category: 'Electronics', price: 25999, image: '/images/smartphone-5g.jpeg', description: 'Fast and sleek', tags: ['mobile', 'android'], reviews: [] },
  { id: 5, name: 'Espresso Machine', category: 'Home Appliances', price: 12999, image: '/images/espresso-machine.jpeg', description: 'Cafe-quality coffee', tags: ['kitchen', 'coffee'], reviews: [] },
  { id: 6, name: 'Electric Toothbrush', category: 'Personal Care', price: 1999, image: '/images/electric-toothbrush.png', description: 'Deep clean', tags: ['health', 'care'], reviews: [] },
  { id: 7, name: 'Yoga Mat', category: 'Fitness', price: 799, image: '/images/yoga-mat.jpg', description: 'Non-slip surface', tags: ['fitness', 'yoga'], reviews: [] },
  { id: 8, name: 'Blender', category: 'Kitchen', price: 3499, image: '/images/blender.jpeg', description: 'High-power blending', tags: ['kitchen', 'appliances'], reviews: [] },
  { id: 9, name: 'Desk Lamp', category: 'Home', price: 899, image: '/images/desk-lamp.jpg', description: 'Adjustable brightness', tags: ['home', 'lighting'], reviews: [] },
];

// Channel name for cross-tab real-time updates
const CHANNEL = 'review-system-updates';

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [toast, setToast] = useState(null);
  const bcRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast({ id: Date.now(), message });
  }, []);

  useEffect(() => {
    // fetch initial products from server if available
    const load = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const prods = await res.json();
          const normalized = prods.map((p) => {
            const matched = initialProducts.find((x) => x.id === p.id);
            // prefer absolute URLs or root-relative paths returned by the server;
            // otherwise fall back to the local initial product image
            let imageUrl = matched?.image;
            if (typeof p.image === 'string') {
              if (p.image.startsWith('http') || p.image.startsWith('/')) imageUrl = p.image;
            }
            return { ...p, image: imageUrl || p.image };
          });
          setProducts(normalized);
        }
      } catch (e) {
        // fallback: keep local initialProducts
      }
    };
    load();

    // socket.io realtime
    try {
      const socket = io('http://localhost:4000');
      bcRef.current = socket;
      socket.on('review_added', ({ productId, review }) => {
        setProducts(prev => {
          const product = prev.find((p) => p.id === productId);
          if (product) {
            showToast(`New review added for ${product.name}`);
          }
          return prev.map(p => p.id === productId ? { ...p, reviews: [...(p.reviews || []), review] } : p);
        });
      });
    } catch (e) {
      // ignore if socket fails
    }
  }, []);

  const addReview = useCallback(async ({ productId, userId, userName, rating, title, body, image }) => {
    const review = { userId, userName, rating, title, body, image, createdAt: Date.now() };
    // try server persist
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, userName, rating, title, body, image }),
      });
      if (res.ok || res.status === 201) {
        // server will broadcast; also update local state
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, reviews: [...(p.reviews || []), review] } : p));
        return;
      }
    } catch (e) {
      // fallback to local update
    }
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, reviews: [...(p.reviews || []), review] } : p));
    showToast('Review published — thanks for sharing!');
  }, [showToast]);

  const getProductRating = useCallback((productId) => {
    const p = products.find(x => x.id === productId);
    const reviews = p?.reviews || [];
    const count = reviews.length;
    const avg = count ? (reviews.reduce((s, r) => s + r.rating, 0) / count) : 0;
    return { avg: Math.round(avg * 10) / 10, count };
  }, [products]);

  const getProductReviews = useCallback((productId) => {
    const p = products.find(x => x.id === productId);
    return p?.reviews || [];
  }, [products]);

  return (
    <DataContext.Provider value={{ products, addReview, getProductRating, getProductReviews }}>
      {children}
      <Toast message={toast?.message} onClose={() => setToast(null)} />
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

export default DataContext;
