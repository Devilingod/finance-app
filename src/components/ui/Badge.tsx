import type { TransactionType } from '../../types';

interface BadgeProps {
  type: TransactionType;
  small?: boolean;
}

export default function Badge({ type, small }: BadgeProps) {
  return (
    <span
      className={`badge ${type === 'income' ? 'badge-income' : 'badge-expense'}`}
      style={small ? { fontSize: 10, padding: '2px 8px' } : undefined}
    >
      {type === 'income' ? '+ Доход' : '− Расход'}
    </span>
  );
}
