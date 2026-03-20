import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Quest } from '../types/quest';
import QuestCard from './QuestCard';

type Tab = 'all' | 'daily' | 'normal';

interface QuestBoardProps {
  quests: Quest[];
  xpGain: { id: string; amount: number } | null;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function QuestBoard({ quests, xpGain, onComplete, onDelete }: QuestBoardProps) {
  const [tab, setTab] = useState<Tab>('all');

  const filtered = quests.filter((q) => {
    if (tab === 'daily') return q.type === 'daily';
    if (tab === 'normal') return q.type === 'normal';
    return true;
  });

  const tabStyle = (_t: Tab) => ({
    padding: '8px 20px',
    fontFamily: 'Cinzel, serif',
    fontSize: 12,
    letterSpacing: 1,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    transition: 'all 0.2s',
  });

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(200,169,110,0.15)', marginBottom: 20 }}>
        {(['all', 'daily', 'normal'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={tab === t ? 'tab-active' : 'tab-inactive'}
            style={tabStyle(t)}
          >
            {t === 'all' ? 'ВСЕ' : t === 'daily' ? 'ДЕЙЛИКИ' : 'ОБЫЧНЫЕ'}
          </button>
        ))}
      </div>

      {/* Quest list */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          color: 'var(--text-muted)', fontFamily: 'Cinzel, serif', fontSize: 13, letterSpacing: 1,
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📜</div>
          <div>Квестов пока нет</div>
          <div style={{ fontSize: 11, marginTop: 6, opacity: 0.7 }}>Добавь первый квест, чтобы начать приключение</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((q) => (
              <QuestCard
                key={q.id}
                quest={q}
                onComplete={onComplete}
                onDelete={onDelete}
                showXp={xpGain?.id === q.id}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
