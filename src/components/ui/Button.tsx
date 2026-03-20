import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({ variant = 'primary', children, fullWidth, style, ...props }: ButtonProps) {
  return (
    <button
      className={`btn-${variant}`}
      style={{ width: fullWidth ? '100%' : undefined, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
