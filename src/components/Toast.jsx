import React, { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onClose, 4200);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-root" role="status" aria-live="polite">
      <div className="toast-card">
        <span>{message}</span>
        <button className="toast-close" onClick={onClose} aria-label="Dismiss notification">
          ×
        </button>
      </div>
    </div>
  );
}
