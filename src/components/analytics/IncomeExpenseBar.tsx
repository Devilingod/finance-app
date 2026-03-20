import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/formatters';
import Card from '../ui/Card';

export default function IncomeExpenseBar() {
  const { settings, getMonthlyData } = useFinanceStore();
  const data = getMonthlyData(6);

  return (
    <Card style={{ padding: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Доходы и расходы по месяцам</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-2)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--text-2)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}к`} />
          <Tooltip
            formatter={(v: number, name: string) => [formatCurrency(v, settings.currency), name === 'income' ? 'Доходы' : 'Расходы']}
            contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }}
            labelStyle={{ color: 'var(--text)', fontWeight: 600 }}
          />
          <Bar dataKey="income"   name="income"   fill="var(--positive)" radius={[6,6,0,0]} maxBarSize={28} />
          <Bar dataKey="expenses" name="expenses" fill="var(--negative)" radius={[6,6,0,0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
