import { useState, useEffect, useRef, useReducer } from 'react';
import TypingAnimation from './typing-animation';
import { setHeroPinned } from './navigation';
import { SubtitleContext } from './navigation';

const DOT_COLORS = ['#ff3b3b', '#00d26a', '#3b7bff', '#ffe14d'];
const DOTS_PER_COLOR = 3;
const DOT_COUNT = 10; // Up to 10 doodlers
const TRAIL_DURATION = 3000; // ms
const DOT_SPEED = 3; // constant speed for smoothness
const AVOID_MARGIN = 20;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function isInBox(x: number, y: number, box: { left: number; top: number; right: number; bottom: number }) {
  return x > box.left && x < box.right && y > box.top && y < box.bottom;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

// Export scroll state for nav bar
export type HeroScrollState = {
  progress: number;
  snapped: boolean;
  fontSize: number;
  subtitleFontSize: number;
  translateY: number;
};
export let heroScrollState: HeroScrollState = { progress: 0, snapped: false, fontSize: 32, subtitleFontSize: 18, translateY: 0 };

const Hero = ({ children }: { children?: React.ReactNode }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [snapped, setSnapped] = useState(false);

  // Force update for React reconciliation
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // TypingAnimation state for sync
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [cursor, setCursor] = useState(true);
  const words = ['Designer', 'Ideator', 'Entrepreneur', 'Innovator', 'Engineer'];
  const typingSpeed = 120;
  const deletingSpeed = 80;
  const pauseTime = 1500;

  useEffect(() => {
    let timeout: any;
    const currentWord = words[currentWordIndex];
    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }
    if (!isDeleting && currentText === currentWord) {
      setIsWaiting(true);
      return;
    }
    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }
    timeout = setTimeout(() => {
      setCurrentText((prev) => {
        if (isDeleting) {
          return prev.slice(0, -1);
        } else {
          return currentWord.slice(0, prev.length + 1);
        }
      });
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, isWaiting]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to pause animation when hero is not visible
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return; // Pause animation if not visible
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      ctx = canvas.getContext('2d');
    }
    window.addEventListener('resize', handleResize);

    // Get the bounding boxes of the text and typing animation to avoid
    let textBox = { left: width / 4, top: height / 3, right: (3 * width) / 4, bottom: (2 * height) / 3 };
    let typingBox = { left: width / 4, top: (2 * height) / 3, right: (3 * width) / 4, bottom: (2.2 * height) / 3 };
    if (textRef.current && typingRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      const typingRect = typingRef.current.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      textBox = {
        left: rect.left - canvasRect.left - AVOID_MARGIN,
        top: rect.top - canvasRect.top - AVOID_MARGIN,
        right: rect.right - canvasRect.left + AVOID_MARGIN,
        bottom: rect.bottom - canvasRect.top + AVOID_MARGIN,
      };
      typingBox = {
        left: typingRect.left - canvasRect.left - AVOID_MARGIN,
        top: typingRect.top - canvasRect.top - AVOID_MARGIN,
        right: typingRect.right - canvasRect.left + AVOID_MARGIN,
        bottom: typingRect.bottom - canvasRect.top + AVOID_MARGIN,
      };
    }

    // Dot state
    const now = () => performance.now();
    // Build a color pool with max 3 of each color, shuffled
    let colorPool: string[] = [];
    for (const color of DOT_COLORS) {
      for (let i = 0; i < DOTS_PER_COLOR; i++) {
        colorPool.push(color);
      }
    }
    // Shuffle colorPool
    for (let i = colorPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colorPool[i], colorPool[j]] = [colorPool[j], colorPool[i]];
    }
    // Only use up to DOT_COUNT
    colorPool = colorPool.slice(0, DOT_COUNT);

    function getSafePosition(radius: number) {
      let x, y, tries = 0;
      do {
        x = randomBetween(radius, width - radius);
        y = randomBetween(radius, height - radius);
        tries++;
        // Avoid both text and typing boxes with a margin
      } while ((isInBox(x, y, textBox) || isInBox(x, y, typingBox)) && tries < 100);
      return { x, y };
    }
    const dots = colorPool.map((color) => {
      const radius = randomBetween(4, 8);
      const { x, y } = getSafePosition(radius);
      return {
        x,
        y,
        color,
        radius,
        angle: randomBetween(0, 2 * Math.PI),
        turnRate: randomBetween(-0.04, 0.04),
        trail: [{ x, y, t: now() }],
      };
    });

    let animationId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const tNow = now();
      for (const dot of dots) {
        // Smoothly curve the angle
        dot.angle += dot.turnRate + randomBetween(-0.01, 0.01);
        // Constant speed for smoothness
        const vx = Math.cos(dot.angle) * DOT_SPEED;
        const vy = Math.sin(dot.angle) * DOT_SPEED;
        let nextX = dot.x + vx;
        let nextY = dot.y + vy;
        // Bounce off canvas edges
        if (nextX < dot.radius || nextX > width - dot.radius) {
          dot.angle = Math.PI - dot.angle + randomBetween(-0.2, 0.2);
          nextX = Math.max(dot.radius, Math.min(width - dot.radius, nextX));
        }
        if (nextY < dot.radius || nextY > height - dot.radius) {
          dot.angle = -dot.angle + randomBetween(-0.2, 0.2);
          nextY = Math.max(dot.radius, Math.min(height - dot.radius, nextY));
        }
        // Forbidden area: text and subtitle
        let forbidden = false;
        // Check text
        if (
          nextX > textBox.left - dot.radius &&
          nextX < textBox.right + dot.radius &&
          nextY > textBox.top - dot.radius &&
          nextY < textBox.bottom + dot.radius
        ) forbidden = true;
        // Check subtitle
        if (
          nextX > typingBox.left - dot.radius &&
          nextX < typingBox.right + dot.radius &&
          nextY > typingBox.top - dot.radius &&
          nextY < typingBox.bottom + dot.radius
        ) forbidden = true;
        // If forbidden, reflect and stay out
        if (forbidden) {
          // Try reflecting horizontally
          let tryX = dot.x - vx;
          let tryY = dot.y + vy;
          let stillForbidden = false;
          if (
            (tryX > textBox.left - dot.radius && tryX < textBox.right + dot.radius && tryY > textBox.top - dot.radius && tryY < textBox.bottom + dot.radius) ||
            (tryX > typingBox.left - dot.radius && tryX < typingBox.right + dot.radius && tryY > typingBox.top - dot.radius && tryY < typingBox.bottom + dot.radius)
          ) {
            stillForbidden = true;
          }
          if (!stillForbidden) {
            dot.angle = Math.PI - dot.angle + randomBetween(-0.2, 0.2);
            nextX = dot.x - vx;
            nextY = dot.y + vy;
          } else {
            // Try reflecting vertically
            tryX = dot.x + vx;
            tryY = dot.y - vy;
            stillForbidden = false;
            if (
              (tryX > textBox.left - dot.radius && tryX < textBox.right + dot.radius && tryY > textBox.top - dot.radius && tryY < textBox.bottom + dot.radius) ||
              (tryX > typingBox.left - dot.radius && tryX < typingBox.right + dot.radius && tryY > typingBox.top - dot.radius && tryY < typingBox.bottom + dot.radius)
            ) {
              stillForbidden = true;
            }
            if (!stillForbidden) {
              dot.angle = -dot.angle + randomBetween(-0.2, 0.2);
              nextX = dot.x + vx;
              nextY = dot.y - vy;
            } else {
              // Reverse direction if both fail
              dot.angle = dot.angle + Math.PI + randomBetween(-0.2, 0.2);
              nextX = dot.x - vx;
              nextY = dot.y - vy;
            }
          }
        }
        dot.x = nextX;
        dot.y = nextY;
        // Add to trail
        dot.trail.push({ x: dot.x, y: dot.y, t: tNow });
        // Remove old trail points
        while (dot.trail.length && tNow - dot.trail[0].t > TRAIL_DURATION) {
          dot.trail.shift();
        }
        // Draw trail
        for (let i = 1; i < dot.trail.length; i++) {
          const p1 = dot.trail[i - 1];
          const p2 = dot.trail[i];
          const age = tNow - p2.t;
          let alpha = 1 - age / TRAIL_DURATION;
          if (alpha < 0) alpha = 0;
          ctx.strokeStyle = dot.color;
          ctx.globalAlpha = alpha * 0.7;
          ctx.lineWidth = dot.radius * 1.2;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
        ctx.fillStyle = dot.color;
        ctx.shadowColor = dot.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  // --- SCALE WITH HERO VISIBILITY LOGIC (RAF, no lag, no forced re-render) ---
  const minFont = 32; // Nav bar size
  const maxFont = 200; // Grow larger
  const minSubtitleFont = 18; // Nav bar subtitle size
  const maxSubtitleFont = 48; // px

  useEffect(() => {
    let lastSnapped = false;
    let running = true;
    function animate() {
      if (!running) return;
      let heroVisible = window.innerHeight;
      let heroTop = 0;
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        heroTop = Math.max(rect.top, 0);
        heroVisible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      }
      const heroFull = window.innerHeight;
      let scaleProgress = 1;
      if (heroVisible < heroFull) {
        scaleProgress = clamp(heroVisible / heroFull, 0, 1);
      }
      // Nav bar constants
      const navBarFontSize = 32;
      const navBarSubtitleFontSize = 18;
      const navBarY = 64;
      // If fully minimized, lock to nav bar style/position
      let fontSize, subtitleFontSize, centerY;
      const blockMargin = 8;
      if (scaleProgress <= 0.2) {
        fontSize = navBarFontSize;
        subtitleFontSize = navBarSubtitleFontSize;
        centerY = navBarY;
        setHeroPinned(true);
      } else {
        fontSize = minFont + (maxFont - minFont) * scaleProgress;
        subtitleFontSize = minSubtitleFont + (maxSubtitleFont - minSubtitleFont) * scaleProgress;
        const blockHeight = fontSize + subtitleFontSize + blockMargin;
        let idealCenter = heroTop + heroVisible / 2;
        let minCenter = heroTop + blockHeight / 2;
        let maxCenter = heroTop + heroVisible - blockHeight / 2;
        let tempCenterY = Math.max(minCenter, Math.min(idealCenter, maxCenter));
        centerY = tempCenterY;
        // Show nav bar only when text size is less than or equal to nav bar text size
        setHeroPinned(fontSize <= navBarFontSize);
      }
      // Update block style directly
      if (blockRef.current) {
        blockRef.current.style.fontSize = fontSize + 'px';
        blockRef.current.style.left = '50%';
        blockRef.current.style.top = `${centerY}px`;
        blockRef.current.style.transform = 'translate(-50%, -50%)';
        blockRef.current.style.fontWeight = scaleProgress <= 0.2 ? 'bold' : '';
        blockRef.current.style.textAlign = 'center';
      }
      if (typingRef.current) {
        typingRef.current.style.fontSize = subtitleFontSize + 'px';
        typingRef.current.style.fontWeight = scaleProgress <= 0.2 ? '400' : '';
        typingRef.current.style.marginTop = scaleProgress <= 0.2 ? '0.125rem' : '';
      }
      // Update nav state for external use
      heroScrollState.progress = 1 - scaleProgress;
      heroScrollState.snapped = scaleProgress <= 0.2;
      heroScrollState.fontSize = fontSize;
      heroScrollState.subtitleFontSize = subtitleFontSize;
      heroScrollState.translateY = 0;
      // Only update snapped state if it changes
      if (lastSnapped !== heroScrollState.snapped) {
        setSnapped(heroScrollState.snapped);
        lastSnapped = heroScrollState.snapped;
      }
      requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, []);

  // Track nav bar visibility for subtitle opacity
  const [navActive, setNavActive] = useState(false);
  useEffect(() => {
    let running = true;
    function checkNav() {
      setNavActive(heroScrollState.snapped);
      if (running) requestAnimationFrame(checkNav);
    }
    checkNav();
    return () => { running = false; };
  }, []);

  return (
    <SubtitleContext.Provider value={{ currentText, cursor }}>
      <section ref={sectionRef} id="home" className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Canvas overlay for animated dots */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ display: 'block' }}
        />
        {/* Background content that scrolls up */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            background: '#fff',
            transform: `translateY(-${scrollY}px)`,
            transition: 'background 0.2s',
          }}
        />
        {/* Saardhak and subtitle centered in visible hero area, scale with hero visibility */}
        <div className="max-w-4xl mx-auto text-center relative z-20 flex flex-col items-center justify-center min-h-screen">
          <div
            ref={blockRef}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', zIndex: 30 }}
          >
            <h1
              ref={textRef}
              className={`font-bold tracking-tight mb-2 leading-tight text-apple-text`}
            >
              Saardhak
            </h1>
            <div
              ref={typingRef}
              style={{
                opacity: navActive ? 0 : 1,
                transition: 'opacity 0.2s',
                fontSize: heroScrollState.subtitleFontSize + 'px',
              }}
              className={`font-light text-apple-gray transition-opacity duration-1000`}
            >
              {/* Synchronized subtitle */}
              <span className="relative">
                {currentText}
                {cursor && <span className="animate-pulse">|</span>}
              </span>
            </div>
          </div>
        </div>
        {children}
    </section>
    </SubtitleContext.Provider>
  );
};

export default Hero;
