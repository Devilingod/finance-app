import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit3 } from 'lucide-react';
import type { Transaction } from '../../types';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency, formatDate } from '../../utils/formatters';
import CategoryIcon from '../ui/CategoryIcon';
import AddTransactionModal from './AddTransactionModal';

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction: tx }: TransactionCardProps) {
  const { categories, settings, deleteTransaction } = useFinanceStore();
  const [editOpen, setEditOpen] = useState(false);
  const cat = categories.find(c => c.id === tx.categoryId);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="card card-hover"
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}
      >
        {cat && <CategoryIcon icon={cat.icon} color={cat.color} size={18} />}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
              {tx.description}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{cat?.name}</span>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>·</span>
            <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{formatDate(tx.date)}</span>
          </div>
          {tx.note && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2, fontStyle: 'italic' }}>{tx.note}</div>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: tx.type === 'income' ? 'var(--positive)' : 'var(--negative)' }}>
              {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount, settings.currency)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setEditOpen(true)} style={{ background: 'var(--bg-3)', border: 'none', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)' }}>
              <Edit3 size={13} />
            </button>
            <button onClick={() => deleteTransaction(tx.id)} style={{ background: 'rgba(255,77,109,0.1)', border: 'none', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--negative)' }}>
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </motion.div>

      <AddTransactionModal open={editOpen} onClose={() => setEditOpen(false)} editTransaction={tx} />
    </>
  );
}
