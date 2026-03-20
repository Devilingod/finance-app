import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/formatters';
import Card from '../ui/Card';

export default function BalanceLineChart() {
  const { settings, getDailyBalance } = useFinanceStore();
  const data = getDailyBalance(30);

  return (
    <Card style={{ padding: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Изменение баланса (30 дней)</div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-2)' }} axisLine={false} tickLine={false} interval={6} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--text-2)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}к`} />
          <Tooltip
            formatter={(value) => [
  formatCurrency(Number(value ?? 0), settings.currency),
  'Баланс',
]}
            contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }}
            labelStyle={{ color: 'var(--text)', fontWeight: 600 }}
          />
          <ReferenceLine y={0} stroke="var(--border-2)" strokeDasharray="4 2" />
          <Line type="monotone" dataKey="balance" stroke="var(--accent)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: 'var(--accent)' }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
