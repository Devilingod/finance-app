import { AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { FilterState } from '../../types';
import TransactionCard from './TransactionCard';
import { useFinanceStore } from '../../store/useFinanceStore';

interface TransactionListProps {
  filters: FilterState;
}

export default function TransactionList({ filters }: TransactionListProps) {
  const { getFilteredTransactions } = useFinanceStore();
  const txs = getFilteredTransactions(filters);

  if (txs.length === 0) {
    return (
      <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-2)' }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
        <div style={{ fontSize: 15, fontWeight: 500 }}>Транзакции не найдены</div>
        <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 6 }}>Попробуйте изменить фильтры</div>
      </div>
    );
  }

  const groups = new Map<string, typeof txs>();
  for (const tx of txs) {
    const key = format(new Date(tx.date), 'yyyy-MM-dd');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(tx);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AnimatePresence>
        {[...groups.entries()].map(([dateKey, dayTxs]) => (
          <div key={dateKey}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8, letterSpacing: '0.04em' }}>
              {format(new Date(dateKey), 'dd MMMM, EEEE', { locale: ru })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {dayTxs.map(tx => <TransactionCard key={tx.id} transaction={tx} />)}
            </div>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
