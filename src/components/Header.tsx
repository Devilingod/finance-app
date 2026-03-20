import type { Player } from '../types/quest';

interface HeaderProps {
  player: Player;
}

export default function Header({ player }: HeaderProps) {
  const xpPercent = Math.min((player.xp / player.xpToNext) * 100, 100);

  return (
    <header
      style={{
        background: 'linear-gradient(180deg, rgba(13,20,33,0.98) 0%, rgba(8,12,20,0.98) 100%)',
        borderBottom: '1px solid rgba(200,169,110,0.25)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '14px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #9a7a4a, #c8a96e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 700, color: '#0d1421',
                fontFamily: 'Cinzel, serif',
                boxShadow: '0 0 14px rgba(200,169,110,0.35)',
              }}
            >
              {player.level}
            </div>
            <div>
              <div className="font-cinzel" style={{ fontSize: 18, color: 'var(--gold)', letterSpacing: 2, fontWeight: 700 }}>
                QUEST BOARD
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1 }}>
                Ежедневные поручения
              </div>
            </div>
          </div>

          {/* XP Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, minWidth: 200 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Уровень {player.level}
              </span>
              <span style={{ fontSize: 12, color: 'var(--gold)' }}>
                {player.xp} / {player.xpToNext} XP
              </span>
            </div>
            <div className="xp-bar-track" style={{ width: '100%', height: 8 }}>
              <div className="xp-bar-fill" style={{ height: '100%', width: `${xpPercent}%` }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Выполнено квестов: <span style={{ color: 'var(--gold)' }}>{player.totalCompleted}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
