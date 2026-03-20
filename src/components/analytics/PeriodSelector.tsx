import type { Period } from '../../types';

const PERIODS: { key: Period; label: string }[] = [
  { key: 'week',  label: '7 дней' },
  { key: 'month', label: '30 дней' },
  { key: 'year',  label: 'Год' },
  { key: 'all',   label: 'Всё' },
];

interface Props {
  value: Period;
  onChange: (p: Period) => void;
}

export default function PeriodSelector({ value, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: 6, background: 'var(--bg-3)', borderRadius: 10, padding: 4 }}>
      {PERIODS.map(p => (
        <button key={p.key} onClick={() => onChange(p.key)} style={{
          flex: 1, padding: '8px 4px', borderRadius: 8, border: 'none', cursor: 'pointer',
          fontSize: 12, fontWeight: 600, transition: 'all 0.2s',
          background: value === p.key ? 'var(--accent)' : 'transparent',
          color: value === p.key ? '#fff' : 'var(--text-2)',
        }}>
          {p.label}
        </button>
      ))}
    </div>
  );
}
