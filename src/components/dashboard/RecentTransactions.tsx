import { motion } from 'framer-motion';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency, formatDateShort } from '../../utils/formatters';
import CategoryIcon from '../ui/CategoryIcon';
import { useNavigate } from 'react-router-dom';

export default function RecentTransactions() {
  const { transactions, categories, settings } = useFinanceStore();
  const navigate = useNavigate();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span className="section-title" style={{ marginBottom: 0 }}>Последние операции</span>
        <button onClick={() => navigate('/transactions')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>
          Все →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {recent.map((tx, i) => {
          const cat = categories.find(c => c.id === tx.categoryId);
          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card card-hover"
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', cursor: 'pointer' }}
              onClick={() => navigate('/transactions')}
            >
              {cat && <CategoryIcon icon={cat.icon} color={cat.color} size={18} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {tx.description}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>
                  {cat?.name} · {formatDateShort(tx.date)}
                </div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: tx.type === 'income' ? 'var(--positive)' : 'var(--negative)', flexShrink: 0 }}>
                {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount, settings.currency)}
              </div>
            </motion.div>
          );
        })}

        {recent.length === 0 && (
          <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-2)', fontSize: 14 }}>
            Нет транзакций. Добавьте первую!
          </div>
        )}
      </div>
    </div>
  );
}
