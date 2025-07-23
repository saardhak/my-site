import React, { useEffect, useState } from 'react';

const pad = (n: number) => n.toString().padStart(2, '0');
function getDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return { date, time, now };
}

const QUOTES = [
  "The best way to get started is to quit talking and begin doing. – Walt Disney",
  "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
  "Don’t let yesterday take up too much of today. – Will Rogers",
  "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
  "The only limit to our realization of tomorrow is our doubts of today. – F.D. Roosevelt",
  "Creativity is intelligence having fun. – Albert Einstein",
  "Dream big and dare to fail. – Norman Vaughan",
  "Everything you can imagine is real. – Pablo Picasso"
];

const getRandomQuote = () => QUOTES[Math.floor(Math.random() * QUOTES.length)];

const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <div
    onClick={onChange}
    style={{
      width: 44,
      height: 24,
      borderRadius: 12,
      background: checked ? '#ffe14d' : '#ccc',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background 0.2s',
    }}
    aria-label="Toggle dark mode"
  >
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: checked ? '#222' : '#fff',
        position: 'absolute',
        left: checked ? 22 : 2,
        top: 2,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        transition: 'left 0.2s, background 0.2s',
      }}
    />
  </div>
);

const BALL_THEMES = [
  { value: 'pastel', label: 'Pastel (default)' },
  { value: 'original', label: 'Original' },
  { value: 'neon', label: 'Neon' },
  { value: 'sports', label: 'Sports Balls' },
  { value: 'holiday', label: 'Holiday' },
  { value: 'emoji', label: 'Emoji Balls' },
];

const SecretDashboard: React.FC<{
  onBack: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  showBanner?: boolean;
  onThemeChange?: (theme: string) => void;
  ballTheme?: string;
}> = ({ onBack, darkMode, onToggleDarkMode, showBanner, onThemeChange, ballTheme = 'pastel' }) => {
  const [dt, setDt] = useState(getDateTime());
  const [quote, setQuote] = useState(getRandomQuote());
  const [visits, setVisits] = useState(0);
  const [analogMode, setAnalogMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setDt(getDateTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Use sessionStorage for visitor count (per session)
    const count = parseInt(sessionStorage.getItem('secretDashboardVisits') || '0', 10) + 1;
    sessionStorage.setItem('secretDashboardVisits', count.toString());
    setVisits(count);
  }, []);

  const handleNewQuote = () => setQuote(getRandomQuote());

  // Analog clock rendering
  const renderAnalogClock = () => {
    const { now } = dt;
    const size = 280;
    const center = size / 2;
    const radius = size / 2 - 8;
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    // Angles in radians
    const hourAngle = ((hour + minute / 60) * 30 - 90) * (Math.PI / 180);
    const minuteAngle = ((minute + second / 60) * 6 - 90) * (Math.PI / 180);
    const secondAngle = (second * 6 - 90) * (Math.PI / 180);
    return (
      <svg width={size} height={size} style={{ display: 'block', margin: '0 auto', cursor: 'pointer' }} onClick={() => setAnalogMode(false)}>
        {/* Face */}
        <circle cx={center} cy={center} r={radius} fill={darkMode ? '#18181b' : '#fff'} stroke={darkMode ? '#ffe14d' : '#222'} strokeWidth="3" />
        {/* Hour marks */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = center + Math.cos(angle) * (radius - 4);
          const y1 = center + Math.sin(angle) * (radius - 4);
          const x2 = center + Math.cos(angle) * (radius - 16);
          const y2 = center + Math.sin(angle) * (radius - 16);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={darkMode ? '#ffe14d' : '#222'} strokeWidth="2" />;
        })}
        {/* Hour hand */}
        <line x1={center} y1={center} x2={center + Math.cos(hourAngle) * (radius - 36)} y2={center + Math.sin(hourAngle) * (radius - 36)} stroke={darkMode ? '#ffe14d' : '#222'} strokeWidth="7" strokeLinecap="round" />
        {/* Minute hand */}
        <line x1={center} y1={center} x2={center + Math.cos(minuteAngle) * (radius - 20)} y2={center + Math.sin(minuteAngle) * (radius - 20)} stroke={darkMode ? '#3b7bff' : '#0074d9'} strokeWidth="4" strokeLinecap="round" />
        {/* Second hand */}
        <line x1={center} y1={center} x2={center + Math.cos(secondAngle) * (radius - 10)} y2={center + Math.sin(secondAngle) * (radius - 10)} stroke={darkMode ? '#ff6f61' : '#ff4136'} strokeWidth="2" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx={center} cy={center} r={4} fill={darkMode ? '#ffe14d' : '#222'} />
        {/* Click hint */}
        <text x={center} y={size - 10} textAnchor="middle" fontSize="0.9rem" fill={darkMode ? '#ffe14d' : '#222'} opacity="0.5">Click to switch to digital</text>
      </svg>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: darkMode
        ? 'radial-gradient(circle at 50% 30%, #111 60%, #222 100%)'
        : 'radial-gradient(circle at 50% 30%, #fff 60%, #eee 100%)',
      color: darkMode ? '#fff' : '#222',
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
      {/* Top bar: back arrow and toggle */}
      <div style={{ position: 'absolute', top: 24, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <span
          onClick={onBack}
          style={{ fontSize: '2.2rem', fontWeight: 400, cursor: 'pointer', userSelect: 'none', color: darkMode ? '#ffe14d' : '#222', transition: 'color 0.2s' }}
          aria-label="Back"
        >
          ←
        </span>
        <Switch checked={darkMode} onChange={onToggleDarkMode} />
      </div>
      {/* Main content: digital or analog mode */}
      {analogMode ? (
        // Analog mode: only clock (no face/circle), slightly left, small date right
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '70vh',
          minHeight: 480,
        }}>
          {/* Analog clock, slightly left of center */}
          <div
            style={{
              flex: '0 0 auto',
              marginRight: 48,
              marginLeft: 'calc(50vw - 38vw)', // push slightly left
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setAnalogMode(false)}
          >
            {(() => {
              const { now } = dt;
              const size = Math.min(window.innerWidth * 0.7, window.innerHeight * 0.7, 600);
              const center = size / 2;
              const radius = size / 2 - 24;
              const hour = now.getHours() % 12;
              const minute = now.getMinutes();
              const second = now.getSeconds();
              const hourAngle = ((hour + minute / 60) * 30 - 90) * (Math.PI / 180);
              const minuteAngle = ((minute + second / 60) * 6 - 90) * (Math.PI / 180);
              const secondAngle = (second * 6 - 90) * (Math.PI / 180);
              // Short date: e.g. 'Mon, Jun 10'
              const shortDate = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
              return (
                <svg width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
                  {/* Only ticks, no face/circle */}
                  {[...Array(60)].map((_, i) => {
                    const angle = (i * 6 - 90) * (Math.PI / 180);
                    const x1 = center + Math.cos(angle) * (radius - 8);
                    const y1 = center + Math.sin(angle) * (radius - 8);
                    const x2 = center + Math.cos(angle) * (radius - (i % 5 === 0 ? 32 : 18));
                    const y2 = center + Math.sin(angle) * (radius - (i % 5 === 0 ? 32 : 18));
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={darkMode ? '#ffe14d' : '#222'} strokeWidth={i % 5 === 0 ? 3 : 1.2} opacity={i % 5 === 0 ? 0.9 : 0.5} />;
                  })}
                  {/* Hour hand */}
                  <line x1={center} y1={center} x2={center + Math.cos(hourAngle) * (radius - 120)} y2={center + Math.sin(hourAngle) * (radius - 120)} stroke={darkMode ? '#ffe14d' : '#222'} strokeWidth="16" strokeLinecap="round" />
                  {/* Minute hand */}
                  <line x1={center} y1={center} x2={center + Math.cos(minuteAngle) * (radius - 60)} y2={center + Math.sin(minuteAngle) * (radius - 60)} stroke={darkMode ? '#3b7bff' : '#0074d9'} strokeWidth="8" strokeLinecap="round" />
                  {/* Second hand */}
                  <line x1={center} y1={center} x2={center + Math.cos(secondAngle) * (radius - 32)} y2={center + Math.sin(secondAngle) * (radius - 32)} stroke={darkMode ? '#ff6f61' : '#ff4136'} strokeWidth="3.5" strokeLinecap="round" />
                  {/* Center dot */}
                  <circle cx={center} cy={center} r={18} fill={darkMode ? '#ffe14d' : '#222'} />
                </svg>
              );
            })()}
          </div>
          {/* Small date to the right, vertically centered */}
          <div style={{ fontWeight: 500, fontSize: '2.1rem', color: darkMode ? '#ffe14d' : '#222', letterSpacing: '0.04em', userSelect: 'none', marginLeft: 12 }}>
            {dt.now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      ) : (
        // Digital mode: everything centered, stacked
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '70vh',
          minHeight: 480,
        }}>
          {showBanner && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              padding: '2.2rem 0 1.2rem 0',
              fontSize: '2.1rem',
              fontWeight: 700,
              color: darkMode ? '#ffe14d' : '#ff6f61',
              textAlign: 'center',
              letterSpacing: '0.04em',
              zIndex: 10,
              background: 'transparent',
              pointerEvents: 'none',
              userSelect: 'none',
              textShadow: darkMode ? '0 2px 16px #0008' : '0 2px 16px #fff8',
            }}>
              🎉 Secret Unlocked! 🎉<br />You found the hidden page by scrolling up from the top!
            </div>
          )}
          <div style={{ fontWeight: 700, fontSize: '2.6rem', marginBottom: '1.2rem', letterSpacing: '0.1em', textShadow: darkMode ? '0 2px 16px #0008' : '0 2px 16px #fff8', userSelect: 'none', fontFamily: 'Orbitron, monospace', textAlign: 'center' }}>
            {dt.date}
          </div>
          <div
            style={{ fontWeight: 900, fontSize: '10vw', minHeight: 0, marginBottom: '1.2rem', letterSpacing: '0.12em', textShadow: darkMode ? '0 4px 32px #000a' : '0 4px 32px #fff8', userSelect: 'none', fontFamily: 'Orbitron, monospace', lineHeight: 1, textAlign: 'center' }}
            onClick={() => setAnalogMode(true)}
          >
            {dt.time}
          </div>
          <div
            style={{ fontSize: '1.5rem', fontStyle: 'italic', color: darkMode ? '#ffe14d' : '#222', maxWidth: 600, textAlign: 'center', lineHeight: 1.3, cursor: 'pointer', userSelect: 'none', fontWeight: 400 }}
            onClick={handleNewQuote}
            title="Click for new quote"
          >
            {quote}
          </div>
        </div>
      )}
      {/* Visitor counter, minimal */}
      <div style={{
        position: 'fixed',
        right: 24,
        bottom: 18,
        color: darkMode ? '#ffe14d' : '#222',
        fontSize: '1.05rem',
        fontWeight: 500,
        opacity: 0.7,
        letterSpacing: '0.01em',
        zIndex: 2,
      }}>
        Visitors this session: {visits}
      </div>
          {/* Ball theme switcher - fixed bottom left, minimalistic */}
          <div style={{
            position: 'fixed',
            left: 24,
            bottom: 18,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            pointerEvents: 'auto',
          }}>
            <label htmlFor="ball-theme-select" style={{ fontSize: '1.1rem', marginRight: 8, color: darkMode ? '#ffe14d' : '#222' }}>Balls:</label>
            <select
              id="ball-theme-select"
              value={ballTheme}
              onChange={e => onThemeChange && onThemeChange(e.target.value)}
              style={{ fontSize: '1.1rem', color: darkMode ? '#ffe14d' : '#222', background: 'transparent', border: 'none', outline: 'none', appearance: 'none', cursor: 'pointer' }}
            >
              {BALL_THEMES.map(opt => (
                <option key={opt.value} value={opt.value} style={{ color: darkMode ? '#ffe14d' : '#222', background: darkMode ? '#23232a' : '#fff' }}>{opt.label}</option>
              ))}
            </select>
          </div>
    </div>
  );
};

export default SecretDashboard; 