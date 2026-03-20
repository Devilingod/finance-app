interface DailyProgressProps {
  completed: number;
  total: number;
}

export default function DailyProgress({ completed, total }: DailyProgressProps) {
  const pips = Math.max(total, 4);

  return (
    <div
      style={{
        background: 'rgba(17,25,39,0.8)',
        border: '1px solid rgba(200,169,110,0.25)',
        borderRadius: 10,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <div>
        <div className="font-cinzel" style={{ fontSize: 13, color: 'var(--gold)', letterSpacing: 1, marginBottom: 2 }}>
          ЕЖЕДНЕВНЫЕ ПОРУЧЕНИЯ
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {completed === total && total > 0
            ? 'Все поручения выполнены!'
            : `Выполнено ${completed} из ${total}`}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {Array.from({ length: pips }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: i < completed
                ? 'linear-gradient(135deg, #9a7a4a, #c8a96e)'
                : 'rgba(255,255,255,0.06)',
              border: i < completed
                ? '1px solid rgba(200,169,110,0.6)'
                : '1px solid rgba(200,169,110,0.2)',
              boxShadow: i < completed ? '0 0 8px rgba(200,169,110,0.4)' : 'none',
              transition: 'all 0.3s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {i < completed && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#0d1421" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        ))}
        {total > 0 && completed === total && (
          <span style={{ marginLeft: 8, fontSize: 18 }}>✨</span>
        )}
      </div>
    </div>
  );
}
