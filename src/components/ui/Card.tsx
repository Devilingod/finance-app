import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hoverable?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', style, hoverable, onClick }: CardProps) {
  return (
    <div
      className={`card ${hoverable ? 'card-hover' : ''} ${className}`}
      style={{ ...style, cursor: onClick ? 'pointer' : undefined }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
