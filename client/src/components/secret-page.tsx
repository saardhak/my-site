import React from 'react';

const SecretPage: React.FC<{
  onClose: () => void;
  onShowClock: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}> = ({ onClose, onShowClock, darkMode, onToggleDarkMode }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'radial-gradient(circle at 50% 30%, #222 60%, #111 100%)',
    color: '#fff',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    letterSpacing: '0.05em',
    textAlign: 'center',
    transition: 'opacity 0.4s',
  }}>
    <div style={{ marginBottom: '2rem', fontWeight: 700, fontSize: '3rem', letterSpacing: '0.1em' }}>
      🎉 Secret Unlocked! 🎉
    </div>
    <div style={{ marginBottom: '2rem', maxWidth: 500 }}>
      You found the hidden page by scrolling up from the top!<br/>
      <span style={{ fontSize: '1.2rem', color: '#aaa' }}>
        (Try scrolling down or click below to return)
      </span>
    </div>
    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
      <button
        onClick={onClose}
        style={{
          padding: '0.75em 2em',
          fontSize: '1.2rem',
          borderRadius: '2em',
          border: 'none',
          background: 'linear-gradient(90deg, #ff6f61, #ffb347)',
          color: '#fff',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
          transition: 'background 0.2s',
        }}
      >
        Go Back
      </button>
      <button
        onClick={onShowClock}
        style={{
          padding: '0.75em 2em',
          fontSize: '1.2rem',
          borderRadius: '2em',
          border: 'none',
          background: 'linear-gradient(90deg, #3b7bff, #00d26a)',
          color: '#fff',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
          transition: 'background 0.2s',
        }}
      >
        Show Clock
      </button>
      <button
        onClick={onToggleDarkMode}
        style={{
          padding: '0.75em 2em',
          fontSize: '1.2rem',
          borderRadius: '2em',
          border: 'none',
          background: darkMode
            ? 'linear-gradient(90deg, #222, #444)'
            : 'linear-gradient(90deg, #ffe14d, #ff3b3b)',
          color: darkMode ? '#ffe14d' : '#fff',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
          transition: 'background 0.2s',
        }}
      >
        {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
      </button>
    </div>
  </div>
);

export default SecretPage; 