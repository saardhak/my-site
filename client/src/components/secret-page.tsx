import React from 'react';

const SecretPage: React.FC<{
  onClose: () => void;
  onEnterDashboard: () => void;
}> = ({ onClose, onEnterDashboard }) => (
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
    <div style={{ marginBottom: '2.5rem', maxWidth: 500 }}>
      You found the hidden page by scrolling up from the top!
    </div>
    <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
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
        onClick={onEnterDashboard}
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
        Enter Secret Page
      </button>
    </div>
  </div>
);

export default SecretPage; 