import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/formatters';
import Card from '../ui/Card';

export default function SpendingRing() {
  const { settings, getCategoryStats } = useFinanceStore();
  const stats = getCategoryStats('month', 'expense').slice(0, 5);

  if (stats.length === 0) return null;

  return (
    <Card style={{ padding: '16px 14px', marginBottom: 16 }}>
      <span className="section-title">Расходы этого месяца</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 110, height: 110, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={stats} dataKey="amount" cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={3}>
                {stats.map((s) => <Cell key={s.categoryId} fill={s.color} />)}
              </Pie>
              <Tooltip
                formatter={(v: number) => formatCurrency(v, settings.currency)}
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: 'var(--text)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {stats.map(s => (
            <div key={s.categoryId} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
              <span style={{ fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{s.percentage.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
