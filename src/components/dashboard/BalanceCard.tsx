import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/formatters';
import type { Period } from '../../types';

const PERIODS: { key: Period; label: string }[] = [
  { key: 'day',   label: 'День' },
  { key: 'week',  label: 'Неделя' },
  { key: 'month', label: 'Месяц' },
  { key: 'year',  label: 'Год' },
  { key: 'all',   label: 'Всё время' },
];

export default function BalanceCard() {
  const [period, setPeriod] = useState<Period>('month');
  const { settings, getBalanceSummary } = useFinanceStore();
  const summary = getBalanceSummary(period);

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
      borderRadius: 'var(--radius)',
      padding: '28px 24px 20px',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: 16,
    }}>
      <div style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
      <div style={{ position: 'absolute', bottom: -50, left: 40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, position: 'relative' }}>
        <Wallet size={18} color="rgba(255,255,255,0.75)" />
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Общий баланс</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${period}-${summary.total}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{ position: 'relative' }}
        >
          <div style={{ fontSize: 38, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {formatCurrency(summary.total, settings.currency)}
          </div>
        </motion.div>
      </AnimatePresence>

      <div style={{ display: 'flex', gap: 16, marginTop: 20, position: 'relative' }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <TrendingUp size={14} color="rgba(255,255,255,0.8)" />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Доходы</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>
            {formatCurrency(summary.income, settings.currency)}
          </div>
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <TrendingDown size={14} color="rgba(255,255,255,0.8)" />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Расходы</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>
            {formatCurrency(summary.expenses, settings.currency)}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 16, position: 'relative' }}>
        {PERIODS.map(p => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            style={{
              flex: 1, padding: '5px 4px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 10, fontWeight: 600, transition: 'all 0.2s',
              background: period === p.key ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.07)',
              color: period === p.key ? '#fff' : 'rgba(255,255,255,0.55)',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
