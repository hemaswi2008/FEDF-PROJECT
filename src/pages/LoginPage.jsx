import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  const [name, setName] = useState('User');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ id: Date.now(), name, email: `${name.toLowerCase()}@example.com` });
    navigate('/dashboard');
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="container login-panel">
        <div className="card">
          <h2>Sign In</h2>
          <p>Enter your name to join the realtime review dashboard and post ratings.</p>
          <form onSubmit={handleLogin} style={{ marginTop: 20, display: 'grid', gap: 16 }}>
            <label className="label">Name</label>
            <input className="input-field" value={name} onChange={e => setName(e.target.value)} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-primary" type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
