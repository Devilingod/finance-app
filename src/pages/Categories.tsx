import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import CategoryCard from '../components/categories/CategoryCard';
import AddCategoryModal from '../components/categories/AddCategoryModal';
import { useFinanceStore } from '../store/useFinanceStore';

export default function Categories() {
  const { categories, transactions } = useFinanceStore();
  const [addOpen, setAddOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const filtered = categories.filter(c => filter === 'all' || c.type === filter || c.type === 'both');

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>Категории</h1>
        <button onClick={() => setAddOpen(true)} style={{ background: 'var(--accent)', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Plus size={14} /> Создать
        </button>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {(['all', 'expense', 'income'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 16px', borderRadius: 99, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
            background: filter === f ? 'var(--accent)' : 'var(--bg-3)',
            color: filter === f ? '#fff' : 'var(--text-2)', transition: 'all 0.2s',
          }}>
            {f === 'all' ? 'Все' : f === 'expense' ? 'Расходы' : 'Доходы'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(cat => (
          <CategoryCard
            key={cat.id}
            category={cat}
            txCount={transactions.filter(t => t.categoryId === cat.id).length}
          />
        ))}
      </div>

      <AddCategoryModal open={addOpen} onClose={() => setAddOpen(false)} />
    </motion.div>
  );
}
