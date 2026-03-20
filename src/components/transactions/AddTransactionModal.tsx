import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import CategoryIcon from '../ui/CategoryIcon';
import { useFinanceStore } from '../../store/useFinanceStore';
import type { Transaction, TransactionType } from '../../types';

interface Props {
  open: boolean;
  onClose: () => void;
  editTransaction?: Transaction;
}

export default function AddTransactionModal({ open, onClose, editTransaction }: Props) {
  const { categories, addTransaction, updateTransaction } = useFinanceStore();
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const visibleCats = categories.filter(c => c.type === type || c.type === 'both');

  useEffect(() => {
    if (editTransaction) {
      setType(editTransaction.type);
      setAmount(editTransaction.amount.toString());
      setDescription(editTransaction.description);
      setCategoryId(editTransaction.categoryId);
      setDate(editTransaction.date.slice(0, 10));
      setNote(editTransaction.note ?? '');
    } else {
      setType('expense'); setAmount(''); setDescription('');
      setCategoryId(''); setDate(new Date().toISOString().slice(0, 10)); setNote('');
    }
    setError('');
  }, [open, editTransaction]);

  useEffect(() => {
    if (!categoryId && visibleCats.length > 0) setCategoryId(visibleCats[0].id);
  }, [type]);

  const handleSubmit = () => {
    const amt = parseFloat(amount.replace(',', '.'));
    if (!amount || isNaN(amt) || amt <= 0) { setError('Введите корректную сумму'); return; }
    if (!description.trim()) { setError('Введите описание'); return; }
    if (!categoryId) { setError('Выберите категорию'); return; }

    const payload = { type, amount: amt, description: description.trim(), categoryId, date: new Date(date).toISOString(), note: note.trim() || undefined };

    if (editTransaction) updateTransaction(editTransaction.id, payload);
    else addTransaction(payload);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={editTransaction ? 'Редактировать' : 'Новая операция'}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', background: 'var(--bg-3)', borderRadius: 10, padding: 4, gap: 4 }}>
          {(['expense', 'income'] as TransactionType[]).map(t => (
            <button key={t} onClick={() => setType(t)} style={{
              flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, transition: 'all 0.2s',
              background: type === t ? (t === 'income' ? 'var(--positive)' : 'var(--negative)') : 'transparent',
              color: type === t ? '#fff' : 'var(--text-2)',
            }}>
              {t === 'expense' ? '− Расход' : '+ Доход'}
            </button>
          ))}
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', display: 'block', marginBottom: 6 }}>СУММА</label>
          <div style={{ position: 'relative' }}>
            <input className="input-base" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" style={{ fontSize: 24, fontWeight: 700, paddingRight: 60, textAlign: 'center' }} />
            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-2)', fontSize: 16, fontWeight: 600 }}>₽</span>
          </div>
        </div>

        <Input label="ОПИСАНИЕ" value={description} onChange={e => setDescription(e.target.value)} placeholder="Например: Продукты в Ашан" />

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>КАТЕГОРИЯ</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {visibleCats.map(cat => (
              <button key={cat.id} onClick={() => setCategoryId(cat.id)} style={{
                background: categoryId === cat.id ? `${cat.color}22` : 'var(--bg-3)',
                border: categoryId === cat.id ? `2px solid ${cat.color}` : '2px solid transparent',
                borderRadius: 12, padding: '10px 4px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all 0.15s',
              }}>
                <CategoryIcon icon={cat.icon} color={cat.color} size={16} bg={false} />
                <span style={{ fontSize: 10, fontWeight: 500, color: categoryId === cat.id ? cat.color : 'var(--text-2)', textAlign: 'center', lineHeight: 1.2 }}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Input label="ДАТА" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <Input label="ЗАМЕТКА (необязательно)" value={note} onChange={e => setNote(e.target.value)} placeholder="Дополнительная информация" />

        {error && <div style={{ fontSize: 12, color: 'var(--negative)', textAlign: 'center' }}>{error}</div>}

        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="ghost" fullWidth onClick={onClose}>Отмена</Button>
          <Button variant="primary" fullWidth onClick={handleSubmit}>
            {editTransaction ? 'Сохранить' : 'Добавить'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
