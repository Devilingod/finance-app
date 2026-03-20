import { motion } from 'framer-motion';
import ThemeSelector from '../components/settings/ThemeSelector';
import ExportImport from '../components/settings/ExportImport';
import PinLock from '../components/settings/PinLock';
import { useFinanceStore } from '../store/useFinanceStore';
import type { Currency } from '../types';

const CURRENCIES: { key: Currency; label: string }[] = [
  { key: 'RUB', label: '₽ Рубль' },
  { key: 'USD', label: '$ Доллар' },
  { key: 'EUR', label: '€ Евро' },
  { key: 'GBP', label: '£ Фунт' },
];

export default function Settings() {
  const { settings, updateSettings } = useFinanceStore();

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 24 }}>Настройки</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <ThemeSelector />

        <div>
          <div className="section-title">ВАЛЮТА</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {CURRENCIES.map(c => (
              <button key={c.key} onClick={() => updateSettings({ currency: c.key })} style={{
                padding: '12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                background: settings.currency === c.key ? 'rgba(var(--accent-rgb),0.12)' : 'var(--bg-card)',
                border: settings.currency === c.key ? '2px solid var(--accent)' : '2px solid var(--border)',
                color: settings.currency === c.key ? 'var(--accent)' : 'var(--text)',
              }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <PinLock />
        <ExportImport />

        <div className="card" style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Finance App</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)' }}>Версия 1.0.0 · Данные хранятся локально</div>
        </div>
      </div>
    </motion.div>
  );
}
