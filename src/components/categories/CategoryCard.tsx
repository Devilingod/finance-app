import { useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import type { Category } from '../../types';
import { useFinanceStore } from '../../store/useFinanceStore';
import CategoryIcon from '../ui/CategoryIcon';
import AddCategoryModal from './AddCategoryModal';

interface Props {
  category: Category;
  txCount: number;
}

export default function CategoryCard({ category: cat, txCount }: Props) {
  const { deleteCategory } = useFinanceStore();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div className="card card-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
        <CategoryIcon icon={cat.icon} color={cat.color} size={18} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{cat.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>
            {txCount} транзакций · {cat.type === 'both' ? 'Доход / Расход' : cat.type === 'income' ? 'Доход' : 'Расход'}
          </div>
        </div>
        {cat.isCustom && (
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setEditOpen(true)} style={{ background: 'var(--bg-3)', border: 'none', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)' }}>
              <Edit3 size={13} />
            </button>
            <button onClick={() => deleteCategory(cat.id)} style={{ background: 'rgba(255,77,109,0.1)', border: 'none', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--negative)' }}>
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>
      <AddCategoryModal open={editOpen} onClose={() => setEditOpen(false)} editCategory={cat} />
    </>
  );
}
