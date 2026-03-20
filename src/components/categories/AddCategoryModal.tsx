import { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import CategoryIcon from '../ui/CategoryIcon';
import { useFinanceStore } from '../../store/useFinanceStore';
import type { Category, CategoryType } from '../../types';
import * as Icons from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  editCategory?: Category;
}

const ICON_OPTIONS = [
  'ShoppingCart','Car','Gamepad2','CreditCard','Heart','Shirt','Home','Plane',
  'BookOpen','UtensilsCrossed','Coffee','Music','Dumbbell','Baby','Dog','Laptop',
  'Briefcase','TrendingUp','Gift','CirclePlus','MoreHorizontal','Zap','Star','Globe',
];

const COLOR_OPTIONS = [
  '#F97316','#EF4444','#3B82F6','#8B5CF6','#06B6D4','#F43F5E',
  '#A78BFA','#64748B','#0EA5E9','#84CC16','#00D4AA','#F59E0B',
  '#EC4899','#10B981','#6C63FF','#94A3B8',
];

export default function AddCategoryModal({ open, onClose, editCategory }: Props) {
  const { addCategory, updateCategory } = useFinanceStore();
  const [name, setName] = useState(editCategory?.name ?? '');
  const [icon, setIcon] = useState(editCategory?.icon ?? 'Circle');
  const [color, setColor] = useState(editCategory?.color ?? '#6C63FF');
  const [type, setType] = useState<CategoryType>(editCategory?.type ?? 'expense');

  const handleSubmit = () => {
    if (!name.trim()) return;
    if (editCategory) updateCategory(editCategory.id, { name, icon, color, type });
    else addCategory({ name, icon, color, type, isCustom: true });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={editCategory ? 'Редактировать категорию' : 'Новая категория'}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CategoryIcon icon={icon} color={color} size={28} />
        </div>

        <Input label="НАЗВАНИЕ" value={name} onChange={e => setName(e.target.value)} placeholder="Название категории" />

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>ТИП</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['expense', 'income', 'both'] as CategoryType[]).map(t => (
              <button key={t} onClick={() => setType(t)} style={{
                flex: 1, padding: '8px', borderRadius: 8, border: type === t ? `2px solid var(--accent)` : '2px solid var(--border)', cursor: 'pointer',
                background: type === t ? 'rgba(var(--accent-rgb),0.1)' : 'var(--bg-3)', color: type === t ? 'var(--accent)' : 'var(--text-2)', fontSize: 12, fontWeight: 600,
              }}>
                {t === 'expense' ? 'Расход' : t === 'income' ? 'Доход' : 'Оба'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>ЦВЕТ</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {COLOR_OPTIONS.map(c => (
              <button key={c} onClick={() => setColor(c)} style={{
                width: 28, height: 28, borderRadius: '50%', background: c, border: color === c ? '3px solid var(--text)' : '3px solid transparent', cursor: 'pointer',
              }} />
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>ИКОНКА</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
            {ICON_OPTIONS.map(ic => {
              import * as Icons from 'lucide-react';
              const Ic = ic in Icons 
  ? Icons[ic as keyof typeof Icons] 
  : Icons.Circle;
              return (
                <button key={ic} onClick={() => setIcon(ic)} style={{
                  padding: 8, borderRadius: 8, border: icon === ic ? `2px solid ${color}` : '2px solid transparent',
                  background: icon === ic ? `${color}22` : 'var(--bg-3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Ic size={16} color={icon === ic ? color : 'var(--text-2)'} />
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="ghost" fullWidth onClick={onClose}>Отмена</Button>
          <Button variant="primary" fullWidth onClick={handleSubmit}>{editCategory ? 'Сохранить' : 'Создать'}</Button>
        </div>
      </div>
    </Modal>
  );
}
