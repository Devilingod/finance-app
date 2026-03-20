import { useState } from 'react';
import { Lock, Unlock, Delete } from 'lucide-react';
import { usePinLock } from '../../hooks/usePinLock';
import Button from '../ui/Button';

export default function PinLock() {
  const { pinEnabled, enablePin, disablePin } = usePinLock();
  const [step, setStep] = useState<'idle' | 'enter' | 'confirm'>('idle');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const handleDigit = (d: string) => {
    if (step === 'enter' && pin.length < 6) {
      const next = pin + d;
      setPin(next);
      if (next.length === 6) setStep('confirm');
    } else if (step === 'confirm' && confirmPin.length < 6) {
      const next = confirmPin + d;
      setConfirmPin(next);
      if (next.length === 6) {
        if (next === pin) { enablePin(next); setStep('idle'); setPin(''); setConfirmPin(''); setError(''); }
        else { setError('PIN не совпадает'); setConfirmPin(''); }
      }
    }
  };

  const handleDelete = () => {
    if (step === 'enter') setPin(p => p.slice(0, -1));
    if (step === 'confirm') setConfirmPin(p => p.slice(0, -1));
  };

  const currentVal = step === 'confirm' ? confirmPin : pin;

  if (step !== 'idle') {
    return (
      <div className="card" style={{ padding: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
            {step === 'enter' ? 'Введите новый PIN' : 'Подтвердите PIN'}
          </div>
          {error && <div style={{ fontSize: 12, color: 'var(--negative)', marginBottom: 8 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i < currentVal.length ? 'var(--accent)' : 'var(--border-2)', transition: 'background 0.2s' }} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxWidth: 240, margin: '0 auto' }}>
            {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((d, i) => (
              <button key={i} onClick={() => d === '⌫' ? handleDelete() : d ? handleDigit(d) : undefined} style={{
                height: 56, borderRadius: 12, border: 'none', background: d === '⌫' ? 'var(--bg-3)' : 'var(--bg-card-2)',
                color: 'var(--text)', fontSize: 18, fontWeight: 600, cursor: d ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                visibility: d === '' ? 'hidden' : 'visible',
              }}>
                {d === '⌫' ? <Delete size={18} /> : d}
              </button>
            ))}
          </div>
        </div>
        <Button variant="ghost" fullWidth onClick={() => { setStep('idle'); setPin(''); setConfirmPin(''); setError(''); }}>Отмена</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="section-title">БЕЗОПАСНОСТЬ</div>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: pinEnabled ? 'rgba(0,212,170,0.1)' : 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {pinEnabled ? <Lock size={18} color="var(--positive)" /> : <Unlock size={18} color="var(--text-2)" />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>PIN-код</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>
              {pinEnabled ? 'Приложение защищено' : 'Защита отключена'}
            </div>
          </div>
          <Button variant={pinEnabled ? 'danger' : 'primary'} onClick={() => pinEnabled ? disablePin() : setStep('enter')} style={{ fontSize: 12, padding: '8px 16px' }}>
            {pinEnabled ? 'Отключить' : 'Включить'}
          </Button>
        </div>
      </div>
    </div>
  );
}
