import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/formatters';
import Card from '../ui/Card';
import type { Period } from '../../types';

interface Props { period: Period; }

export default function ExpensePieChart({ period }: Props) {
  const { settings, getCategoryStats } = useFinanceStore();
  const stats = getCategoryStats(period, 'expense').slice(0, 8);

  if (stats.length === 0) {
    return (
      <Card style={{ padding: 24, textAlign: 'center', color: 'var(--text-2)', fontSize: 14 }}>
        Нет данных о расходах за этот период
      </Card>
    );
  }

  return (
    <Card style={{ padding: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Расходы по категориям</div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={stats} dataKey="amount" nameKey="name" cx="50%" cy="45%" outerRadius={90} paddingAngle={3}>
            {stats.map(s => <Cell key={s.categoryId} fill={s.color} />)}
          </Pie>
          <Tooltip
            formatter={(value) => [
  formatCurrency(Number(value ?? 0), settings.currency),
  '',
]}
            contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }}
          />
          <Legend
            formatter={(value) => <span style={{ color: 'var(--text-2)', fontSize: 11 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        {stats.map(s => (
          <div key={s.categoryId} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, color: 'var(--text-2)' }}>{s.name}</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{formatCurrency(s.amount, settings.currency)}</span>
            <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 32, textAlign: 'right' }}>{s.percentage.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
