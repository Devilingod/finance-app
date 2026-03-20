import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Difficulty, QuestType } from '../types/quest';
import { DIFFICULTY_LABEL, DIFFICULTY_XP } from '../types/quest';

interface AddQuestModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string, type: QuestType, difficulty: Difficulty) => void;
}

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard', 'epic'];

export default function AddQuestModal({ open, onClose, onAdd }: AddQuestModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<QuestType>('daily');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim(), type, difficulty);
    setTitle('');
    setDescription('');
    setType('daily');
    setDifficulty('easy');
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(8,12,20,0.75)',
              zIndex: 200,
              backdropFilter: 'blur(4px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 201,
              width: '100%', maxWidth: 480,
              background: '#111927',
              border: '1px solid rgba(200,169,110,0.35)',
              borderRadius: 14,
              padding: '28px 28px 24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(200,169,110,0.08)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <div>
                <div className="font-cinzel" style={{ fontSize: 16, color: 'var(--gold)', letterSpacing: 1.5 }}>
                  НОВЫЙ КВЕСТ
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
                  Запиши своё задание как поручение
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-muted)',
                  width: 30, height: 30, borderRadius: '50%',
                  cursor: 'pointer', fontSize: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            <div className="gold-divider" style={{ marginBottom: 22 }} />

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Title */}
              <div>
                <label style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                  НАЗВАНИЕ КВЕСТА *
                </label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Например: Выпить 2 литра воды"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={80}
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                  ОПИСАНИЕ
                </label>
                <textarea
                  className="input-field"
                  placeholder="Необязательное описание..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  maxLength={200}
                  style={{ resize: 'none' }}
                />
              </div>

              {/* Type */}
              <div>
                <label style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: 1, display: 'block', marginBottom: 8 }}>
                  ТИП КВЕСТА
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['daily', 'normal'] as QuestType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      style={{
                        flex: 1, padding: '8px 0', borderRadius: 8, cursor: 'pointer',
                        fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: 1,
                        border: type === t ? '1px solid var(--gold)' : '1px solid rgba(200,169,110,0.2)',
                        background: type === t ? 'rgba(200,169,110,0.12)' : 'rgba(255,255,255,0.03)',
                        color: type === t ? 'var(--gold)' : 'var(--text-muted)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {t === 'daily' ? '🌅 ДЕЙЛИК' : '📋 ОБЫЧНЫЙ'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: 1, display: 'block', marginBottom: 8 }}>
                  СЛОЖНОСТЬ
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDifficulty(d)}
                      className={difficulty === d ? `badge-${d}` : ''}
                      style={{
                        padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif', fontSize: 12,
                        border: difficulty === d ? '' : '1px solid rgba(255,255,255,0.08)',
                        background: difficulty === d ? '' : 'rgba(255,255,255,0.03)',
                        color: difficulty === d ? '' : 'var(--text-muted)',
                        transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}
                    >
                      <span>{DIFFICULTY_LABEL[d]}</span>
                      <span style={{ fontSize: 11, opacity: 0.8 }}>+{DIFFICULTY_XP[d]} XP</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="gold-divider" style={{ marginTop: 4 }} />

              {/* Submit */}
              <button
                type="submit"
                className="btn-gold"
                disabled={!title.trim()}
                style={{
                  padding: '12px', borderRadius: 8, fontSize: 13,
                  fontFamily: 'Cinzel, serif', letterSpacing: 1.5,
                  border: 'none', opacity: !title.trim() ? 0.5 : 1,
                  cursor: !title.trim() ? 'not-allowed' : 'pointer',
                }}
              >
                ПРИНЯТЬ КВЕСТ
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
