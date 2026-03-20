import type { ReactNode } from 'react';
import BottomNav from './BottomNav';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <main style={{ minHeight: '100vh' }}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
