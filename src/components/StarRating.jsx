import React, { useState } from 'react';

export default function StarRating({
  value = 0,
  onChange,
  readonly = false,
  max = 5,
  size = 20,
}) {
  const [hovered, setHovered] = useState(0);
  const effective = hovered || value;

  return (
    <div
      style={styles.container}
      role={readonly ? 'img' : 'radiogroup'}
      aria-label={`Rating: ${value} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map(star => (
        <span
          key={star}
          role={readonly ? undefined : 'radio'}
          aria-checked={star === value}
          tabIndex={readonly ? -1 : 0}
          style={{
            ...styles.star,
            fontSize: size,
            color: star <= effective ? 'var(--accent)' : 'var(--text-muted)',
            cursor: readonly ? 'default' : 'pointer',
            transform: !readonly && star <= hovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.15s, color 0.15s',
          }}
          onClick={() => !readonly && onChange && onChange(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          onKeyDown={(e) => {
            if (!readonly && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onChange && onChange(star);
            }
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    lineHeight: 1,
  },
  star: {
    userSelect: 'none',
    display: 'inline-block',
  },
};
