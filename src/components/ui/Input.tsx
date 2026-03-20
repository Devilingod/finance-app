import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em' }}>
          {label}
        </label>
      )}
      <input className={`input-base ${className}`} {...props} />
      {error && <span style={{ fontSize: 11, color: 'var(--negative)' }}>{error}</span>}
    </div>
  );
}
