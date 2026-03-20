import { SlidersHorizontal } from 'lucide-react';
import type { FilterState, Period } from '../../types';
import { useFinanceStore } from '../../store/useFinanceStore';

const PERIODS: { key: Period; label: string }[] = [
  { key: 'day', label: 'Сегодня' },
  { key: 'week', label: 'Неделя' },
  { key: 'month', label: 'Месяц' },
  { key: 'year', label: 'Год' },
  { key: 'all', label: 'Всё' },
];

interface FiltersProps {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
}

export default function TransactionFilters({ filters, onChange }: FiltersProps) {
  const { categories } = useFinanceStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
        {PERIODS.map(p => (
          <button key={p.key} onClick={() => onChange({ period: p.key })} style={{
            flexShrink: 0, padding: '6px 14px', borderRadius: 99, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all 0.2s',
            background: filters.period === p.key ? 'var(--accent)' : 'var(--bg-3)',
            color: filters.period === p.key ? '#fff' : 'var(--text-2)',
          }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <select className="input-base" value={filters.type} onChange={e => onChange({ type: e.target.value as FilterState['type'] })} style={{ flex: 1, fontSize: 12 }}>
          <option value="all">Все типы</option>
          <option value="income">Доходы</option>
          <option value="expense">Расходы</option>
        </select>

        <select className="input-base" value={filters.categoryId} onChange={e => onChange({ categoryId: e.target.value })} style={{ flex: 1.5, fontSize: 12 }}>
          <option value="all">Все категории</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button onClick={() => onChange({ sortBy: 'date', sortDir: filters.sortDir === 'desc' && filters.sortBy === 'date' ? 'asc' : 'desc' })}
            style={{ background: filters.sortBy === 'date' ? 'var(--accent)' : 'var(--bg-3)', color: filters.sortBy === 'date' ? '#fff' : 'var(--text-2)', border: 'none', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>
            Дата{filters.sortBy === 'date' ? (filters.sortDir === 'desc' ? ' ↓' : ' ↑') : ''}
          </button>
          <button onClick={() => onChange({ sortBy: 'amount', sortDir: filters.sortDir === 'desc' && filters.sortBy === 'amount' ? 'asc' : 'desc' })}
            style={{ background: filters.sortBy === 'amount' ? 'var(--accent)' : 'var(--bg-3)', color: filters.sortBy === 'amount' ? '#fff' : 'var(--text-2)', border: 'none', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>
            <SlidersHorizontal size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
