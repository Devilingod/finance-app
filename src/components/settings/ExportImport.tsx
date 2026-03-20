import { useRef, useState } from 'react';
import { Download, Upload, CheckCircle, XCircle } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { exportToCSV, exportToJSON, importFromJSON } from '../../utils/exportData';
import Button from '../ui/Button';

export default function ExportImport() {
  const { transactions, categories, importData } = useFinanceStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const notify = (type: 'ok' | 'err', text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importFromJSON(file);
      importData(data.transactions, data.categories);
      notify('ok', `Импортировано ${data.transactions.length} транзакций`);
    } catch (err) {
      notify('err', (err as Error).message);
    }
    e.target.value = '';
  };

  return (
    <div>
      <div className="section-title">ЭКСПОРТ И ИМПОРТ</div>
      <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            onClick={() => exportToCSV(transactions, categories)}>
            <Download size={14} /> Экспорт CSV
          </Button>
          <Button variant="ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            onClick={() => exportToJSON(transactions, categories)}>
            <Download size={14} /> Экспорт JSON
          </Button>
        </div>
        <Button variant="ghost" fullWidth style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          onClick={() => fileRef.current?.click()}>
          <Upload size={14} /> Импорт JSON
        </Button>
        <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />

        {msg && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, background: msg.type === 'ok' ? 'rgba(0,212,170,0.1)' : 'rgba(255,77,109,0.1)', fontSize: 13 }}>
            {msg.type === 'ok' ? <CheckCircle size={14} color="var(--positive)" /> : <XCircle size={14} color="var(--negative)" />}
            <span style={{ color: msg.type === 'ok' ? 'var(--positive)' : 'var(--negative)' }}>{msg.text}</span>
          </div>
        )}

        <div style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center' }}>
          {transactions.length} транзакций · {categories.length} категорий
        </div>
      </div>
    </div>
  );
}
