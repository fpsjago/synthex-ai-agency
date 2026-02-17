import { useState, useEffect } from 'react';

const SKINS = [
  { id: 'default', label: 'Cyan', primary: '#00D4FF', accent: '#39FF14' },
  { id: 'violet', label: 'Violet', primary: '#7C3AED', accent: '#06B6D4' },
  { id: 'amber', label: 'Amber', primary: '#F59E0B', accent: '#0D9488' },
] as const;

type SkinId = (typeof SKINS)[number]['id'];

export default function SkinSwitcher() {
  const [activeSkin, setActiveSkin] = useState<SkinId>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('synthex-skin') as SkinId | null;
    if (saved && SKINS.find((s) => s.id === saved)) {
      setActiveSkin(saved);
      document.documentElement.setAttribute('data-skin', saved);
    }
  }, []);

  const handleSwitch = (skinId: SkinId) => {
    setActiveSkin(skinId);
    document.documentElement.setAttribute('data-skin', skinId);
    localStorage.setItem('synthex-skin', skinId);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '0.5rem',
    }}>
      {/* Palette panel */}
      {visible && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem',
          padding: '0.75rem',
          background: 'rgba(22, 22, 22, 0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          backdropFilter: 'blur(16px)',
        }}>
          <span style={{
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: 'rgba(245,245,240,0.4)',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono, monospace)',
            marginBottom: '0.25rem',
            paddingLeft: '0.25rem',
          }}>
            Color Skin
          </span>
          {SKINS.map((skin) => (
            <button
              key={skin.id}
              type="button"
              onClick={() => handleSwitch(skin.id)}
              title={`Switch to ${skin.label} skin`}
              aria-pressed={activeSkin === skin.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.375rem 0.625rem',
                background: activeSkin === skin.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: activeSkin === skin.id ? `1px solid ${skin.primary}40` : '1px solid transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <span style={{
                width: '1.25rem',
                height: '1.25rem',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${skin.primary}, ${skin.accent})`,
                flexShrink: 0,
                boxShadow: activeSkin === skin.id ? `0 0 8px ${skin.primary}60` : 'none',
              }} />
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 500,
                color: activeSkin === skin.id ? skin.primary : 'rgba(245,245,240,0.65)',
                fontFamily: 'var(--font-body, sans-serif)',
              }}>
                {skin.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        title="Change color skin"
        aria-label="Toggle color skin switcher"
        aria-expanded={visible}
        style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(22, 22, 22, 0.95)',
          backdropFilter: 'blur(16px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          transition: 'border-color 150ms ease',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'rgba(245,245,240,0.65)' }}>
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      </button>
    </div>
  );
}
