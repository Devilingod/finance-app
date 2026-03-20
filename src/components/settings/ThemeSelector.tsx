import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../types';

const THEMES: { key: Theme; label: string; desc: string; preview: [string, string] }[] = [
  { key: 'dark',  label: 'Тёмная',         desc: 'Revolut стиль',      preview: ['#0a0a0f', '#6C63FF'] },
  { key: 'light', label: 'Светлая',         desc: 'Apple Wallet стиль', preview: ['#f2f2f7', '#5856d6'] },
  { key: 'neon',  label: 'Неоновая',        desc: 'Cyberpunk стиль',    preview: ['#04040d', '#00f0ff'] },
  { key: 'glass', label: 'Стеклянная',      desc: 'Glassmorphism',      preview: ['#1a1035', '#c084fc'] },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className="section-title">ТЕМА ОФОРМЛЕНИЯ</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {THEMES.map(t => (
          <button
            key={t.key}
            onClick={() => setTheme(t.key)}
            style={{
              background: theme === t.key ? 'rgba(var(--accent-rgb),0.12)' : 'var(--bg-card)',
              border: theme === t.key ? '2px solid var(--accent)' : '2px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '14px 12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: t.preview[0], border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: t.preview[1] }} />
              </div>
              {theme === t.key && <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>✓</span>}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{t.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
