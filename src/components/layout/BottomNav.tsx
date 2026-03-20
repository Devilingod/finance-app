import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, BarChart3, Tag, Settings } from 'lucide-react';

const TABS = [
  { to: '/',             icon: LayoutDashboard, label: 'Главная' },
  { to: '/transactions', icon: ArrowLeftRight,  label: 'История' },
  { to: '/analytics',    icon: BarChart3,        label: 'Аналитика' },
  { to: '/categories',   icon: Tag,             label: 'Категории' },
  { to: '/settings',     icon: Settings,        label: 'Настройки' },
];

export default function BottomNav() {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      {TABS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          style={({ isActive }) => ({
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 3, padding: '10px 4px', textDecoration: 'none',
            color: isActive ? 'var(--accent)' : 'var(--text-3)',
            fontSize: 10, fontWeight: 500, transition: 'color 0.2s',
          })}
        >
          {({ isActive }) => (
            <>
              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.7} />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
