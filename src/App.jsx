// components/Navbar.jsx
// CO3: Reusable component — deterministic UI function of props + auth state
// CO3: Component composition pattern — used across all authenticated pages
import React from 'react';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: 24 }}>
        <h1>Review Rating System</h1>
        <p>The app is running. Navigate to the dashboard to continue.</p>
      </main>
    </div>
  );
}
const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: 64,
    background: 'rgba(12,12,15,0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  },
  brandIcon: {
    fontSize: 22,
    color: 'var(--accent)',
    fontWeight: 700,
  },
  brandText: {
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--text-primary)',
    letterSpacing: '0.01em',
  },
  navLinks: {
    display: 'flex',
    gap: 4,
  },
  navLink: {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '4px 12px',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    letterSpacing: '0.02em',
  },
  userArea: {
    position: 'relative',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: 'var(--accent)',
    color: '#0c0c0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.03em',
    transition: 'box-shadow 0.2s',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    right: 0,
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    minWidth: 200,
    boxShadow: 'var(--shadow-card)',
    overflow: 'hidden',
    zIndex: 200,
  },
  dropdownHeader: {
    padding: '16px 18px 12px',
  },
  dropdownName: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  dropdownRole: {
    fontSize: 12,
    color: 'var(--text-muted)',
    marginTop: 2,
  },
  dropdownDivider: {
    height: 1,
    background: 'var(--border)',
    margin: '0 18px',
  },
  dropdownItem: {
    width: '100%',
    padding: '12px 18px',
    background: 'none',
    border: 'none',
    color: 'var(--danger)',
    fontSize: 14,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background 0.15s',
    fontFamily: 'var(--font-body)',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 99,
  },
};



