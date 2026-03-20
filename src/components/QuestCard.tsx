import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Quest } from '../types/quest';
import { DIFFICULTY_LABEL } from '../types/quest';
import XpPopup from './XpPopup';

const DIFFICULTY_ICONS: Record<string, string> = {
  easy: '🌿',
  medium: '⚔️',
  hard: '💎',
  epic: '🌟',
};

interface QuestCardProps {
  quest: Quest;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  showXp: boolean;
}

export default function QuestCard({ quest, onComplete, onDelete, showXp }: QuestCardProps) {
  const [hovered, setHovered] = useState(false);

  const isEpic = quest.difficulty === 'epic';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      style={{ position: 'relative' }}
    >
      <div
        className={`card-bg ${quest.completed ? 'quest-completed' : ''} ${isEpic && !quest.completed ? 'epic-glow' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 10,
          padding: '16px 18px',
          transition: 'all 0.2s',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line for epic */}
        {isEpic && !quest.completed && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, #c8a96e, transparent)',
          }} />
        )}

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          {/* Difficulty icon */}
          <div style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>
            {DIFFICULTY_ICONS[quest.difficulty]}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Title + badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
              <span
                className="quest-title font-cinzel"
                style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 600, letterSpacing: 0.5 }}
              >
                {quest.title}
              </span>
              <span
                className={`badge-${quest.difficulty}`}
                style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9999, letterSpacing: 0.5 }}
              >
                {DIFFICULTY_LABEL[quest.difficulty]}
              </span>
              {quest.type === 'daily' && (
                <span style={{
                  fontSize: 10, padding: '2px 8px', borderRadius: 9999, letterSpacing: 0.5,
                  background: 'rgba(74,158,218,0.1)', color: '#4a9eda',
                  border: '1px solid rgba(74,158,218,0.3)',
                }}>
                  Дейли
                </span>
              )}
            </div>

            {quest.description && (
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 8 }}>
                {quest.description}
              </p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 500 }}>
                ✦ {quest.xp} XP
              </span>

              <div style={{ display: 'flex', gap: 6 }}>
                {!quest.completed && (
                  <button
                    className="btn-complete"
                    onClick={() => onComplete(quest.id)}
                    style={{ fontSize: 12, padding: '5px 14px', borderRadius: 6, fontFamily: 'Inter, sans-serif' }}
                  >
                    Выполнить
                  </button>
                )}
                {quest.completed && (
                  <span style={{ fontSize: 12, color: '#5ab87a', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#5ab87a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Выполнено
                  </span>
                )}
                {hovered && (
                  <button
                    onClick={() => onDelete(quest.id)}
                    style={{
                      background: 'rgba(224,90,90,0.1)',
                      border: '1px solid rgba(224,90,90,0.3)',
                      color: '#e05a5a',
                      fontSize: 12,
                      padding: '5px 10px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <XpPopup amount={quest.xp} visible={showXp} />
    </motion.div>
  );
}
