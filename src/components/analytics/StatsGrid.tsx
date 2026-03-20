import { TrendingUp, TrendingDown, Wallet, Activity } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/formatters';
import type { Period } from '../../types';

interface Props { period: Period; }

export default function StatsGrid({ period }: Props) {
  const { settings, getBalanceSummary, getCategoryStats } = useFinanceStore();
  const summary = getBalanceSummary(period);
  const topCat = getCategoryStats(period, 'expense')[0];
  const savings = summary.income > 0 ? (summary.total / summary.income) * 100 : 0;

  const stats = [
    { icon: TrendingUp,   label: 'Доходы',          value: formatCurrency(summary.income, settings.currency),   color: 'var(--positive)' },
    { icon: TrendingDown, label: 'Расходы',          value: formatCurrency(summary.expenses, settings.currency), color: 'var(--negative)' },
    { icon: Wallet,       label: 'Баланс',           value: formatCurrency(summary.total, settings.currency),    color: 'var(--accent)' },
    { icon: Activity,     label: 'Норма сбережений', value: `${savings.toFixed(1)}%`,                            color: savings >= 0 ? 'var(--positive)' : 'var(--negative)' },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {stats.map(s => (
          <div key={s.label} className="card" style={{ padding: '16px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <s.icon size={15} color={s.color} />
              <span style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 500 }}>{s.label}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      {topCat && (
        <div className="card" style={{ padding: '14px 16px', marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: topCat.color }} />
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Топ расход:</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{topCat.name}</span>
          <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: 'var(--negative)' }}>
            {formatCurrency(topCat.amount, settings.currency)}
          </span>
        </div>
      )}
    </div>
  );
}
