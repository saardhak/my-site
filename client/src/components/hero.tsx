import { useState, useEffect, useRef } from 'react';
import TypingAnimation from './typing-animation';

const DOT_COLORS = ['#ff3b3b', '#00d26a', '#3b7bff', '#ffe14d'];
const DOT_COUNT = 10; // Fewer dots
const TRAIL_DURATION = 3000; // ms
const DOT_SPEED = 3; // constant speed for smoothness
const AVOID_MARGIN = 20;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function isInBox(x: number, y: number, box: { left: number; top: number; right: number; bottom: number }) {
  return x > box.left && x < box.right && y > box.top && y < box.bottom;
}

const Hero = () => {
  const [isLarge, setIsLarge] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLarge(window.scrollY > 0);
    const handleScroll = () => {
      setIsLarge(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
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
    const dots = Array.from({ length: DOT_COUNT }).map(() => {
      const radius = randomBetween(4, 8);
      const { x, y } = getSafePosition(radius);
      return {
        x,
        y,
        color: DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)],
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
        // Avoid the text and typing areas (simple bounding box avoidance)
        if (
          (nextX > textBox.left - dot.radius &&
            nextX < textBox.right + dot.radius &&
            nextY > textBox.top - dot.radius &&
            nextY < textBox.bottom + dot.radius) ||
          (nextX > typingBox.left - dot.radius &&
            nextX < typingBox.right + dot.radius &&
            nextY > typingBox.top - dot.radius &&
            nextY < typingBox.bottom + dot.radius)
        ) {
          // Reflect away from text or typing
          dot.angle += Math.PI + randomBetween(-0.5, 0.5);
          nextX = dot.x + Math.cos(dot.angle) * 8;
          nextY = dot.y + Math.sin(dot.angle) * 8;
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
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Canvas overlay for animated dots */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ display: 'block' }}
      />
      <div className="max-w-4xl mx-auto text-center relative z-20">
        <h1
          ref={textRef}
          className={`transition-all duration-500 font-bold tracking-tight mb-8 leading-tight text-apple-text ${
            isLarge ? 'text-9xl md:text-[11rem]' : 'text-7xl md:text-9xl'
          }`}
        >
          Saardhak
        </h1>
        <div
          ref={typingRef}
          className={`text-2xl md:text-4xl font-light text-apple-gray transition-opacity duration-1000 ${
            isLarge ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <TypingAnimation
            words={['Designer', 'Ideator', 'Entrepreneur', 'Innovator', 'Engineer']}
            typingSpeed={120}
            deletingSpeed={80}
            pauseTime={1500}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
