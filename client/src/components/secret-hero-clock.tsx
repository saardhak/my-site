import React, { useEffect, useState } from 'react';

const pad = (n: number) => n.toString().padStart(2, '0');

function getDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return { date, time };
}

const SecretHeroClock: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [dt, setDt] = useState(getDateTime());
  useEffect(() => {
    const interval = setInterval(() => setDt(getDateTime()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(circle at 50% 30%, #111 60%, #222 100%)',
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
      <div style={{ fontWeight: 700, fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '0.1em', textShadow: '0 2px 16px #0008' }}>
        {dt.date}
      </div>
      <div style={{ fontWeight: 900, fontSize: '6rem', marginBottom: '2.5rem', letterSpacing: '0.12em', textShadow: '0 4px 32px #000a' }}>
        {dt.time}
      </div>
      <button
        onClick={onBack}
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
          marginTop: '2rem',
        }}
      >
        Back
      </button>
    </div>
  );
};

export default SecretHeroClock; 